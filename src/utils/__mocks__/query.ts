/* This is a mocked implementation of entityByNameRequest.ts. It returns certain objects for certain queries. */

import {QueryResult} from "pg";
import {generateGetEntityByNameString} from "../../services/Entity/providers/entityByNameRequest";
import {generateLoginString} from "../../services/Entity/providers/loginRequest";
import {loginNoUsers, loginOneUsers, singleUser, twoUsers, zeroUsers} from "./queryReturns";

export default async (q: string): Promise<QueryResult> => {
    if (q === generateGetEntityByNameString("zero")) {
        return zeroUsers;
    } else if (q === generateGetEntityByNameString("one")) {
        return singleUser;
    } else if (q === generateGetEntityByNameString("two")) {
        return twoUsers;
    } else if (generateLoginString("zero", "zero") === q) {
        return loginNoUsers;
    }  else if (generateLoginString("one", "one") === q) {
        return loginOneUsers;
    } else {
        throw new Error(`The mocked query function does not know the query you are asking for: ${q}.`);
    }
};
