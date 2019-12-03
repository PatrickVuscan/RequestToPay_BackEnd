/* This is a mocked implementation of entityByNameRequest.ts. It returns certain objects for certain queries. */

import {QueryResult} from "pg";
import {generateGetLoginString} from "../../services/Entity/providers/loginRequest";
import {Entity} from "../dbTypes";
import {loginNoUsers, loginOneUsers, singleUser, twoUsers, zeroUsers} from "./queryReturns";

export default async (q: string): Promise<QueryResult> => {
    if (generateGetLoginString("zero", "zero") === q) {
        return loginNoUsers;
    }  else if (generateGetLoginString("one", "one") === q) {
        return loginOneUsers;
    } else {
        throw new Error(`The mocked query function does not know the query you are asking for: ${q}.`);
    }
};
