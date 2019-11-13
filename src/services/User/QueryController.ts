/* This is the file where the external APIs of the providers gets turned into the API used by the handlers in the IRoute
 * objects exported by this service. Some checks that are used exclusively by the UserService are also defined here.
 * */

import {NextFunction, Request, Response} from "express";
import {checkAscii} from "../../utils/checks";
import {HTTP400Error} from "../../utils/httpErrors";
import {loginRequest} from "./providers/loginRequest";
import {getUserByName} from "./providers/userRequest";

export const checkUserQueryParams = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    if (!req.query.user) {
        throw new HTTP400Error("Missing u parameter");
    } else if (!checkAscii(req.query.user)) {
        throw new HTTP400Error("Only alphabetic characters are allowed");
    } else {
        next();
    }
};

export const getUser = async (name: string) => {
    return await getUserByName(name);
};

export const checkLoginParams = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (!req.query.user) {
        throw new HTTP400Error("Missing u parameter");
    } else if (!req.query.pass) {
        throw new HTTP400Error("Missing p parameter");
    } else if (!checkAscii(req.query.user) || !checkAscii(req.query.pass)) {
        throw new HTTP400Error("Only alphabetic characters are allowed");
    } else {
        next();
    }
};

export const getLogin = async  (name: string, pass: string) => {
    return await loginRequest(name, pass);
};
