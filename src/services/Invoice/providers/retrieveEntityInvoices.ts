import {Invoice} from "../../../utils/dbTypes";
import {HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

const generateGetString: (EID: number) => string = (EID: number) => {
    return `select "RequestToPay"."Invoice".*
        from "RequestToPay"."Order"
        join "RequestToPay"."Invoice" on "Order"."InID" = "Invoice"."InID"
        where "Order"."SID" = ${EID} or "Order"."CID" = ${EID}`;
};

export const retrieveEntityInvoices: (EID: number) => Promise<Invoice[]> = async (EID: number) => {
    const res = await q(generateGetString(EID));
    if (res.rows.length === 0) {
        throw new HTTP404Error(
            `Found no invoices with this InvoiceID: ${EID}.  Query result: ${res}`,
        );
    }
    return res.rows;
};
