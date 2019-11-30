/** This is for querying for all invoice items on an invoice. */

import {InvoiceItems} from "../../../utils/dbTypes";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

const generateGetString: (InID: number) => string = (InID: number) => {
    return `select
        "II".*,
        "I"."Name" as "Name"
        from "RequestToPay"."InvoiceItems" as "II"
        join "RequestToPay"."Item" as "I" on "II"."IID" = "I"."IID"
        where "II"."InID" = ${InID}`;
};

export const retrieveInvoiceItems: (InID: number) => Promise<InvoiceItems[]> = async (InID: number) => {
    const res = await q(generateGetString(InID));
    if (res.rows.length === 0) {
        throw new HTTP404Error(
            `Found no invoice items with this InvoiceID: ${InID}.  Query result: ${res}`,
        );
    }
    return res.rows;
};
