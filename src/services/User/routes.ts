/* Defines the routes and functions called in that route for the user service. */

import { Request, Response } from "express";
import {IRoute} from "..";
import {checkLoginParams, checkUserQueryParams} from "../../middleware/checks";
import {getLogin, getUser} from "./QueryController";

export default [
    {
        handler: [
            checkUserQueryParams,
            async ({ query }: Request, res: Response) => {
                const result = await getUser(query.u);
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
                // if (!req.session) {
                //     res.status(400);
                //     throw new Error("No session registered to client");
                // }
                const result = await getLogin(req.query.u, req.query.p);
                res.status(200).send(result);
                // req.session.privelage = result.privelage;
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/loginRequest",
    },
] as IRoute[];
