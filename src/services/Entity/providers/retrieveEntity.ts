/* This file defines functions that are used by QueryController and subsequently in the IRoute handler method. */

import {Entity} from "../../../utils/dbTypes";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

const generateGetString: (EID: number) => string = (EID: number) => {
    return `select * from "RequestToPay"."Entity" where "EID" = '${EID}';`;
};

const generateGetRegexString = (regex: string) => {
    return `select * from "RequestToPay"."Entity" where "Name" similar to '${regex}';`;
};

export const retrieveEntity: (EID: number) => Promise<Entity> = async (EID: number) => {
    const res = await q(generateGetString(EID));
    if (res.rows.length === 0) {
        throw new HTTP404Error(
            `Found no entities with his username: ${EID}.  Query result: ${res}`,
        );
    } else if (res.rows.length > 1) {
        throw new HTTP400Error(
            `Found multiple entities with his username: ${EID}.  Query result: ${res}`,
        );
    }
    return res.rows[0] as Entity;
};

export const getEntityByRegex = async (regex: string) => {
    const res = await q(generateGetRegexString(regex));
    return res.rows as Entity[];
};
