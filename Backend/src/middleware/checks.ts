/* This file defines a series of checks that are used to verify parameters passed to certain API endpoints. */
import { NextFunction, Request, Response } from "express";
import { HTTP400Error } from "../utils/httpErrors";
import set = Reflect.set;

export const checkUserQueryParams = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (!req.query.u) {
        throw new HTTP400Error("Missing u parameter");
    } else if (req.query.u === "") {
        throw new HTTP400Error("Empty string not permitted");
    } else if (/^[a-zA-Z()]+$/.test(req.query.u)) {
        throw new HTTP400Error("Only alphabetic characters are allowed");
    } else {
        next();
    }
};

export const checkUserVerifyParams = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (!req.query.u) {
        throw new HTTP400Error("Missing u parameter");
    } else if (!req.query.p) {
        throw new HTTP400Error("Missing p parameter");
    } else {
        next();
    }
};
