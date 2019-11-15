/* This is the file where the external APIs of the providers gets turned into the API used by the handlers in the IRoute
 * objects exported by this service.
 * */

import {NextFunction, Request, Response} from "express";
import {checkAscii, checkDate} from "../../utils/checks";
import {invoice} from "../../utils/dbTypes";
import {HTTP400Error} from "../../utils/httpErrors";
import {createInvoice} from "./providers/createInvoiceRequest";
import {getInvoicesByEntityID} from "./providers/entityInvoicesByIDRequest";
import {getInvoicesByEntityName} from "./providers/entityInvoicesByNameRequest";
import {getInvoiceByInvoiceID} from "./providers/invoiceRequest";

export const setInvoice = async (inv: invoice) => {
    return createInvoice(inv);
};

export const getInvoice = async (invoiceID: number) => {
    return await getInvoiceByInvoiceID(invoiceID);
};

export const getEntityInvoicesById = async (entityID: number) => {
    return await getInvoicesByEntityID(entityID);
};

export const getEntityInvoicesByName = async (name: string) => {
    return await getInvoicesByEntityName(name);
};

export const checkInvoiceSetQueryParams = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    if (!req.query.DeliveryDate) {
        throw new HTTP400Error("Missing DeliveryDate parameter");
    } else if (!checkAscii(req.query.DeliveryDate) || (req.query.NextInID && !checkAscii(req.query.NextInID))) {
        throw new HTTP400Error("Only alphanumeric and '-' characters are allowed");
    } else if (!checkDate(req.query.DeliveryDate)) {
        throw new HTTP400Error("Not a valid date string");
    } else {
        next();
    }
};

export const checkInvoiceByInvoiceIDGetQueryParams = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    if (!req.query.InID) {
        throw new HTTP400Error("Missing InID parameter");
    } else if (!checkAscii(req.query.InID)) {
        throw new HTTP400Error("Only alphabetic characters are allowed");
    } else {
        next();
    }
};

export const checkInvoicesByEntityIDGetQueryParams = (
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

export const checkInvoicesByEntityNameGetQueryParams = (
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
