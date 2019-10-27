/* This file inserts the error handlers into the application as middleware. */
import {NextFunction, Request, Response, Router} from "express";
import * as ErrorHandler from "../utils/ErrorHandler";

const handleClientError = (router: Router) => {
    router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        ErrorHandler.clientError(err, res, next);
    });
};

const handleServerError = (router: Router) => {
    router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        ErrorHandler.serverError(err, res, next);
    });
};

export default [handleClientError, handleServerError];
