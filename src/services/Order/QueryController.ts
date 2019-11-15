/* This is the file where the external APIs of the providers gets turned into the API used by the handlers in the IRoute
 * objects exported by this service.
 * */

import {NextFunction, Request, Response} from "express";
import {checkAscii, checkDate} from "../../utils/checks";
import {order} from "../../utils/dbTypes";
import {HTTP400Error} from "../../utils/httpErrors";
import {createOrder} from "./providers/createOrderRequest";
import {getOrderByOrderID} from "./providers/orderRequest";

export const setOrder = async (inv: order, delDate: Date) => {
    return createOrder(inv, delDate);
};

export const getOrder = async (invoiceID: number) => {
    return await getOrderByOrderID(invoiceID);
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
