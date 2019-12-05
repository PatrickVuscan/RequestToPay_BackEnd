/** Defines the routes and endpoints available for Items. */

import { Request, Response } from "express";
import {IRoute} from "..";
import {Item} from "../../utils/dbTypes";
import {logger} from "../../utils/logger";
import {sendSMS} from "../../utils/sms";
import {getEntity} from "../Entity/QueryController";
import {getOrder} from "../Order/QueryController";
import {
    checkItemByNameQueryParams,
    checkItemQueryParams,
    checkItemSetParams,
    getItem,
    getItemsByName,
    setItem,
} from "./QueryController";

export default [
    {
        handler: [
            checkItemSetParams,
            async (req: Request, res: Response) => {
                const item: Item = {
                        IID: req.query.IID,
                        Name: req.query.Name,
                        SID: req.query.SID,
                        Price: req.query.Price,
                    };
                const result = await setItem(item);
                res.status(200).send(result);
                // send SMS updates to appropriate parties
                const seller = await getEntity(req.query.SID);
                // send the notifications with the appropriate messages
                if (seller.PhoneNumber) {
                    logger.info({
                        file: "src/services/Order/route.ts",
                        message: await sendSMS(
                            seller.PhoneNumber,
                            `You have successfully registered item ${req.query.Name} for $${req.query.Price}. The ID is ${result}`),
                    });
                }
                return result;
            },
        ],
        method: "put",
        path: "/api/v1/item",
    },
    {
        handler: [
            checkItemQueryParams,
            async (req: Request, res: Response) => {
                const result = await getItem(req.query.IID);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/item",
    },
    {
        handler: [
            checkItemByNameQueryParams,
            async (req: Request, res: Response) => {
                const result = await getItemsByName(req.query.Name);
                res.status(200).send(result);
                return result; // Note that it can return no items.
            },
        ],
        method: "get",
        path: "/api/v1/itemsByName",
    },
] as IRoute[];
