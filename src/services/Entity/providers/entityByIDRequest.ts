/* This file defines functions that are used by QueryController and subsequently in the IRoute handler method. */

import {Entity} from "../../../utils/dbTypes";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

export const generateGetEntityByIDString: (EID: number) => string = (EID: number) => {
    return `select * from "RequestToPay"."Entity" where "EID" = '${EID}';`;
};

export const getEntityByEntityID: (EID: number) => Promise<Entity> = async (EID: number) => {
    const res = await q(generateGetEntityByIDString(EID));
    if (res.rows.length === 0) {
        throw new HTTP404Error(
            `Found no users with his username: ${EID}.  Query result: ${res}`,
        );
    } else if (res.rows.length > 1) {
        throw new HTTP400Error(
            `Found multiple users with his username: ${EID}.  Query result: ${res}`,
        );
    }
    return res.rows[0] as Entity;
};
