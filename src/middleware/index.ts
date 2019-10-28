/* This is the main entry point to the middleware methods. To add new middleware, import and export it here and it will
*  automatically be added to the application. Follow the pattern that is set by the other middleware functions.
*  */
import {handleAPIDocs} from "./apiDocs";
import {
    handleBodyRequestParsing,
    handleCompression,
    handleCors,
} from "./common";
import {handleInfoLogger} from "./loggerHandlers";
import {handleSession} from "./session";

export default [
    handleCors,
    handleBodyRequestParsing,
    handleCompression,
    handleAPIDocs,
    handleInfoLogger,
    handleSession,
];
