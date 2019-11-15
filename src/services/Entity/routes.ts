/* Defines the routes and functions called in that route for the user service. */

import { Request, Response } from "express";
import {IRoute} from "..";
import {
    checkEntityByIDQueryParams,
    checkEntityByNameQueryParams,
    checkLoginParams, getEntityByID,
    getEntityByName,
    getLogin,
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
            checkEntityByIDQueryParams,
            async (req: Request, res: Response) => {
                const result = await getEntityByID(req.query.EID);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/entityByID",
    },
    {
        handler: [
            checkEntityByNameQueryParams,
            async (req: Request, res: Response) => {
                const result = await getEntityByName(req.query.user);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/entityByName",
    },
] as IRoute[];
