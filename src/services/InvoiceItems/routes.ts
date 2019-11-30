/** Defines the routes and endpoints available for Invoice Items. */

import { Request, Response } from "express";
import {InvoiceItems, Item} from "../../utils/dbTypes";
import {IRoute} from "../index";
import {getItem} from "../Item/QueryController";
import {
    checkInvoiceItemsQueryParams,
    checkInvoiceItemsSetParams,
    getInvoiceItems,
    setInvoiceItems,
} from "./QueryController";

export default [
    {
        handler: [
            checkInvoiceItemsSetParams,
            async (req: Request, res: Response) => {
                const item: Item = await getItem(req.query.IID);
                const items: InvoiceItems = {
                    InID: req.query.InID,
                    IID: req.query.IID,
                    Price: item.Price,
                    Quantity: req.query.Quantity,
                };
                const result = await setInvoiceItems(items);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "put",
        path: "/api/v1/invoiceItems",
    },
    {
        handler: [
            checkInvoiceItemsQueryParams,
            async (req: Request, res: Response) => {
                const result = await getInvoiceItems(req.query.InID);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/invoiceItems",
    },
] as IRoute[];
