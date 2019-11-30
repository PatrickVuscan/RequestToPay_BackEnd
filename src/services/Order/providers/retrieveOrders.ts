import {Order} from "../../../utils/dbTypes";
import {HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

const generateOrdersGetString: (EID: number) => string = (EID: number) => {
    return `select * from "RequestToPay"."Order"
        where "Order"."SID" = ${EID} or "Order"."CID" = ${EID} or "Order"."DID" = ${EID}`;
};

/* This is for querying for orders by an entity's ID, as above, but including all the information in its invoice and the
 * entities that are included as well. */
const generateFullOrdersGetString: (EID: number) => string = (EID: number) => {
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
        where "O"."SID" = ${EID} or "O"."CID" = ${EID} or "O"."DID" = ${EID};`;
};

export const retrieveOrders: (EID: number, fullOrder: boolean) => Promise<Order[]> =
    async (EID: number, fullOrder: boolean) => {
    const res = await q(fullOrder ? generateFullOrdersGetString(EID) : generateOrdersGetString(EID));
    if (res.rows.length === 0) {
        throw new HTTP404Error(
            `Found no orders with this EntityID: ${EID}.  Query result: ${res}`,
        );
    }
    return res.rows;
};
