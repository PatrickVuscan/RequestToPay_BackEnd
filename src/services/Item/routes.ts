/** Defines the routes and endpoints available for Items. */

import { Request, Response } from "express";
import {IRoute} from "..";
import {Item} from "../../utils/dbTypes";
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
