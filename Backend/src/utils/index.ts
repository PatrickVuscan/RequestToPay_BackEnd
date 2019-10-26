/* This is the file where all of the functions defined in utils that are used by other files are exposed.
* import {applyMiddleware} from './utils'; */

import { NextFunction, Request, Response, Router } from "express";

// This is the api that middleware functions must follow
type Wrapper = ((router: Router) => void);

// This applies all of the middleware functions to a given router
export const applyMiddleware = (
    middlewareWrappers: Wrapper[],
    router: Router,
) => {
    for (const wrapper of middlewareWrappers) {
        wrapper(router);
    }
};

// Defines how routes handle requests
type Handler = (
    req: Request,
    res: Response,
    next: NextFunction,
) => Promise<void> | void;

// interface that routes must follow
interface IRoute {
    method: string;
    path: string;
    handler: Handler | Handler[];
}

// applies all of the routes and sets up their handlers
export const applyRoutes = (routes: IRoute[], router: Router) => {
    for (const route of routes) {
        const { method, path, handler } = route;
        (router as any)[method](path, handler);
    }
};
