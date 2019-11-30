/** Defines the routes and endpoints available for invoices. */

import { Request, Response } from "express";
import {IRoute} from "..";
import {Invoice} from "../../utils/dbTypes";
import {
    checkEntityInvoicesQueryParams,
    checkInvoiceQueryParams,
    checkInvoiceSetParams,
    getEntityInvoices,
    getInvoice,
    setInvoice,
} from "./QueryController";

export default [
    {
        handler: [
            checkInvoiceSetParams,
            async (req: Request, res: Response) => {
                const inv: Invoice = {
                        InID: -1,
                        DeliveryDate: new Date(Date.parse(req.query.DeliveryDate)),
                        NextInID: (req.query.NextInID ? req.query.NextInID : null),
                    };
                const result = await setInvoice(inv);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "put",
        path: "/api/v1/invoice",
    },
    {
        handler: [
            checkInvoiceQueryParams,
            async (req: Request, res: Response) => {
                const result = await getInvoice(req.query.InID);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/invoice",
    },
    {
        handler: [
            checkEntityInvoicesQueryParams,
            async (req: Request, res: Response) => {
                const result = await getEntityInvoices(req.query.EID);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/entityInvoices",
    },
] as IRoute[];
