/* This file defines functions that are used by QueryController and subsequently in the IRoute handler method. */

import {users} from "../../../utils/dbTypes";
import {HTTP400Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

type UserGetter = (name: string) => Promise<users>;
type UserVerify = (name: string, password: string) => Promise<users>;

export const generateLoginString: (uname: string, pass: string) => string = (uname: string, pass: string) => {
    return `select * from users where
            uname = '${uname}' and
            password = crypt('${pass}', password);`;
};

export const generateGetUserString: (user: string) => string = (uname: string) => {
    return `select * from users where uname = '${uname}';`;
};

export const getUserByName: UserGetter  = async (uname: string) => {
    const res = await q(generateGetUserString(uname));
    if (res.rows.length === 0) {
        throw new HTTP400Error(
            `Found no users with his username: ${uname}.  Query result: ${res}`,
        );
    } else if (res.rows.length > 1) {
        throw new HTTP400Error(
            `Found multiple users with his username: ${uname}.  Query result: ${res}`,
        );
    }
    return res.rows[0];
};

export const login: UserVerify = async (uname: string, pass: string) => {
    const res = await q(generateLoginString(uname, pass));
    if (res.rows.length !== 1) {
        throw new HTTP400Error(`Could not find user(${uname}) with specified password(${pass})`);
    }
    return res.rows[0] as users;
};
