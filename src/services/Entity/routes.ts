/* Defines the routes, and functions called in that route, for the Entity service. */

import { Request, Response } from "express";
import {IRoute} from "..";
import {Entity} from "../../utils/dbTypes";
import {HTTP404Error} from "../../utils/httpErrors";
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
                // check and set the phone number
                if (!req.query.PhoneNumber) {
                    req.query.PhoneNumber = "null";
                } else if (req.query.PhoneNumber.length !== 10) {
                    throw new HTTP404Error("Phone number must be exactly 10 digits long or not set");
                }
                const ent: Entity = {
                    EID: -1,
                    Name: req.query.Name,
                    BillingAddress: req.query.BillingAddress,
                    Username: req.query.Username,
                    Password: req.query.Password,
                    PhoneNumber: req.query.PhoneNumber,
                };
                const result = await setEntity(ent);
                res.status(200).send(result);
                if (req.query.PhoneNumber) {
                    logger.info({
                        file: "src/services/Order/route.ts",
                        message: await sendSMS(
                            req.query.PhoneNumber,
                            `You have successfully registered for <APPNAME> with the username ${req.query.Username}! ` +
                            `Welcome to the revolutionary data-rich and secure request to pay application and thank ` +
                            `you for doing your business through Scotia Bank!`),
                    });
                }
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
    {
        handler: [
            checkEntitySetParams,
            async (req: Request, res: Response) => {
                // check and set the phone number
                const ent: Entity = {
                    EID: -1,
                    Name: req.query.Name,
                    BillingAddress: req.query.BillingAddress,
                    Username: req.query.Username,
                    Password: req.query.Password,
                    PhoneNumber: req.query.PhoneNumber,
                };
                const result = await setEntity(ent);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "put",
        path: "/api/v1/demoEntity",
    },
] as IRoute[];
