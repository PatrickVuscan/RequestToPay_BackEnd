import {Order} from "../../../utils/dbTypes";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

export const generateGetOrdersUInvoiceUEntityByEntityIDStringAndPersona: (EID: number, persona: string) => string =
    (EID: number, persona: string) => {
    return `select
        "O".*,
        "I"."DeliveryDate",
        "S"."Name" as "SellerName",
        "S"."BillingAddress" as "SellerBillingAddress",
        "C"."Name" as "CustomerName",
        "C"."BillingAddress" as "CustomerBillingAddress"
        from "RequestToPay"."Order" as "O"
        join "RequestToPay"."Invoice" as "I" on "O"."InID" = "I"."InID"
        join "RequestToPay"."Entity" as "S" on "O"."SID" = "S"."EID"
        join "RequestToPay"."Entity" as "C" on "O"."CID" = "C"."EID"
        where "O"."${persona}" = ${EID};`;
};

export const getOrdersUInvoiceUEntityByEntityIDAndPersona: (EID: number, persona: string) => Promise<Order[]> =
    async (EID: number, persona: string) => {
    const res = await q(generateGetOrdersUInvoiceUEntityByEntityIDStringAndPersona(EID, persona));
    if (res.rows.length === 0) {
        throw new HTTP404Error(
            `Found no invoices with this EntityID: ${EID} with persona: ${persona}.  Query result: ${res}`,
        );
    }
    return res.rows;
};
