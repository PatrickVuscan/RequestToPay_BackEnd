/** This is for querying for all invoice items on an invoice. */

import {InvoiceItems} from "../../../utils/dbTypes";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

export const generateGetInvoiceItemsByInvoiceIDString: (InID: number) => string = (InID: number) => {
    return `select * from "RequestToPay"."InvoiceItems" where "InID" = ${InID}`;
};

export const getInvoiceItemsByInID: (InID: number) => Promise<InvoiceItems[]> = async (InID: number) => {
    const res = await q(generateGetInvoiceItemsByInvoiceIDString(InID));
    if (res.rows.length === 0) {
        throw new HTTP404Error(
            `Found no invoice items with this InvoiceID: ${InID}.  Query result: ${res}`,
        );
    }
    return res.rows;
};
