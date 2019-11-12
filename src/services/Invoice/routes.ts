/* Defines the routes and functions called in that route for the user service. */

import { Request, Response } from "express";
import {IRoute} from "..";
import {checkInvoiceGetQueryParams, checkInvoiceSetQueryParams, getInvoice, setInvoice} from "./QueryController";

export default [
    {
        handler: [
            checkInvoiceSetQueryParams,
            async (req: Request, res: Response) => {
                const result = await setInvoice(req.query);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "put",
        path: "/api/v1/invoice",
    },
    {
        handler: [
            checkInvoiceGetQueryParams,
            async (req: Request, res: Response) => {
                const result = await getInvoice(req.query.InID);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/invoice",
    },
] as IRoute[];
