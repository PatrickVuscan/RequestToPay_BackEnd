import {invoices} from "../../../utils/dbTypes";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

export const generateGetInvoiceByInvoiceIdString: (InId: number) => string = (InId: number) => {
    return `select * from requesttopay.invoice where InId = '${InId}';`;
};

export const getInvoiceByInvoiceId: (InId: number) => Promise<invoices> = async (InId: number) => {
    const res = await q(generateGetInvoiceByInvoiceIdString(InId));
    if (res.rows.length === 0) {
        throw new HTTP404Error(
            `Found no invoices with this InvoiceId: ${InId}.  Query result: ${res}`,
        );
    } else if (res.rows.length > 1) {
        throw new HTTP400Error(
            `Found multiple invoices with this InvoiceId: ${InId}.  Query result: ${res}`,
        );
    }
    return res.rows[0];
};
