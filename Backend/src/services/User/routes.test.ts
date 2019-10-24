/* This file is responsible for testing the routes used by this service */
import express, { Router } from "express";
import request from "supertest";
import middleware from "../../middleware";
import errorHandlers from "../../middleware/errorHandlers";
import { applyMiddleware, applyRoutes } from "../../utils";
import * as Provider from "./providers/query";
import routes from "./routes";

// we will be mocking this object by providing fake data
jest.mock("../../utils/query.ts");

describe("routes", () => {
    let router: Router;

    // before each route is tested, set up a basic express server
    beforeEach(() => {
        router = express();
        applyMiddleware(middleware, router);
        applyRoutes(routes, router);
        applyMiddleware(errorHandlers, router);
    });

    // the test to be run with a description
    test("users: test a valid API call", async () => {
        const response = await request(router).get("/api/v1/users?u=one");
        expect(response.status).toEqual(200);
    });

    test("users: an empty string", async () => {
        const response = await request(router).get("/api/v1/users?u=");
        expect(response.status).toEqual(400);
    });

    test("users: invalid symbol in u parameter", async () => {
        const response = await request(router).get("/api/v1/users?u=asd(-)dsa");
        expect(response.status).toEqual(400);
    });
});
