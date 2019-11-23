import dotenv from "dotenv";
import {NextFunction, Request, Response, Router} from "express";
import * as jwt from "jsonwebtoken";

dotenv.config();

const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authtoken as string;
    let jwtPayload;
    try {
        jwtPayload = jwt.verify(token, process.env.SECRET as string) as any;
        res.locals.jwtPayload = jwtPayload;
    } catch (err) {
        // TODO: Should there be an HTTPError for this?
        // unauthorized respond with a 401
        res.status(401).send({msg: err.toString()});
        return;
    }

    // Since the token expires in an hour, send a new one
    const { username: name } = jwtPayload;
    const newToken = jwt.sign(
        {username: name},
        process.env.SECRET as string,
        {expiresIn: "1h"},
    );
    res.setHeader("AuthToken", newToken);

    // Everything is good and we can continue
    next();
};

export const handleAuthentication = (router: Router) =>
    router.use(/\/api\/v1\/(?!login).*/, verifyAuth);
