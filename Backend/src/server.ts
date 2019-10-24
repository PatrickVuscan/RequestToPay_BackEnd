import http from "http";
import express from "express";
import { applyMiddleware, applyRoutes } from "./utils";
import middleware from "./middleware";
import routes from "./services";
import errorHandlers from "./middleware/errorHandlers";
import {logger} from "./utils/logger";

const router = express();
applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);

const { PORT = 3000 } = process.env;
const server = http.createServer(router);

server.listen(PORT, () => {
    logger.info(`Server is running http://localhost:${PORT}...`);
});
