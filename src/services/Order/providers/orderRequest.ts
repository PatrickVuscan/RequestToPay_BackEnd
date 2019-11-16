/** This is for querying an order by its OrderID. */

import {order} from "../../../utils/dbTypes";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

export const generateGetOrderByOrderIDString: (OID: number) => string = (OID: number) => {
    return `select * from "RequestToPay"."Order" where "OID" = ${OID};`;
};

export const getOrderByOrderID: (OID: number) => Promise<order> = async (OID: number) => {
    const res = await q(generateGetOrderByOrderIDString(OID));
    if (res.rows.length === 0) {
        throw new HTTP404Error(
            `Found no orders with this OrderID: ${OID}.  Query result: ${res}`,
        );
    } else if (res.rows.length > 1) {
        throw new HTTP400Error(
            `Found multiple orders with this OrderID: ${OID}.  Query result: ${res}`,
        );
    }
    return res.rows[0];
};
