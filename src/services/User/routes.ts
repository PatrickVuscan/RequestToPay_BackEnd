/* Defines the routes and functions called in that route for the user service. */

import { Request, Response } from "express";
import {IRoute} from "..";
import {checkUserQueryParams} from "./QueryController";
import {checkLoginParams, getLogin, getUser} from "./QueryController";

export default [
    {
        handler: [
            checkUserQueryParams,
            async ({ query }: Request, res: Response) => {
                const result = await getUser(query.user);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/users",
    },
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
] as IRoute[];
