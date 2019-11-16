/** Defines the routes and endpoints available for orders. */

import { Request, Response } from "express";
import {IRoute} from "..";
import {Order} from "../../utils/dbTypes";
import {
    checkInvoicesByEntityIDGetQueryParams,
    checkInvoicesByEntityNameGetQueryParams,
} from "../Invoice/QueryController";
import {
    checkOrderByOrderIDGetQueryParams,
    checkOrderSetQueryParams,
    getEntityOrdersById,
    getEntityOrdersByName,
    getOrder,
    getOrderUInvoice,
    getOrderUInvoiceUEntity,
    setOrder,
} from "./QueryController";

export default [
    {
        handler: [
            checkOrderSetQueryParams,
            async (req: Request, res: Response) => {
                const ord: Order = {
                    OID: -1,
                    InID: 1,
                    SID: req.query.SID,
                    CID: req.query.CID,
                    DID: req.query.DID,
                    OrderDate: new Date(Date.parse(req.query.OrderDate)),
                };
                const result = await setOrder(ord, new Date(Date.parse(req.query.DeliveryDate)));
                // TODO Either find the InID to be passed into InID above, or created and changed in the setOrder
                // function... Should be able to do this by calling the Invoice endpoint?
                res.status(200).send(result);
                return result;
            },
        ],
        method: "put",
        path: "/api/v1/order",
    },
    {
        handler: [
            checkOrderByOrderIDGetQueryParams,
            async (req: Request, res: Response) => {
                const result = await getOrder(req.query.OID);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/order",
    },
    {
        handler: [
            checkOrderByOrderIDGetQueryParams,
            async (req: Request, res: Response) => {
                const result = await getOrderUInvoice(req.query.OID);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/orderUInvoice",
    },
    {
        handler: [
            checkOrderByOrderIDGetQueryParams,
            async (req: Request, res: Response) => {
                const result = await getOrderUInvoiceUEntity(req.query.OID);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/orderUInvoiceUEntity",
    },
    {
        handler: [
            checkInvoicesByEntityIDGetQueryParams,
            async (req: Request, res: Response) => {
                const result = await getEntityOrdersById(req.query.EID);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/entityOrdersByID",
    },
    {
        handler: [
            checkInvoicesByEntityNameGetQueryParams,
            async (req: Request, res: Response) => {
                const result = await getEntityOrdersByName(req.query.Name);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/entityOrdersByName",
    },
] as IRoute[];
