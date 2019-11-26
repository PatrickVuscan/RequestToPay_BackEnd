/* This is the file where the external APIs of the providers gets turned into the API used by the handlers in the IRoute
 * objects exported by this service. */

import {NextFunction, Request, Response} from "express";
import {checkAscii} from "../../utils/checks";
import {InvoiceItems} from "../../utils/dbTypes";
import {HTTP400Error} from "../../utils/httpErrors";
import {createInvoiceItems} from "./providers/createInvoiceItemsRequest";
import {getInvoiceItemsByInID} from "./providers/invoiceItemsRequest";

export const setInvoiceItems = async (items: InvoiceItems) => {
    return createInvoiceItems(items);
};

export const getInvoiceItems = async (InID: number) => {
    return getInvoiceItemsByInID(InID);
};

export const checkInvoiceItemsSetQueryParams = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    if (!req.query.InID) {
        throw new HTTP400Error("Missing InvoiceID parameter");
    } else if (!req.query.IID) {
        throw new HTTP400Error("Missing ItemID parameter.");
    } else if (!req.query.Quantity) {
        throw new HTTP400Error("Missing Quantity parameter.");
    } else if (!checkAscii(req.query.InID) || !checkAscii(req.query.IID) || !checkAscii(req.query.Quantity)) {
        throw new HTTP400Error("Only alphanumeric and '-' characters are allowed.");
    } else {
        next();
    }
};

export const checkInvoiceItemsByInvoiceIDGetQueryParams = (
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
