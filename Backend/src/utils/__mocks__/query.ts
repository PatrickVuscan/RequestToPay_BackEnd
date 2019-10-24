/* This is a mocked implementation of query.ts. It returns certain objects for certain queries. */

import {QueryResult} from "pg";
import {singleUser, twoUsers, zeroUsers} from "./queryReturns";

export default async (q: string): Promise<QueryResult> => {
    if (q === "select * from users where uname = 'zero';") {
        return zeroUsers;
    } else if (q === "select * from users where uname = 'one';") {
        return singleUser;
    } else if (q === "select * from users where uname = 'two';") {
        return twoUsers;
    } else {
        throw new Error(`The mocked query function does not know the query you are asking for: ${q}.`);
    }
};
