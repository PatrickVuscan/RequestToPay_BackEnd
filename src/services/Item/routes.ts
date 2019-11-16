/** Defines the routes and endpoints available for Items. */

import { Request, Response } from "express";
import {IRoute} from "..";
import {Item} from "../../utils/dbTypes";
import {
    checkItemByItemIDGetQueryParams,
    checkItemByItemNameGetQueryParams,
    checkItemSetQueryParams,
    getItem, getItemByName,
    setItem,
} from "./QueryController";

export default [
    {
        handler: [
            checkItemSetQueryParams,
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
            checkItemByItemIDGetQueryParams,
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
            checkItemByItemNameGetQueryParams,
            async (req: Request, res: Response) => {
                const result = await getItemByName(req.query.Name);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/itemsByName",
    },
] as IRoute[];
