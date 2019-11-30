/** This is for querying an order by its OrderID. */

import {Order} from "../../../utils/dbTypes";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

const generateOrderGetString: (OID: number) => string = (OID: number) => {
    return `select * from "RequestToPay"."Order" where "OID" = ${OID};`;
};

/* This is for querying an order by its OrderID, as above, but including all the information in its invoice and the
 * entities that are included as well. */
const generateFullOrderGetString: (OID: number) => string = (OID: number) => {
    return `select
        "O".*,
        "I"."DeliveryDate",
        "S"."Name" as "SellerName",
        "S"."BillingAddress" as "SellerBillingAddress",
        "C"."Name" as "CustomerName",
        "C"."BillingAddress" as "CustomerBillingAddress"
        from "RequestToPay"."Order" as "O"
        join "RequestToPay"."Invoice" as "I" on "O"."InID" = "I"."InID"
        join "RequestToPay"."Entity" as "S" on "O"."SID" = "S"."EID"
        join "RequestToPay"."Entity" as "C" on "O"."CID" = "C"."EID"
        where "OID" = ${OID};`;
};

export const retrieveOrder: (OID: number, fullOrder: boolean) => Promise<Order> =
    async (OID: number, fullOrder: boolean) => {
    const res = await q(fullOrder ? generateFullOrderGetString(OID) : generateOrderGetString(OID));
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
