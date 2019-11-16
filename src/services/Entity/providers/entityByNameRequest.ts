/* This file defines functions that are used by QueryController and subsequently in the IRoute handler method. */

import {Entity} from "../../../utils/dbTypes";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

export const generateGetEntityByNameString: (uname: string) => string = (uname: string) => {
    return `select * from "RequestToPay"."Entity" where "Username" = '${uname}';`;
};

export const getEntityByEntityName: (name: string) => Promise<Entity> = async (uname: string) => {
    const res = await q(generateGetEntityByNameString(uname));
    if (res.rows.length === 0) {
        throw new HTTP404Error(
            `Found no users with his username: ${uname}.  Query result: ${res}`,
        );
    } else if (res.rows.length > 1) {
        throw new HTTP400Error(
            `Found multiple users with his username: ${uname}.  Query result: ${res}`,
        );
    }
    return res.rows[0] as Entity;
};
