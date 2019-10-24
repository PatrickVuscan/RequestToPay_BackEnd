/* This file defines functions that are used by QueryController and subsequently in the IRoute handler method. */

import {users} from "../../../utils/dbTypes";
import {HTTP400Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

type UserGetter = (name: string) => Promise<users>;
type UserVerify = (name: string, password: string) => Promise<users>;

export const getUserByName: UserGetter  = async (name: string) => {
    // TODO: add check so that <name> is only ASCII characters adn add test for this
    const res = await q(`select * from users where uname = '${name}';`);
    if (res.rows.length !== 1) {
        throw new HTTP400Error(
            `Either found multiple or no users with his username: ${name}.  Query result: ${res}`
        );
    }
    return res.rows[0];
};

export const login: UserVerify = async (uname: string, pass: string) => {
    const res = await q(
        `select * from users where
            uname = '${uname}' and
            password = crypt('${pass}', password);`);
    if (res.rows.length !== 1) {
        throw new HTTP400Error("Could not find user with specified password");
    }
    return res.rows[0] as users;
};
