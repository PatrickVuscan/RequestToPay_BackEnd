/** This is for querying an order by its OrderID, but including all the information in its invoice and the entities that
 * are included as well. */

import {Order} from "../../../utils/dbTypes";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

export const generateGetOrderUInvoiceUEntityByOrderIDString: (OID: number) => string = (OID: number) => {
    return `select
        "O".*,
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

export const getOrderUInvoiceUEntityByOrderID: (OID: number) => Promise<Order> = async (OID: number) => {
    const res = await q(generateGetOrderUInvoiceUEntityByOrderIDString(OID));
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
