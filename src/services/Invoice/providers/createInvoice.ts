import {Invoice} from "../../../utils/dbTypes";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

const generateSetString: (invoice: Invoice) => string = (inv: Invoice) => {
    return `INSERT INTO "RequestToPay"."Invoice"
        ("InID", "NextInID", "DeliveryDate")
        VALUES (default, ${inv.NextInID}, '${inv.DeliveryDate.toISOString()}')
        RETURNING "InID"`;
};

export const createInvoice: (inv: Invoice) => Promise<number> = async (inv: Invoice) => {
    let res = null;
    try {
        res = await q(generateSetString(inv));
    } catch (e) {
        throw new HTTP400Error("SQL Error");
    }
    if (!res) {
        throw new HTTP404Error("No response");
    } else if (res.rows.length !== 1) {
        throw new HTTP404Error("Couldn't create invoice");
    }
    return res.rows[0].InID;
};
