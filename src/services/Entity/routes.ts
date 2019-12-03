/* Defines the routes, and functions called in that route, for the Entity service. */

import { Request, Response } from "express";
import {IRoute} from "..";
import {Entity} from "../../utils/dbTypes";
import {logger} from "../../utils/logger";
import {sendSMS} from "../../utils/sms";
import {getEntityByRegex} from "./providers/retrieveEntity";
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
                sendSMS("7789906284", `You have logged in as ${req.query.user}`)
                    .catch((e: Error) => {
                        logger.error(e);
                    });
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
                    PhoneNumber: null,
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
                let result = null;
                if (req.query.EID) {
                    result = await getEntity(req.query.EID);
                } else if (req.query.regex) {
                    result = await getEntityByRegex(req.query.regex);
                }
                res.status(200).send(result);
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/entity",
    },
] as IRoute[];
