/* Services interact with external APIs adn are used to provide a standard API that does not throw unexpected errors to
 * our code.
 */

import {NextFunction, Request, Response} from "express";
import invoiceRoutes from "./Invoice/routes";
import userRoutes from "./User/routes";

/* This is the interface that each route must implement */
export interface IRoute {
    handler: Array<(req: Request, res: Response, next: NextFunction) => void>;
    method: "get" | "post" | "put" | "delete";
    path: string;
}

// [...A, ...B] concatenates arrays A and B
export default [
    ...userRoutes,
    ...invoiceRoutes,
] as [IRoute];
