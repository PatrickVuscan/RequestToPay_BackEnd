/* This is the file where the external APIs of the providers gets turned into the API used by the handlers in the IRoute
 * objects exported by this service. Some checks that are used exclusively by the UserService are also defined here.
 * */

import {NextFunction, Request, Response} from "express";
import {checkAscii, checkDate} from "../../utils/checks";
import {entity} from "../../utils/dbTypes";
import {HTTP400Error} from "../../utils/httpErrors";
import {createEntity} from "./providers/createEntityRequest";
import {getEntityByEntityID} from "./providers/entityByIDRequest";
import {getEntityByEntityName} from "./providers/entityByNameRequest";
import {loginRequest} from "./providers/loginRequest";

export const setEntity = async (ent: entity) => {
    return createEntity(ent);
};

export const getLogin = async  (name: string, pass: string) => {
    return await loginRequest(name, pass);
};

export const getEntityByID = async (EID: number) => {
    return await getEntityByEntityID(EID);
};

export const getEntityByName = async (name: string) => {
    return await getEntityByEntityName(name);
};

export const checkEntitySetQueryParams = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    if (!req.query.Name) {
        throw new HTTP400Error("Missing Name parameter");
    } else if (!req.query.Password) {
        throw new HTTP400Error("Missing Password parameter");
    } else if (!req.query.BillingAddress) {
        throw new HTTP400Error("Missing BillingAddress parameter");
    } else if (!checkAscii(req.query.Name) || !checkAscii(req.query.Password) ||
        !checkAscii(req.query.BillingAddress)) {
        console.log(req.query);
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

export const checkEntityByIDQueryParams = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    if (!req.query.EID) {
        throw new HTTP400Error("Missing EntityID parameter");
    } else if (!checkAscii(req.query.EID)) {
        throw new HTTP400Error("Only alphabetic characters are allowed");
    } else {
        next();
    }
};

export const checkEntityByNameQueryParams = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    if (!req.query.user) {
        throw new HTTP400Error("Missing username parameter");
    } else if (!checkAscii(req.query.user)) {
        throw new HTTP400Error("Only alphabetic characters are allowed");
    } else {
        next();
    }
};
