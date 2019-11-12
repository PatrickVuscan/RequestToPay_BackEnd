/* This is the file where the external APIs of the providers gets turned into the API used by the handlers in the IRoute
 * objects exported by this service.
 * */

import {NextFunction, Request, Response} from "express";
import {checkAscii, checkDate} from "../../utils/checks";
import {invoices} from "../../utils/dbTypes";
import {HTTP400Error} from "../../utils/httpErrors";
import {createInvoice} from "./providers/createInvoiceRequest";
import {getInvoiceByInvoiceId} from "./providers/invoiceRequest";

export const getInvoice = async (invoiceId: number) => {
    return await getInvoiceByInvoiceId(invoiceId);
};

export const setInvoice = async (invoice: invoices) => {
    return createInvoice(invoice);
};

export const checkInvoiceSetQueryParams = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    if (!req.query.DeliveryDate) {
        throw new HTTP400Error("Missing DeliveryDate parameter");
    } else if (!checkAscii(req.query.DeliveryDate)) {
        throw new HTTP400Error("Only alphabetic characters are allowed");
    } else if (!checkDate(req.query.DeliveryDate)) {
        throw new HTTP400Error("Not a valid date string");
    } else {
        req.query.DeliveryDate = new Date(Date.parse(req.query.DeliveryDate));
        next();
    }
};

export const checkInvoiceGetQueryParams = (
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
