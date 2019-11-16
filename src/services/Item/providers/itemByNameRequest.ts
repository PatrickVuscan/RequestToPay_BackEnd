import {Item} from "../../../utils/dbTypes";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

export const generateGetItemsByEntityNameString: (name: string) => string = (name: string) => {
    return `select
        "I".*,
        "S"."Name" as "SellerName"
        from "RequestToPay"."Item" as "I"
        join "RequestToPay"."Entity" as "S" on "I"."SID" = "S"."EID"
        where "Item"."Name" = '${name}'`;
};

export const getItemsByName: (name: string) => Promise<Item[]> = async (name: string) => {
    const res = await q(generateGetItemsByEntityNameString(name));
    if (res.rows.length === 0) {
        throw new HTTP404Error(
            `Found no items by the name: ${name}.  Query result: ${res}`,
        );
    }
    return res.rows;
};
