/* This file defines functions that are used by QueryController and subsequently in the IRoute handler method. */

import {invoices} from "../../../utils/dbTypes";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

type InvoiceByOrderIdGetter = (id: string) => Promise<invoices>;
type InvoicesByBusinessIdGetter = (id: string) => Promise<invoices[]>;
type InvoiceSetter = (invoice: object) => Promise<invoices>;

export const generateSetInvoiceString: (invoice: object) => string = (invoice: object) => {
    return `INSERT INTO invoices (bId, sId, oDate, dDate, items) VALUES ()`;
};

export const generateGetInvoiceByOrderIdString: (oId: string) => string = (oId: string) => {
    return `select * from invoices where orderId = '${oId}';`;
};

export const generateGetInvoiceByBusinessIdString: (bId: string) => string = (bId: string) => {
    return `select * from invoices where buyerId = '${bId}' OR sellerId = '${bId}';`;
};

export const createInvoice: InvoiceByOrderIdGetter = async (oId: string) => {
    const res = await q(generateGetInvoiceByOrderIdString(oId));
    if (res.rows.length === 0) {
        throw new HTTP404Error(
            `Found no invoices with this orderId: ${oId}.  Query result: ${res}`,
        );
    } else if (res.rows.length > 1) {
        throw new HTTP400Error(
            `Found multiple invoices with this orderId: ${oId}.  Query result: ${res}`,
        );
    }
    return res.rows[0];
};

export const getInvoiceByOrderId: InvoiceByOrderIdGetter = async (oId: string) => {
    const res = await q(generateGetInvoiceByOrderIdString(oId));
    if (res.rows.length === 0) {
        throw new HTTP404Error(
            `Found no invoices with this orderId: ${oId}.  Query result: ${res}`,
        );
    } else if (res.rows.length > 1) {
        throw new HTTP400Error(
            `Found multiple invoices with this orderId: ${oId}.  Query result: ${res}`,
        );
    }
    return res.rows[0];
};

export const getInvoiceByBusinessId: InvoicesByBusinessIdGetter = async (bId: string) => {
    const res = await q(generateGetInvoiceByBusinessIdString(bId));
    if (res.rows.length === 0) {
        throw new HTTP404Error(
            `Found no invoices with this businessId: ${bId}.  Query result: ${res}`,
        );
    }
    return res.rows;
};
