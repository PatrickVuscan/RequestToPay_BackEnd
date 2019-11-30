/* Defines the routes, and functions called in that route, for the Entity service. */

import { Request, Response } from "express";
import {IRoute} from "..";
import {Entity} from "../../utils/dbTypes";
import {
    checkEntityQueryParams,
    checkEntitySetParams,
    checkLoginParams,
    getEntity,
    getLogin,
    setEntity,
} from "./QueryController";

export default [
    {
        handler: [
            checkLoginParams,
            async (req: Request, res: Response) => {
                const result = await getLogin(req.query.user, req.query.pass);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/login",
    },
    {
        handler: [
            checkEntitySetParams,
            async (req: Request, res: Response) => {
                const ent: Entity = {
                    EID: -1,
                    Name: req.query.Name,
                    BillingAddress: req.query.BillingAddress,
                    Username: req.query.Username,
                    Password: req.query.Password,
                };
                const result = await setEntity(ent);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "put",
        path: "/api/v1/entity",
    },
    {
        handler: [
            checkEntityQueryParams,
            async (req: Request, res: Response) => {
                const result = await getEntity(req.query.EID);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/entity",
    },
] as IRoute[];
