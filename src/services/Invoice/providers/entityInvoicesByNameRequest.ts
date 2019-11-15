import {invoice} from "../../../utils/dbTypes";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

export const generateGetInvoicesByEntityNameString: (Name: string) => string = (Name: string) => {
    return `select "RequestToPay"."Invoice".* from "RequestToPay"."Order" join "RequestToPay"."Invoice" on
        "Order"."InID" = "Invoice"."InID" join "RequestToPay"."Entity" on "Order"."CID" = "Entity"."EID" or
        "Order"."SID" = "Entity"."EID" where "Entity"."Name" = '${Name}'`;
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
