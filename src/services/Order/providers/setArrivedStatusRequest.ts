/** This is for updating the Arrived Status of an order by its OrderID. */

import {Order} from "../../../utils/dbTypes";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

export const generateSetArrivedStatusString: (OID: number, status: boolean) => string = (OID: number, status: boolean) => {
    return `update "RequestToPay"."Order" set "DeliveredStatus" = ${status} where "OID" = ${OID} returning "Order";`;
};

export const setArrivedStatus: (OID: number, status: boolean) => Promise<Order> = async (OID: number, status: boolean) => {
    const res = await q(generateSetArrivedStatusString(OID, status));
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
