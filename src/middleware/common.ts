/* This file is just some common middleware that we use. */
import parser from "body-parser";
import compression from "compression";
import cors from "cors";
import { Router } from "express";

export const handleCors = (router: Router) => {
    router.use(cors({ credentials: true, origin: true }));
    router.options("*/api-docs/*", cors());
};

export const handleBodyRequestParsing = (router: Router) => {
    router.use(parser.urlencoded({ extended: true }));
    router.use(parser.json());
};

export const handleCompression = (router: Router) => {
    router.use(compression());
};
