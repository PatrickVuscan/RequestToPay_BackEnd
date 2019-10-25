/* This file defines a middleware function to insert a logger into the express application. */
import { NextFunction, Request, Response, Router } from "express";
import { logger } from "../utils/logger";

export const handleInfoLogger = (router: Router) => {
    router.use( (req: Request, res: Response, next: NextFunction) => {
        logger.info({
            file: "loggerHandler.ts",
            ip: req.ip,
            origUrl: req.originalUrl,
            query: req.query,
        });
        next();
    });
};
