/* This file defines functions that are used by QueryController and subsequently in the IRoute handler method. */

import {invoices} from "../../../utils/dbTypes";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

type InvoiceByOrderIdGetter = (id: number) => Promise<invoices>;
type InvoiceSetter = (invoice: invoices) => void;

export const generateSetInvoiceString: (invoice: invoices) => string = (invoice: invoices) => {
    return `INSERT INTO invoices (InId, nextInId, DeliveryDate) VALUES (default, null,
        ${invoice.DeliveryDate})`;
};

export const generateGetInvoiceByInvoiceIdString: (InId: number) => string = (InId: number) => {
    return `select * from invoices where InId = '${InId}';`;
};

export const createInvoice: InvoiceSetter = async (invoice: invoices) => {
    const res = await q(generateSetInvoiceString(invoice));
};

export const getInvoiceByInvoiceId: InvoiceByOrderIdGetter = async (InId: number) => {
    const res = await q(generateGetInvoiceByInvoiceIdString(InId));
    if (res.rows.length === 0) {
        throw new HTTP404Error(
            `Found no invoices with this orderId: ${InId}.  Query result: ${res}`,
        );
    } else if (res.rows.length > 1) {
        throw new HTTP400Error(
            `Found multiple invoices with this orderId: ${InId}.  Query result: ${res}`,
        );
    }
    return res.rows[0];
};
