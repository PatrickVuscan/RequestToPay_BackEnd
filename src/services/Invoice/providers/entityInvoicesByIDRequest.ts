import {invoice} from "../../../utils/dbTypes";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

/*
export const generateGetInvoicesByEntityIDString: (EID: number) => string = (EID: number) => {
    return `select * from requesttopay.orders join requesttopay.invoice on orders.InID = invoice.InID where
        orders.SID = ${EID} or orders.CID = ${EID}`;
};
Note that this above one makes it so that the returned rows includes the information in the associated order. This is
not specifically desired right now, as we only want the invoice. Kept this for reference.
 */

export const generateGetInvoicesByEntityIDString: (EID: number) => string = (EID: number) => {
    return `select requesttopay.invoice.* from requesttopay.orders join requesttopay.invoice on orders.InID = invoice.InID where
        orders.SID = ${EID} or orders.CID = ${EID}`;
};

export const getInvoicesByEntityID: (EID: number) => Promise<invoice[]> = async (EID: number) => {
    const res = await q(generateGetInvoicesByEntityIDString(EID));
    if (res.rows.length === 0) {
        throw new HTTP404Error(
            `Found no invoices with this InvoiceID: ${EID}.  Query result: ${res}`,
        );
    }
    return res.rows;
};
