/* This file defines functions that are used by QueryController and subsequently in the IRoute handler method. */

import {entity} from "../../../utils/dbTypes";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

type UserGetter = (name: string) => Promise<entity>;
export const generateGetUserString: (uname: string) => string = (uname: string) => {
    return `select * from requesttopay.entity where name = '${uname}';`;
};

export const getUserByName: UserGetter  = async (uname: string) => {
    const res = await q(generateGetUserString(uname));
    if (res.rows.length === 0) {
        throw new HTTP404Error(
            `Found no users with his username: ${uname}.  Query result: ${res}`,
        );
    } else if (res.rows.length > 1) {
        throw new HTTP400Error(
            `Found multiple users with his username: ${uname}.  Query result: ${res}`,
        );
    }
    return res.rows[0] as entity;
};
