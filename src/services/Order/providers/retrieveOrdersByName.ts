import {Order} from "../../../utils/dbTypes";
import {HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

const generateGetString: (Name: string) => string = (Name: string) => {
    return `select "RequestToPay"."Order".*
        from "RequestToPay"."Order"
        join "RequestToPay"."Entity" on "Order"."CID" = "Entity"."EID" or "Order"."SID" = "Entity"."EID" or
            "Order"."DID" = "Entity"."EID"
        where "Entity"."Name" = '${Name}'`;
};

// No longer used - was primarily created for when we assumed unique Entity Names.
export const retrieveOrdersByName: (Name: string) => Promise<Order[]> = async (Name: string) => {
    const res = await q(generateGetString(Name));
    if (res.rows.length === 0) {
        throw new HTTP404Error(
            `Found no invoices with the Entity Name: ${Name}.  Query result: ${res}`,
        );
    }
    return res.rows;
};
