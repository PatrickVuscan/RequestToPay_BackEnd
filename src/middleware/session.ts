/* TODO: Cookies
* Don't forget about the imports in middleware/index.ts
* Also a lint in routes.ts in the login handler that sets the session privelage
* */
// import pgSession, {} from "connect-pg-simple";
// import dotenv from "dotenv";
// import {Router} from "express";
// import session from "express-session";
// import {pool} from "../utils/query";
// dotenv.config();
//
// const storeOps: pgSession.PGStoreOptions = {
//     pool,
// };
// const store = new (pgSession(session))(storeOps);
//
// const sess: session.SessionOptions = {
//     cookie: {
//         maxAge: 30 * 24 * 60 * 60 * 1000,
//     },
//     resave: true,
//     rolling: true,
//     saveUninitialized: true,
//     secret: process.env.COOKIE_SECRET || "tmpSecret",
//     store,
// };
//
// export const handleSession = (router: Router) => {
//     router.use(session(sess));
// };
