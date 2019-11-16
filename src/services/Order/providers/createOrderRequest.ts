import {Order} from "../../../utils/dbTypes";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

export const generateCreateOrderString: (order: Order) => string = (ord: Order) => {
    return `INSERT INTO "RequestToPay"."Order" ("OID", "InID", "SID", "CID", "DID", "OrderDate") VALUES
        (default, ${ord.InID}, ${ord.SID}, ${ord.CID}, ${ord.DID}, '${ord.OrderDate.toISOString()}')
        RETURNING "OID"`;
};

export const createOrder: (ord: Order, delDate: Date) => Promise<number> = async (ord: Order, delDate: Date) => {
    let res = null;
    try {
        res = await q(generateCreateOrderString(ord));
    } catch (e) {
        throw new HTTP400Error("SQL Error");
    }
    if (!res) {
        throw new HTTP404Error("No response");
    } else if (res.rows.length !== 1) {
        throw new HTTP404Error("Couldn't create Order");
    }
    return res.rows[0].OID;
};
