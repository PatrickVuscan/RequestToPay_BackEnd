/* This file is responsible for testing the routes used by this service */
import express, { Router } from "express";
import request from "supertest";
import middleware from "../../middleware";
import errorHandlers from "../../middleware/errorHandlers";
import { applyMiddleware, applyRoutes } from "../../utils";
import routes from "./routes";

// we will be mocking this object by providing fake data
jest.mock("../../utils/loginRequest.ts");

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
    test("users: test a valid API call", async () => {
        const response = await request(router).get("/api/v1/users?u=one");
        expect(response.status).toEqual(200);
    });

    test("users: test no users returned", async () => {
        const response = await request(router).get("/api/v1/users?u=zero");
        expect(response.status).toEqual(404);
    });

    test("users: invalid symbol in u parameter", async () => {
        const response = await request(router).get("/api/v1/users?u=asd(-)dsa");
        expect(response.status).toEqual(400);
    });

    // login -------------------------------------------------------------------------------------------
    test("login: test a valid API call", async () => {
        const response = await request(router).get("/api/v1/login?u=one&p=one");
        expect(response.status).toEqual(200);
    });

    test("login: test no users returned", async () => {
        const response = await request(router).get("/api/v1/login?u=zero&p=zero");
        expect(response.status).toEqual(404);
    });

    test("login: invalid symbol in parameter", async () => {
        const response = await request(router).get("/api/v1/login?u=admin&p=a]min");
        expect(response.status).toEqual(400);
    });
});
