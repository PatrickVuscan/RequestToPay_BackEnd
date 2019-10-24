/* This is the file that handles the connections to the database. Here we handle the pool object which is an
 * application-wide singleton.
 * */

import dotenv from "dotenv";
import {Pool, PoolClient, QueryResult} from "pg";
import {logger} from "./logger";

dotenv.config();

export const pool: Pool = new Pool();

pool.on("error", (err: Error, client: PoolClient) => {
    logger.error(`err: ${err}, client: ${client}`);
});

pool.on("acquire", (client: PoolClient) => {
    logger.info({
        client,
        file: "query.ts",
        method: "acquired database client",
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
        res = await pool.query(q) as QueryResult;
    } catch (e) {
        logger.error({
            error: e,
            file: "query.ts",
        });
        process.exit(1);
    }
    return res;
};
