/* This is the file where the external APIs of the providers gets turned into the API used by the handlers in the IRoute
 * objects exported by this service. */

import {NextFunction, Request, Response} from "express";
import {checkAscii, checkDate} from "../../utils/checks";
import {Order} from "../../utils/dbTypes";
import {HTTP400Error} from "../../utils/httpErrors";
import {createOrder} from "./providers/createOrder";
import {retrieveOrder} from "./providers/retrieveOrder";
import {retrieveOrders} from "./providers/retrieveOrders";
import {retrieveOrdersByPersona} from "./providers/retrieveOrdersByPersona";
import {updateStatus} from "./providers/setStatus";

export const setOrder = async (inv: Order) => {
    return createOrder(inv);
};

export const getOrder = async (invoiceID: number, fullOrder: boolean) => {
    return await retrieveOrder(invoiceID, fullOrder);
};

export const getOrders = async (entityID: number, fullOrder: boolean) => {
    return await retrieveOrders(entityID, fullOrder);
};

export const getFullOrdersByPersona = async (entityID: number, persona: string) => {
    return await retrieveOrdersByPersona(entityID, persona);
};

export const setStatus = async (orderID: number, status: string, state: boolean) => {
    return await updateStatus(orderID, status, state);
};

export const checkOrderSetParams = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    if (!req.query.SID) {
        throw new HTTP400Error("Missing SID parameter");
    } else if (!req.query.CID) {
        throw new HTTP400Error("Missing CID parameter");
    } else if (!req.query.DID) {
        throw new HTTP400Error("Missing DID parameter");
    } else if (!req.query.OrderDate) {
        throw new HTTP400Error("Missing OrderDate parameter");
    } else if (!req.query.DeliveryDate) {
        throw new HTTP400Error("Missing DeliveryDate parameter");
    } else if (!req.body.invoiceItems) {
        throw new HTTP400Error("Missing invoiceItems parameter");
    } else if (!checkAscii(req.query.SID) || !checkAscii(req.query.CID) || !checkAscii(req.query.DID) ||
        !checkAscii(req.query.OrderDate) || !checkAscii(req.query.DeliveryDate)) { // TODO Write regex to check array
        throw new HTTP400Error("Only alphanumeric and '-' characters are allowed");
    } else if (!checkDate(req.query.DeliveryDate) || !checkDate(req.query.OrderDate)) {
        throw new HTTP400Error("Not a valid date string");
    } else {
        next();
    }
};

export const checkOrderQueryParams = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    if (!req.query.OID) {
        throw new HTTP400Error("Missing OID parameter");
    } else if (!checkAscii(req.query.OID)) {
        throw new HTTP400Error("Only alphabetic characters are allowed");
    } else {
        next();
    }
};

export const checkOrdersQueryParams = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    if (!req.query.EID) {
        throw new HTTP400Error("Missing EID parameter");
    } else if (!checkAscii(req.query.EID)) {
        throw new HTTP400Error("Only alphabetic characters are allowed");
    } else {
        next();
    }
};

export const checkFullOrderParam = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    if (!!req.query.FullOrder && !checkAscii(req.query.FullOrder)) {
        throw new HTTP400Error("Only alphabetic characters are allowed.");
    } else {
        next();
    }
};

export const checkOrdersByPersonaQueryParams = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    if (!req.query.EID) {
        throw new HTTP400Error("Missing EID parameter");
    } else if (!req.query.Persona) {
        throw new HTTP400Error("Missing Persona parameter");
    } else if (!checkAscii(req.query.EID) || !checkAscii(req.query.Persona)) {
        throw new HTTP400Error("Only alphabetic characters are allowed");
    } else {
        next();
    }
};

export const checkUpdateStatusQueryParams = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    if (!req.query.OID) {
        throw new HTTP400Error("Missing OID parameter");
    } else if (!req.query.status) {
        throw new HTTP400Error("Missing status parameter");
    } else if (!req.query.state) {
        throw new HTTP400Error("Missing state parameter");
    } else if (!checkAscii(req.query.OID) || !checkAscii(req.query.status) || !checkAscii(req.query.state)) {
        throw new HTTP400Error("Only alphanumeric and '-' characters are allowed");
    } else {
        next();
    }
};
