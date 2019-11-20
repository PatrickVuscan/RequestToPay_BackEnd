/* This is the file where the external APIs of the providers gets turned into the API used by the handlers in the IRoute
 * objects exported by this service.
 * */

import {NextFunction, Request, Response} from "express";
import {checkAscii, checkDate} from "../../utils/checks";
import {Order} from "../../utils/dbTypes";
import {HTTP400Error} from "../../utils/httpErrors";
import {createOrder} from "./providers/createOrderRequest";
import {getOrdersByEntityID} from "./providers/entityOrdersByIDRequest";
import {getOrdersByEntityName} from "./providers/entityOrdersByNameRequest";
import {getOrdersUInvoiceUEntityByEntityID} from "./providers/entityOrdersUInvoiceUEntityByIDRequest";
import {getOrdersUInvoiceUEntityByEntityIDAndPersona} from "./providers/entityOrdersUInvoiceUEntityByIDRequestAndPersona";
import {getOrderByOrderID} from "./providers/orderRequest";
import {getOrderUInvoiceByOrderID} from "./providers/orderUInvoiceRequest";
import {getOrderUInvoiceUEntityByOrderID} from "./providers/orderUInvoiceUEntityRequest";
import {setArrivedStatus} from "./providers/setArrivedStatusRequest";
import {setDeliveredStatus} from "./providers/setDeliveredStatusRequest";
import {setPaidStatus} from "./providers/setPaidStatusRequest";

export const setOrder = async (inv: Order) => {
    return createOrder(inv);
};

export const getOrder = async (invoiceID: number) => {
    return await getOrderByOrderID(invoiceID);
};

export const getOrderUInvoice = async (invoiceID: number) => {
    return await getOrderUInvoiceByOrderID(invoiceID);
};

export const getOrderUInvoiceUEntity = async (invoiceID: number) => {
    return await getOrderUInvoiceUEntityByOrderID(invoiceID);
};

export const getEntityOrdersById = async (entityID: number) => {
    return await getOrdersByEntityID(entityID);
};

export const getEntityOrdersUInvoiceUEntityById = async (entityID: number) => {
    return await getOrdersUInvoiceUEntityByEntityID(entityID);
};

export const getEntityOrdersUInvoiceUEntityByIdAndPersona = async (entityID: number, persona: string) => {
    return await getOrdersUInvoiceUEntityByEntityIDAndPersona(entityID, persona);
};

export const getEntityOrdersByName = async (name: string) => {
    return await getOrdersByEntityName(name);
};

export const setOrderPaidStatus = async (orderID: number, status: boolean) => {
    return await setPaidStatus(orderID, status);
};

export const setOrderArrivedStatus = async (orderID: number, status: boolean) => {
    return await setArrivedStatus(orderID, status);
};

export const setOrderDeliveredStatus = async (orderID: number, status: boolean) => {
    return await setDeliveredStatus(orderID, status);
};

export const checkOrderSetQueryParams = (
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
    } else if (!checkAscii(req.query.SID) || !checkAscii(req.query.CID) || !checkAscii(req.query.DID) ||
        !checkAscii(req.query.OrderDate) || !checkAscii(req.query.DeliveryDate)) {
        throw new HTTP400Error("Only alphanumeric and '-' characters are allowed");
    } else if (!checkDate(req.query.DeliveryDate) || !checkDate(req.query.OrderDate)) {
        throw new HTTP400Error("Not a valid date string");
    } else {
        next();
    }
};

export const checkOrderByOrderIDGetQueryParams = (
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

export const checkOrdersByEntityIDGetQueryParams = (
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

export const checkOrdersByEntityIDAndPersonaGetQueryParams = (
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

export const checkOrdersByEntityNameGetQueryParams = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    if (!req.query.Name) {
        throw new HTTP400Error("Missing Name parameter");
    } else if (!checkAscii(req.query.Name)) {
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
    } else if (!checkAscii(req.query.OID) || !checkAscii(req.query.status)) {
        throw new HTTP400Error("Only alphanumeric and '-' characters are allowed");
    } else {
        next();
    }
};
