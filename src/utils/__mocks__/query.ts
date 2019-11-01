/* This is a mocked implementation of userRequest.ts. It returns certain objects for certain queries. */

import {QueryResult} from "pg";
import {generateGetUserString} from "../../services/User/providers/userRequest";
import {loginNoUsers, loginOneUsers, singleUser, twoUsers, zeroUsers} from "./queryReturns";
import {generateLoginString} from "../../services/User/providers/loginRequest";

export default async (q: string): Promise<QueryResult> => {
    if (q === generateGetUserString("zero")) {
        return zeroUsers;
    } else if (q === generateGetUserString("one")) {
        return singleUser;
    } else if (q === generateGetUserString("two")) {
        return twoUsers;
    } else if (generateLoginString("zero", "zero") === q) {
        return loginNoUsers;
    }  else if (generateLoginString("one", "one") === q) {
        return loginOneUsers;
    } else {
        throw new Error(`The mocked query function does not know the query you are asking for: ${q}.`);
    }
};
