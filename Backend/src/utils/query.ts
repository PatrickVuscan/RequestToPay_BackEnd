/* This is the file that handles the connections to the database. Here we handle the pool object which is an
 * application-wide singleton.
 * */

import dotenv from "dotenv";
import {Pool, PoolClient, QueryResult} from "pg";
import {logger} from "./logger";

dotenv.config();

export const pool: Pool = new Pool();

pool.on("error", (err: Error) => {
    logger.error({
        error: err,
        file: "utils/query.ts",
        method: "pool.on('error')",
    });
});

pool.on("acquire", () => {
    logger.info({
        file: "query.ts",
        method: "pool.on('acquire')",
    });
});

export default async (q: string): Promise<QueryResult> => {
    let res: QueryResult = {
        command: "",
        fields: [],
        oid: 0,
        rowCount: 0,
        rows: [],
    };
    try {
        // try to set res to the response from the db
        res = await pool.query(q) as QueryResult;
    } catch (e) {
        // log the error. We'll return the empty res
        logger.error({
            error: e,
            file: "query.ts",
        });
    }
    return res;
};
