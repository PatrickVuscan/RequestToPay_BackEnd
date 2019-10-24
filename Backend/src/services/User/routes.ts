/* Defines the routes and functions called in that route for the user service. */

import { Request, Response } from "express";
import {checkUserQueryParams, checkUserVerifyParams} from "../../middleware/checks";
import {IRoute} from "../index";
import {getUserByName, login} from "./providers/query";

export default [
    {
        handler: [
            () => {console.log("asdsdddsssss")},
            checkUserQueryParams,
            async ({ query }: Request, res: Response) => {
                const result = await getUserByName(query.u);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/users",
    },
    {
        handler: [
            checkUserVerifyParams,
            async (req: Request, res: Response) => {
                const result = await login(req.query.u, req.query.p);
                res.status(200).send(result);
                if (!req.session) {
                    throw new Error("No session registered to client");
                }
                req.session.privelage = result.privelage;
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/login",
    },
] as IRoute[];
