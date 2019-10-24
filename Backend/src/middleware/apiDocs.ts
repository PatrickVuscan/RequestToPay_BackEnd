/* This file is the middleware for showing the API documentation hosted using Swagger on '/'. */
import {Router} from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../config/swagger.json";

export const handleAPIDocs = (router: Router) =>
    router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
