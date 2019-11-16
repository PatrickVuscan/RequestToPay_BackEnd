/** Defines the routes and endpoints available for Items. */

import { Request, Response } from "express";
import {IRoute} from "..";
import {Item} from "../../utils/dbTypes";
import {
    checkInvoiceByInvoiceIDGetQueryParams,
    checkInvoicesByEntityIDGetQueryParams,
    checkInvoicesByEntityNameGetQueryParams,
    checkInvoiceSetQueryParams,
    getEntityInvoicesById,
    getEntityInvoicesByName,
    getInvoice,
    setInvoice,
} from "./QueryController";

export default [
    {
        handler: [
            checkInvoiceSetQueryParams,
            async (req: Request, res: Response) => {
                const inv: Item = {
                        IID: req.query.IID,
                        Name: req.query.Name,
                        SID: req.query.SID,
                        Price: req.query.Price,
                    };
                const result = await setInvoice(inv);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "put",
        path: "/api/v1/item",
    },
    {
        handler: [
            checkInvoiceByInvoiceIDGetQueryParams,
            async (req: Request, res: Response) => {
                const result = await getInvoice(req.query.InID);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/item",
    },
    {
        handler: [
            checkInvoicesByEntityIDGetQueryParams,
            async (req: Request, res: Response) => {
                const result = await getEntityInvoicesById(req.query.EID);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/entityInvoicesByID",
    },
    {
        handler: [
            checkInvoicesByEntityNameGetQueryParams,
            async (req: Request, res: Response) => {
                const result = await getEntityInvoicesByName(req.query.Name);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/entityInvoicesByName",
    },
] as IRoute[];
