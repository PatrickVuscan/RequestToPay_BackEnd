import {invoice} from "../../../utils/dbTypes";
import q from "../../../utils/query";

export const generateSetInvoiceString: (invoice: invoice) => string = (inv: invoice) => {
    return `INSERT INTO requesttopay.invoice (InID, nextInID, DeliveryDate) VALUES (default, null,
        '${inv.deliverydate}') RETURNING InID`;
};

export const createInvoice: (inv: invoice) => void = async (inv: invoice) => {
    const res = await q(generateSetInvoiceString(inv));
    return res.rows[0].inid;
};
