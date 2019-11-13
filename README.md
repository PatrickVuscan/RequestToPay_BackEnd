This is the backend repository for the Scotia Bank project for team Works(*ish*).

A working [demo](https://worksish-backend-v1.herokuapp.com/api-docs) of implemented endpoints. Try `username: driver` 
and `password: zoomzoom`. _Whether or not this works is __highly__ dependent on what mood Heroku is in_.
# Table of contents
1. [Setup](#Setup)
1. [Commands](#Commands)
1. [What is this file?](#what-file)
    1. [General files by type/directory](#General-files-by-type-or-directory)
    1. [Specific files](#Specific-files)
1. [Database](#Database)
1. [How To](#How-To)
    1. [Add a new endpoint](#Add-a-new-endpoint)
    1. [Add new middleware](#Add-new-middleware)
    1. [Add a table to the database](#Add-a-table-to-the-database)

---

# Setup
1. __Clone the repo__: `git clone https://github.com/PatrickVuscan/RequestToPay_BackEnd.git`
1. __Enable the linter__: Make sure your dev refers to `tslint.json` for style guidelines.
1. __If running locally__
    1. __Install Node.js__: https://nodejs.org/en/
    1. __Install dependencies__: run `npm install` from the project directory.
    1. __Set environment variables__: Create a `.env` file that follows the example of `.env.example`.
        1. __To connect to the Heroku database__:
        `DB_CONSTRING=postgres://zcvqkmfmcuyxeh:377a55a83347449b065454395a46a59248e6ba03ced9dfaa3bd403eb3a25ea6d@ec2-174-129-253-104.compute-1.amazonaws.com:5432/dbofdangme5t6r`
        . This is liable to change (periodically) from Heroku.
    1. __Host the application__: `npm run dev` will automatically recompile when changes are made. See `package.json` 
    for other options.
1. __If setting up new instance on Heroku__
    1. __Set up the database (heroku)__
        1. Connect "Heroku Postgres" as an "add-on" to your heroku application
        1. Run the file to generate the database schema.
    1. __Deploy the application__
        1. Install [Heroku cli](https://devcenter.heroku.com/articles/heroku-cli).
        1. Ensure that the "settings->config vars" contains the variables described by .env.example. 
        1. Set the Heroku remote: `heroku git:remote -a worksish-backend-v1`. Verify by looking at `git remote -v`.
        1. Push your changes to `master` on the heroku remote
            - e.g. `git push heroku master`
            - e.g. `git push heroku <your-branch>:master` to push a non-master branch to `heroku:master`.
        1. __View logs__: `heroku logs --tail`
1. __Test published endpoints__: Navigate to `https://<host>[:port]/api-docs`.

---

# Commands
* __Defined in__ `package.json` and can be run by `npm run <command>`.
    * `postinstall`: Hook that is automatically run after npm install and builds the project (output in `dist/`).
    * `dev`: Starts a test server that re-compiles the application when a file changes.
    * `start`: Starts a node server referencing `dist/server.js`.
    * `test`: Uses `jest` to run tests on the application. Options are defined in `package.json`.
    * `generate-db-types`: Generates typescript interfaces for objects from database tables. Options are
        defined in `schemats.json`. Must be run on a postgres database that has imported `RequestToPay.ddl` on a 
        postgres server hosted on `localhost`. Make sure that the username and password that you use in `schemats.json`
        connection string have permission to access tables in the `requesttopay` schema.
* Other notable commands
    * [deprecated] `pg_dump -U <user> -f schema.sql -s <DBNAME>`: dumps the schema for `<DBNAME>` to a `.sql` file.

---

# <a name='what-file'>What is this file?</a>
## General files by type or directory
* `*.ts`: Should have a multi-line comment at the top of the file describing its purpose. These are typescript files
    that are compiled to javascript. These are the core of the application.
    * `*.test.ts`: Files that are auto-tested with 
        [jest](https://basarat.gitbooks.io/typescript/docs/testing/jest.html) by the 
        command `npm run test`.
* `*.example`: An example file of something that would otherwise hold sensitive information. Copy this file
    into another file without the `.example` part and insert the required information before running commands that rely 
    on these files.
* `src/*`: This is the project directory. There is a specific purpose to each directory here. Fore more information
        on each module, refer to the comment at the top of each `index.ts` file.
    * `server.ts`: This is the main file that is run when the server is started. The application can be hosted by 
        pointing a simple server (`node <file>`) to the compiled version of this file, `dist/server.ts`.
    * `config`: This is a directory for configurations that do not contain sensitive information.
    * `middleware`: This is where middleware wrappers go. In general, anything that would call `express.use(...)` 
        should be included here (more in the [How-To](#Add-new-middleware) section).
    * `services`: This holds services. An example of a service is anything that gets information using an external
        API. Having this allows us to decouple the external API from our own internal API.
        * `*/providers`: This is where the objects that contact external APIs go. This *decouples*
            our code from code that we cannot control.
        * Refer to the (How-To)[#Add-a-new-endpoint] section for how to create new endpoints.
    * `utils`: Utilities go here. Utils are used by multiple other files, but do not interact with external
        APIs like services might. Often, a util will define a _singleton_ that is used in many different places.
    * `*/__mocks__/*`: Files defined here can be automatically used by jest during testing to replace files with the 
        same name defined at the same level as the `__mocks__` directory. To make jest use `__mocks__/<file>` rather than
    `<file>`, insert `jest.mock("<relative_path_to_file>")` after the imports in the `*.test.ts` files.

## Specific files
* `config/`
    * `swagger.json`: This holds api documentation information that is hosted using the
        [`swagger` package](https://swagger.io/specification/#tagObject). The middleware handler for this can be found 
        in `middleware/apiDocs.ts`. This is what determines what is rendered when you navigate to 
        `https://<host>[:port]/api-docs`.
    * `jestSetup.json`: This is run before any jest test scripts are run. This option is enabled in `package.json`.
* `.env`: This holds environment variables that are inserted using the `dotenv` package.
* `.gitignore`: This holds a list of file patterns that should be ignored when putting files on git.
* `.npmrc`: Makes it so that `npm install` automatically saves packages to `package.json`.
* `package.json`: This specifies required packages, their versions, and various npm scripts.
* `pm2.yaml`: This is used by `npm run start` and describes the behavior of pm2 when the application is started.
* `README.md`: This file.
* `RequestToPay.ddl`: This DDL (**D**ata **D**efinition **L**anguage) file defines the different tables that exist in
    the database required by this application. When run, it will reset all tables in the database.
* `R2PData.sql`: This file will populate the database with theoretical data. It should only be run on a clean database.
* `schemats.json`: This file holds configuration info for the npm script `generate-db-types`. Namely, it contains
    the connection url.
* `tsconfig.json`: This holds configurations for the typescript compiler. They are fairly strict, as it improves
    code coverage and helps catch bugs without having to write extensive test cases.
* `tslint.json`: This file is used by the tslint package that serves as a style guideline.
* `TODOs`: This is a list of `TODOs`, as it makes them easier to find and `.json` files do not allow comments.

---

# Database
## Schema
- `Entity`: Contains information about suppliers and customers.
    - `EID`: The entity id
        - Type: `integer`
        - Automatically increments
        - Primary key
    - `name`: The name of the entity (e.g. 'Coke')
        - Type: `text`
        - Not null
    - `billingAddress`: Billing address of the entity
        - Type: `text`
        - Not null
    - `password`: Password for the entities account.
        - Type: `text`
        - Not null
- `Items`: Contains current price information about items
    - `IID`: Id of the item
        - Type: `integer`
        - Automatically increments
        - Primary key
    - `SID`: Id of the entity that supplies the item.
        - References `Entity[EID]`
        - Not null
    - `name`: The name of the item.
        - Type: `text`
        - Not null
    - `price`: The current price of the item.
        - Type: `float`
        - Not null
- `Invoice`: A facade-like reference that holds at least an ID
    - `InId`: The id of this invoice
        - Type: `integer`
        - Automatically increments
        - Primary key
    - `NextInId`: The ID of a previous invoice for the same order. This can be used to track a history of changes for
        an order.
        - References `Invoice[InId]`
- `InvoiceItems`: This holds the information for which items are in which invoices. This also keeps track of the price
    that the item was bought at.
    - Primary key: `(InId, IID)`
    - `InId`: The id of the invoice.
        - References `Invoice[InId]`
        - Not null
    - `IID`: The id of the item
        - References `Items[IID]`
        - Not null
    - `price`: The price that the items were bought at (per unit)
        - Type: `float`
        - Not null
    - `quantity`: The number of units of items ordered
        - Type: `integer`
        - Not null
- `WarehouseContents`: This contains information about where certain items are stocked.
    - `SID`: The supplier ID
        - References `Entity[EID]`
        - Not null
    - `IID`: The item ID
        - References `Items[IID]`
        - Not null
    - `location`: The location that the item is being stored
        - Type: `text`
        - Not null
    - `quantity`:
        - Type: `integer`
        - Defaults to 0 if null
- `Orders`: Contains the information for an order placed by the customer. Each order refers to a single invoice which
    refers to the items ordered.
    - `OID`: The unique ID of the order
        - Type: `integer`
        - Automatically increments
        - Primary key
    - `InId`: The current invoice ID
        - References `Invoice[InId]`
        - Not null
    - `DID`: The driver ID that will be delivering the goods.
        - Type: `integer`
        - Not null
    - `SID`: The ID of the entity supplying the goods
        - References `Entity[EID]`
        - Not null
    - `CID`: The ID of the entity purchasing the goods
        - References `Entity[EID]`
        - Not null
---

# How To
## Add a new endpoint
The endpoint that you will be creating is a service, so most of the code will be placed in `src/services`. You will also
have to write tests for this code, as the correctness of the application is determined by whether or not the endpoints
function correctly. The file structure of the endpoint should be as follows:

- `src/services/`
    - `<Service>/`
        - `providers/`
            - `<external>.ts`
            - `<external>.test.ts`
        - `<Service>Controller.ts`
        - `routes.ts`
        - `routes.test.ts`
    - `index.ts` (You will only add one line here)

Each `<service>` is a functionality, for example, the `User` service defines all endpoints and logic pertaining to 
getting/verifying/creating user information. You may or may not create multiple `providers` to add your functionality to
an existing service or create a new service.

Each provider is responsible for accessing an external resource, such as the database. In the scenario that the 
provider is accessing the database, you should create an exported function that returns a SQL string given some set of
parameters. You would also create a function that uses the `query` util to get a result from the database and do some
basic checks on the correctness of the query. Finally, the function would return the result `as` some type most likely
defined in or consisting of a combination of types defined in `src/utils/dbTypes.ts`.

The `<Service>Controller` defines a set of functions that provide standard APIs for the functions defined in the
providers. These functions are called when a route directs the request to the endpoint assigned to it in `routes.ts`.
Note that service specific checks go here, while checks that are used in more than one service are put in `src/utils`.
The main reason for this file is to make it so that if you were to change the database that is used, for example, all
you would have to do is add a `provider` and change the body `controller` function responsible exposing that `provider`.

`routes.ts` defines a list of objects (interface `IRoute`) containing the `path`, HTTP `method`, and list of `handlers` 
that define the behavior of a certain endpoint. The `path` is the url that, when hit with the specified HTTP `method`, 
will call the provided list of `handlers` (signature `req: Request, res: Response, next: NextFunction`) which are called
sequentially. Each handler that accepts a next function is responsible for calling it at the end of the logic for that 
handler so that the next handler is called. A standard approach to defining the list of handlers is

1. A `check<Provider>Params` function first that verifies that the correct parameters are present.
1. A function that calls a `providerController` to get a `result`. If the result returns successfully, send a success
    status code along with the result (`res.status(200).send(result);`) and return the result.
    
To make sure your routes are actually used by the express application, you should import your list of `IRoute` objects 
in `src/services/index.ts` and concatenate it with the list of other endpoints that are exported. Generally this should
look something like this: `export default [..., ...<YourIRouteList>] as IRoute[];`.


## Add new middleware
Middleware is similar to services, however, it is application wide. While routes are applied to the server using the 
same method as the HTTP verb being used (`router.get(...)`), middleware is applied using `router.use(...)`. Middleware
is _usually_ applied to the entire application, and is thus run in every sequence of handlers that is called on 
request to the server. One example of application wide middleware is `bodyParser` (`src/middleware/common.ts`). This
parses the request information from the frontend (`https://<host>/<endpoint>?<param>=<value>`) into an object 
(`{<param>: <value>}`) and stores it in the `Request` object passed to all subsequent handlers.

To add new middleware to the application, you will effectively wrap the call to `app.use(...)` in a handler that is
automatically called when the application starts.

1. In `<yourMiddleware>.ts`, export a wrapper of type `MiddlewareHandler` (`src/middleware/index.ts`) that will look 
   something like this:
    ```
    export const handle<MyMiddleware> = (router: Router) => {
        router.use(...);
    };
    ```
    Note that you do not need to define the type `export const handle<MyMiddleware>: MiddlewareHandler` because 
    typescript will be able to infer this type later down the road. Just make sure it uses the function header defined
    by `MiddlewareHandler`.
1. Add your `handle<MyMiddleware>` function to the default export of `src/middleware/index.ts` (which is exported as 
   type `MiddlewareHandler[]`). Now your middleware will automatically be imported when the application starts!
   
If you are interested in how the middleware is automatically, follow the `applyMiddleware` (`src/utils/index.ts`)
function is used un `src/server.ts` which is the file that is run on startup.

The main reason for setting up middleware like this is so that `src/server.ts` does not have to deal with middleware
directly and can just rely on `src/middleware/index.ts`. This reasoning becomes more apparent in larger applications 
that use a lot of middleware functions.

## Add a table to the database
You will essentially need to documnt your changes in 3 places and ensure that nothing breaks after your change.
For example, if you were to add a table for driver information, you would see that `Order[DID]` would have to be changed
to reference `Drivers[DID]`. You  would have to make sure that any data inserted or queries that use this do not break.

1. Add your table to `RequestToPay.ddl`. This would look something like this:
    ```
     create table TABLE_NAME (
       COLUMN_NAME TYPE CONSTRAINTS,
       ...
     );
    ```
1. Add some data to your newly created table in `R2PData.sql` so that when a fresh database is loaded, the new table is
    populated.
1. Update the `README.md` [Database](#Database) section to reflect the changed schema.

You will also have to:

1. Load the new data in the database.
1. Ensure all tests still pass (`npm tun test`).
