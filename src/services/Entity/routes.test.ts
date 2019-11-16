/* This file is responsible for testing the routes used by this service. */
import express, { Router } from "express";
import request from "supertest";
import middleware from "../../middleware";
import errorHandlers from "../../middleware/errorHandlers";
import { applyMiddleware, applyRoutes } from "../../utils";
import routes from "./routes";
import {HTTP400Error, HTTP404Error} from "../../utils/httpErrors";

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

    // users -------------------------------------------------------------------------------------------
    // the test to be run with a description
    test("entity: test a valid API call", async () => {
        const response = await request(router).get("/api/v1/entityByName?user=one");
        expect(response.status).toEqual(200);
    });

    test("entity: test no users returned", async () => {
        const response = await request(router).get("/api/v1/entityByName?user=zero");
        expect(response.status).toEqual(404);
    });

    test("entity: invalid symbol in u parameter", async () => {
        const response = await request(router).get("/api/v1/entityByName?user=asd'dsa");
        expect(response.status).toEqual(400);
    });

    // loginRequest -------------------------------------------------------------------------------------------
    test("loginRequest: test a valid API call", async () => {
        const response = await request(router).get("/api/v1/login?user=one&pass=one");
        expect(response.status).toEqual(200);
    });

    test("loginRequest: test no users returned", async () => {
        const response = await request(router).get("/api/v1/login?user=zero&pass=zero");
        expect(response.status).toEqual(404);
    });

    test("loginRequest: invalid symbol in parameter", async () => {
        const response = await request(router).get("/api/v1/login?user=admin&pass=a]min");
        expect(response.status).toEqual(400);
    });
});
