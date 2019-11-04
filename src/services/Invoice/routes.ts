/* Defines the routes and functions called in that route for the user service. */

import { Request, Response } from "express";
import {IRoute} from "..";
import {checkUserQueryParams} from "../../middleware/checks";
import {createInvoice, getInvoiceByBusinessId, getInvoiceByOrderId} from "./providers/invoiceRequests";
// import {createInvoice} from "./QueryController";

export default [
    {
        handler: [
            checkUserQueryParams,
            // if (!req.session) {
            //     res.status(400);
            //     throw new Error("No session registered to client");
            // }
            async (req: Request, res: Response) => {
                const result = await createInvoice(req.query);
                res.status(200).send(result);
                // req.session.privilege = result.privilege;
                return result;
            },
        ],
        method: "put",
        path: "/api/v1/invoice",
    },
    {
        handler: [
            checkUserQueryParams,
            async (req: Request, res: Response) => {
                // if (!req.session) {
                //     res.status(400);
                //     throw new Error("No session registered to client");
                // }
                const result = await getInvoiceByOrderId(req.query.oId);
                res.status(200).send(result);
                // req.session.privilege = result.privilege;
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/invoice",
    },
    {
        handler: [
            checkUserQueryParams,
            async (req: Request, res: Response) => {
                // if (!req.session) {
                //     res.status(400);
                //     throw new Error("No session registered to client");
                // }
                const result = await getInvoiceByBusinessId(req.query.bId);
                res.status(200).send(result);
                // req.session.privilege = result.privilege;
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/invoices",
    },
] as IRoute[];
