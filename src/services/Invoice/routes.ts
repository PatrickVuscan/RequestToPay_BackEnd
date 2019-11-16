/** Defines the routes and endpoints available for invoices. */

import { Request, Response } from "express";
import {IRoute} from "..";
import {Invoice} from "../../utils/dbTypes";
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
            checkInvoiceByInvoiceIDGetQueryParams,
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
