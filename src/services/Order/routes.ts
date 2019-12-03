/** Defines the routes and endpoints available for orders. */

import { Request, Response } from "express";
import {IRoute} from "..";
import {Invoice, Item, Order} from "../../utils/dbTypes";
import {HTTP404Error} from "../../utils/httpErrors";
import {setInvoice} from "../Invoice/QueryController";
import {setInvoiceItems} from "../InvoiceItems/QueryController";
import {getItem} from "../Item/QueryController";
import {
    checkFullOrderParam,
    checkOrderQueryParams,
    checkOrdersByPersonaQueryParams,
    checkOrderSetParams,
    checkOrdersQueryParams,
    checkUpdateStatusQueryParams,
    getFullOrdersByPersona,
    getOrder,
    getOrders,
    setOrder,
    setStatus,
} from "./QueryController";

export default [
    {
        handler: [
            checkOrderSetParams,
            async (req: Request, res: Response) => {
                const inv: Invoice = {
                    InID: -1,
                    DeliveryDate: new Date(Date.parse(req.query.DeliveryDate)),
                    NextInID: null,
                };
                const InvID = await setInvoice(inv);
                const ord: Order = {
                    OID: -1,
                    InID: InvID,
                    SID: req.query.SID,
                    CID: req.query.CID,
                    DID: req.query.DID || "null",  // this is an optional parameter, as it might be set later
                    OrderDate: new Date(Date.parse(req.query.OrderDate)),
                    ArrivedStatus: false,
                    DeliveredStatus: false,
                    PaidStatus: false,
                    ApprovedStatus: false,
                };
                const OrderID = await setOrder(ord);
                for (const currItems of req.body.invoiceItems) {
                    const item: Item = await getItem(currItems.IID);
                    const items = {
                        InID: InvID,
                        IID: currItems.IID,
                        Price: item.Price,
                        Quantity: currItems.Quantity,
                    };
                    await setInvoiceItems(items);
                }
                res.status(200).send(OrderID);
                return OrderID;
            },
        ],
        method: "put",
        path: "/api/v1/order",
    },
    {
        handler: [
            checkOrderQueryParams,
            checkFullOrderParam,
            async (req: Request, res: Response) => {
                const result = await getOrder(req.query.OID, !!req.query.FullOrder);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/order",
    },
    {
        handler: [
            checkOrdersQueryParams,
            checkFullOrderParam,
            async (req: Request, res: Response) => {
                const result = await getOrders(req.query.EID, !!req.query.FullOrder);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/orders",
    },
    {
        handler: [
            checkOrdersByPersonaQueryParams,
            async (req: Request, res: Response) => {
                const reqPersona = req.query.Persona;
                let Persona;
                if (reqPersona === "Customer" || reqPersona === "customer" || reqPersona === "c") {
                    Persona = "CID";
                } else if (reqPersona === "Seller" || reqPersona === "seller" || reqPersona === "s") {
                    Persona = "SID";
                } else if (reqPersona === "Driver" || reqPersona === "driver" || reqPersona === "d") {
                    Persona = "DID";
                } else {
                    throw new HTTP404Error("Persona does not match any of the accepted personas.");
                }
                const result = await getFullOrdersByPersona(req.query.EID, Persona);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/ordersByPersona",
    },
    {
        handler: [
            checkUpdateStatusQueryParams,
            async (req: Request, res: Response) => {
                const reqStatus = req.query.status;
                let Status;
                if (reqStatus === "ArrivedStatus" || reqStatus === "Arrived" || reqStatus === "a") {
                    Status = "ArrivedStatus";
                } else if (reqStatus === "DeliveredStatus" || reqStatus === "Delivered" || reqStatus === "d") {
                    Status = "DeliveredStatus";
                } else if (reqStatus === "PaidStatus" || reqStatus === "Paid" || reqStatus === "p") {
                    Status = "PaidStatus";
                } else if (reqStatus === "ApprovedStatus" || reqStatus === "Approved" || reqStatus === "ap") {
                    Status = "ApprovedStatus";
                } else {
                    throw new HTTP404Error("Status does not match any of the accepted statuses.");
                }
                const result = await setStatus(req.query.OID, Status, req.query.state);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "put",
        path: "/api/v1/orderStatus",
    },
] as IRoute[];
