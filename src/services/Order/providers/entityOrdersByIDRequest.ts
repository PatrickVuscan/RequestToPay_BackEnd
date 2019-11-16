import {Order} from "../../../utils/dbTypes";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

export const generateGetOrdersByEntityIDString: (EID: number) => string = (EID: number) => {
    return `select * from "RequestToPay"."Order" where "Order"."SID" = ${EID} or "Order"."CID" = ${EID}`;
};

export const getOrdersByEntityID: (EID: number) => Promise<Order[]> = async (EID: number) => {
    const res = await q(generateGetOrdersByEntityIDString(EID));
    if (res.rows.length === 0) {
        throw new HTTP404Error(
            `Found no invoices with this InvoiceID: ${EID}.  Query result: ${res}`,
        );
    }
    return res.rows;
};
