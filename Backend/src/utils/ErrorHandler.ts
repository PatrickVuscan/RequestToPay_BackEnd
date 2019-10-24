/* This file defines methods that error catching middleware uses. */
import {Response, NextFunction, Request} from "express";
import {HTTPClientError, HTTP404Error} from "./httpErrors";
import {logger} from "./logger";

export const notFoundError = (req: Request, res: Response) => {
    throw new HTTP404Error(`method not found: ${res.app} -- ${req.query}`);
};

export const clientError = (err: Error, res: Response, next: NextFunction) => {
    if (err instanceof HTTPClientError) {
        logger.error(err);
        res.status(err.statusCode).send(err.message);
    } else {
        next(err);
    }
};

export const serverError = (err: Error, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === "production") {
        logger.error(err);
        res.status(500).send("Internal Server Error");
    } else {
        res.status(500).send(err.stack);
    }
};
