import {invoices} from "../../../utils/dbTypes";
import q from "../../../utils/query";

export const generateSetInvoiceString: (invoice: invoices) => string = (invoice: invoices) => {
    return `INSERT INTO requesttopay.invoice (InId, nextInId, DeliveryDate) VALUES (default, null,
        '${invoice.DeliveryDate}')`;
};

export const createInvoice: (invoice: invoices) => void = async (invoice: invoices) => {
    await q(generateSetInvoiceString(invoice));
    return;
};
