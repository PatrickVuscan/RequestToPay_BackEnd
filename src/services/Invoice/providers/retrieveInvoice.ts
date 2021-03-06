import {Invoice} from "../../../utils/dbTypes";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

const generateGetString: (InID: number) => string = (InID: number) => {
    return `select * from "RequestToPay"."Invoice" where "InID" = ${InID};`;
};

export const retrieveInvoice: (InID: number) => Promise<Invoice> = async (InID: number) => {
    const res = await q(generateGetString(InID));
    if (res.rows.length === 0) {
        throw new HTTP404Error(
            `Found no invoices with this InvoiceID: ${InID}.  Query result: ${res}`,
        );
    } else if (res.rows.length > 1) {
        throw new HTTP400Error(
            `Found multiple invoices with this InvoiceID: ${InID}.  Query result: ${res}`,
        );
    }
    return res.rows[0];
};
