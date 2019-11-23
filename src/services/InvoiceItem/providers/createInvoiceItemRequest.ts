import {Invoice, InvoiceItems} from "../../../utils/dbTypes";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

export const generateCreateInvoiceItemsString: (items: InvoiceItems) => string = (items: InvoiceItems) => {
    return `INSERT INTO "RequestToPay"."InvoiceItems" (InID, IID, Price, Quantity) VALUES
    (${items.InID}, ${items.IID}, ${items.Price}, ${items.Quantity}) RETURNING "InvoiceItems"`;
};

export const createInvoiceItems: (items: InvoiceItems) => void = async (items: InvoiceItems) => {
    let res = null;
    try {
        res = await q(generateCreateInvoiceItemsString(items));
    } catch (e) {
        throw new HTTP400Error("SQL Error.");
    }
    if (!res) {
        throw new HTTP404Error("No response.");
    } else if (res.rows.length !== 1) {
        throw new HTTP404Error("Couldn't create InvoiceItems.");
    }
    return res.rows[0];
};
