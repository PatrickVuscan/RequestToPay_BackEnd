import {order} from "../../../utils/dbTypes";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

export const generateSetOrderString: (order: order) => string = (ord: order) => {
    return `INSERT INTO "RequestToPay"."Order" ("OID", "InID", "SID", "CID", "DID", "OrderDate") VALUES
        (default, ${ord.OID}, ${ord.InID}, ${ord.SID}, ${ord.CID}, ${ord.DID}, '${ord.OrderDate.toISOString()}')
        RETURNING "OID"`;
};

export const createOrder: (ord: order, delDate: Date) => void = async (ord: order, delDate: Date) => {
    let res = null;
    try {
        res = await q(generateSetOrderString(ord));
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
