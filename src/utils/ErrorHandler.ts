/* This file defines methods that error catching middleware uses. That is, when an  */
import {NextFunction, Response} from "express";
import {HTTPClientError} from "./httpErrors";
import {logger} from "./logger";

// catches client errors
export const clientError = (err: Error, res: Response, next: NextFunction) => {
    if (err instanceof HTTPClientError) {
        logger.error(err);
        res.status(err.statusCode).send(err.message);
    } else {
        next(err);
    }
};

// catches server errors
export const serverError = (err: Error, res: Response, next: NextFunction) => {
    if (!(err instanceof HTTPClientError)) {
        // send the stack if we are not in production mode
        if (process.env.NODE_ENV === "production") {
            logger.error(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.status(500).send(err.stack);
        }
    } else {
        next(err);
    }
};
