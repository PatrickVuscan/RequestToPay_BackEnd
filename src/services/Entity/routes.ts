/* Defines the routes and functions called in that route for the user service. */

import { Request, Response } from "express";
import {IRoute} from "..";
import {Entity} from "../../utils/dbTypes";
import {
    checkEntityByIDQueryParams,
    checkEntityByNameQueryParams,
    checkEntitySetQueryParams,
    checkLoginParams,
    getEntityByID,
    getEntityByName,
    getLogin, setEntity,
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
            checkEntitySetQueryParams,
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
