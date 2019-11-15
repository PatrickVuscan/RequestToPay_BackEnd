import {invoice} from "../../../utils/dbTypes";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

export const generateGetInvoicesByEntityNameString: (Name: string) => string = (Name: string) => {
    return `select requesttopay.invoice.* from requesttopay.orders join requesttopay.invoice on orders.InID =
        invoice.InID join requesttopay.entity on orders.cid = entity.eid or orders.sid = entity.eid where
        entity.name = '${Name}'`;
};

export const getInvoicesByEntityName: (Name: string) => Promise<invoice[]> = async (Name: string) => {
    const res = await q(generateGetInvoicesByEntityNameString(Name));
    if (res.rows.length === 0) {
        throw new HTTP404Error(
            `Found no invoices with the Entity Name: ${Name}.  Query result: ${res}`,
        );
    }
    return res.rows;
};
