/* Services interact with external APIs adn are used to provide a standard API that does not throw unexpected errors to
 * our code.
 */

import {Request, Response} from "express";
import userRoutes from "./User/routes";

/* This is the interface that each route must implement */
export interface IRoute {
    handler: Array<(req: Request, res: Response) => void>;
    method: "get" | "post" | "put" | "delete";
    path: string;
}

// [...A, ...B] concatenates arrays A and B
export default [...userRoutes] as [IRoute];
