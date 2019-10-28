/*
 * This file defines a series of checks that are used to verify parameters passed to certain API endpoints. Don't forget
 * to call next() or your endpoint won't get called.
*/
import { NextFunction, Request, Response } from "express";
import { HTTP400Error } from "../utils/httpErrors";

export const checkAscii = (str: string): boolean => {
    // make sure that from the beginning to the end of the string, all characters are alphabetic and there is at least 1
    return /^[a-zA-Z]+$/.test(str);
};

export const checkUserQueryParams = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    if (!req.query.u) {
        throw new HTTP400Error("Missing u parameter");
    } else if (!checkAscii(req.query.u)) {
        throw new HTTP400Error("Only alphabetic characters are allowed");
    } else {
        next();
    }
};

export const checkLoginParams = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (!req.query.u) {
        throw new HTTP400Error("Missing u parameter");
    } else if (!req.query.p) {
        throw new HTTP400Error("Missing p parameter");
    } else if (!checkAscii(req.query.u) || !checkAscii(req.query.p)) {
        throw new HTTP400Error("Only alphabetic characters are allowed");
    } else {
        next();
    }
};
