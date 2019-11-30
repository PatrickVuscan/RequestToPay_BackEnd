/** This is for updating the status of an order. */

import {Order} from "../../../utils/dbTypes";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

const generateUpdateString: (OID: number, status: string, state: boolean) => string =
    (OID: number, status: string, state: boolean) => {
    return `update "RequestToPay"."Order" set "${status}" = ${state} where "OID" = ${OID} returning "Order";`;
};

export const updateStatus: (OID: number, status: string, state: boolean) => Promise<Order> =
    async (OID: number, status: string, state: boolean) => {
    const res = await q(generateUpdateString(OID, status, state));
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
