/* This is the file that is hosted. It applies the middleware, routes, and error handlers. */
import dotenv from "dotenv";
import express from "express";
import http from "http";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import routes from "./services";
import { applyMiddleware, applyRoutes } from "./utils";
import {logger} from "./utils/logger";

dotenv.config();

const router = express();
applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);

const PORT = process.env.PORT || 3000;
const server = http.createServer(router);

server.listen(PORT, () => {
    logger.info({
        file: "server.ts",
        message: `Server is running http://localhost:${PORT}...`,
    });
});
