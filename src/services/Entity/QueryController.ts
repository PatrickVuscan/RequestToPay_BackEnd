/* This is the file where the external APIs of the providers gets turned into the API used by the handlers in the IRoute
 * objects exported by this service. Some checks that are used exclusively by the UserService are also defined here. */

import {NextFunction, Request, Response} from "express";
import {checkAscii} from "../../utils/checks";
import {Entity} from "../../utils/dbTypes";
import {HTTP400Error} from "../../utils/httpErrors";
import {createDemoEntity} from "./providers/createDemoEntity";
import {createEntity} from "./providers/createEntity";
import {loginRequest} from "./providers/loginRequest";
import {retrieveEntity} from "./providers/retrieveEntity";

export const setEntity = async (ent: Entity) => {
    return createEntity(ent);
};

export const getLogin = async  (name: string, pass: string) => {
    return await loginRequest(name, pass);
};

export const getEntity = async (EID: number) => {
    return await retrieveEntity(EID);
};

export const setDemoEntity = async (ent: Entity) => {
    return createDemoEntity(ent);
};

export const checkEntitySetParams = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    if (!req.query.Name) {
        throw new HTTP400Error("Missing Name parameter");
    } else if (!req.query.Username) {
        throw new HTTP400Error("Missing Username parameter");
    } else if (!req.query.Password) {
        throw new HTTP400Error("Missing Password parameter");
    } else if (!req.query.BillingAddress) {
        throw new HTTP400Error("Missing BillingAddress parameter");
    } else if (!checkAscii(req.query.Name) || !checkAscii(req.query.Username) || !checkAscii(req.query.Password) ||
        !checkAscii(req.query.BillingAddress)) {
        throw new HTTP400Error("Only alphanumeric and '-' characters are allowed");
    } else {
        next();
    }
};

export const checkLoginParams = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (!req.query.user) {
        throw new HTTP400Error("Missing username parameter");
    } else if (!req.query.pass) {
        throw new HTTP400Error("Missing password parameter");
    } else if (!checkAscii(req.query.user) || !checkAscii(req.query.pass)) {
        throw new HTTP400Error("Only alphabetic characters are allowed");
    } else {
        next();
    }
};

export const checkEntityQueryParams = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    if (!req.query.EID && !req.query.regex) {
        throw new HTTP400Error("Missing EntityID or regex parameter");
    } else if (!checkAscii(req.query.EID)) {
        throw new HTTP400Error("Only alphabetic characters are allowed");
    } else {
        next();
    }
};
