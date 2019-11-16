/** This is for querying an order by its OrderID, but including all the information in its invoice as well. */

import {order} from "../../../utils/dbTypes";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

export const generateGetOrderUInvoiceByOrderIDString: (OID: number) => string = (OID: number) => {
    return `select * from "RequestToPay"."Order" join "RequestToPay"."Invoice" on "Order"."InID" = "Invoice"."InID"
        where "OID" = ${OID};`;
};

export const getOrderUInvoiceByOrderID: (OID: number) => Promise<order> = async (OID: number) => {
    const res = await q(generateGetOrderUInvoiceByOrderIDString(OID));
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
