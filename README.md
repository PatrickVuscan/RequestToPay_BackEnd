This is the backend repository for the Scotia Bank project for team Works(*ish*).

A working [demo](https://worksish-backend-v1.herokuapp.com/api-docs) of implemented endpoints. Try `username: driver` 
and `password: zoomzoom`

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
        . This is liable to changes from Heroku.
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
            - e.g. `git push herkou master`
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
    * `generate-db-types`: Generates typescript interfaces for objects from database tables. Options are defined in
    `schemats.json`.
* Other notable commands
    * `pg_dump -U <user> -f schema.sql -s <DBNAME>`: dumps the schema for `<DBNAME>` to a `.sql` file.

---

# What is this file?
## General files by type/directory
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
        should be included here (more in the [How-To](#How-To) section).
    * `services`: This holds services. An example of a service is anything that gets information using an external
        API. Having this allows us to decouple the external API from our own internal API.
        * `*/providers`: This is where the objects that contact external APIs go. This *decouples*
            our code from code that we cannot control.
    * `utils`: Utilities go here. Utils are used by multiple other files, but do not interact with external
        APIs like services might. Often, a util will define a _singleton_ that is used in many different places.
    * `*/__mocks__/*`: Files defined here can be automatically used by jest during testing to replace files with the 
        same name defined at the same level as the `__mocks__` directory. To make jest use `__mocks__/<file>` rather than
    `<file>`, insert `jest.mock("<relative_path_to_file>")` after the imports in the `*.test.ts` files.

## Specific files
* `config/`
    * `swagger.json`: This holds api documentation information that is hosted using the `swagger` package.
        The middleware handler for this can be found in `middleware/apiDocs.ts`. This is what determines what is rendered
        when you navigate to `https://<host>[:port]/api-docs`
    * `jestSetup.json`: This is run before any jest test scripts are run. This option is enabled in `package.json`.
* `.env`: This holds environment variables that are inserted using the `dotenv` package.
* `.gitignore`: This holds a list of file patterns that should be ignored when putting files on git.
* `.npmrc`: Makes it so that `npm install` automatically saves packages to `package.json`.
* `package.json`: This specifies required packages, their versions, and various npm scripts.
* `pm2.yaml`: This is used by `npm run start` and describes the behavior of pm2 when the application is started.
* `README.md`: This file.
* `schema.sql`: this can be generated by running the `pg_dump` command described in **Commands** and when run
    in sql, it will generate the Postgres database required for this application. This should be updated every
    every time the database schema is changed.
* `schemats.json`: This file holds configuration info for the npm script `generate-db-types`. Namely, it contains
    the connection url.
* `tsconfig.json`: This holds configurations for the typescript compiler. They are fairly strict, as it improves
    code coverage and helps catch bugs without having to write extensive test cases.
* `tslint.json`: This file is used by the tslint package that serves as a style guideline.
* `TODOs`: This is a list of `TODOs`, as it makes them easier to find and `.json` files do not allow comments.

---

# How To
