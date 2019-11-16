/* This is the file where the external APIs of the providers gets turned into the API used by the handlers in the IRoute
 * objects exported by this service.
 * */

import {NextFunction, Request, Response} from "express";
import {checkAscii, checkDate} from "../../utils/checks";
import {Item} from "../../utils/dbTypes";
import {HTTP400Error} from "../../utils/httpErrors";
import {createItem} from "./providers/createItemRequest";
import {getItemsByName} from "./providers/itemByNameRequest";
import {getItemByItemID} from "./providers/itemRequest";

export const setItem = async (item: Item) => {
    return createItem(item);
};

export const getItem = async (itemID: number) => {
    return await getItemByItemID(itemID);
};

export const getItemByName = async (name: string) => {
    return await getItemsByName(name);
};

export const checkItemSetQueryParams = (
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

export const checkItemByItemIDGetQueryParams = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    if (!req.query.IID) {
        throw new HTTP400Error("Missing IID parameter");
    } else if (!checkAscii(req.query.IID)) {
        throw new HTTP400Error("Only alphabetic characters are allowed");
    } else {
        next();
    }
};

export const checkItemByItemNameGetQueryParams = (
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
