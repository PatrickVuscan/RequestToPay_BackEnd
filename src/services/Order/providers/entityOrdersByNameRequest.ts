import {Order} from "../../../utils/dbTypes";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

export const generateGetOrdersByEntityNameString: (Name: string) => string = (Name: string) => {
    return `select "RequestToPay"."Order".* from "RequestToPay"."Order" join "RequestToPay"."Entity" on
        "Order"."CID" = "Entity"."EID" or "Order"."SID" = "Entity"."EID" where "Entity"."Name" = '${Name}'`;
};

export const getOrdersByEntityName: (Name: string) => Promise<Order[]> = async (Name: string) => {
    const res = await q(generateGetOrdersByEntityNameString(Name));
    if (res.rows.length === 0) {
        throw new HTTP404Error(
            `Found no invoices with the Entity Name: ${Name}.  Query result: ${res}`,
        );
    }
    return res.rows;
};
