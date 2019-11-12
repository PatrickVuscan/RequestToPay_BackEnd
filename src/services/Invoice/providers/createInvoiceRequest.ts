import {invoices} from "../../../utils/dbTypes";
import q from "../../../utils/query";

type InvoiceSetter = (invoice: invoices) => void;

export const generateSetInvoiceString: (invoice: invoices) => string = (invoice: invoices) => {
    return `INSERT INTO requesttopay.invoice (InId, nextInId, DeliveryDate) VALUES (default, null,
        ${invoice.DeliveryDate})`;
};

export const createInvoice: InvoiceSetter = async (invoice: invoices) => {
    await q(generateSetInvoiceString(invoice));
    return;
};
