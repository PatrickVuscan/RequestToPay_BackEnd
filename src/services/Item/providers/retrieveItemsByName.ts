/* Retrieves all the items by a given name. */

import {Item} from "../../../utils/dbTypes";
import q from "../../../utils/query";

const generateGetString: (name: string) => string = (name: string) => {
    return `select
        "I".*,
        "S"."Name" as "SellerName"
        from "RequestToPay"."Item" as "I"
        join "RequestToPay"."Entity" as "S" on "I"."SID" = "S"."EID"
        where "I"."Name" = '${name}'`;
};

export const retrieveItemsByName: (name: string) => Promise<Item[]> = async (name: string) => {
    const res = await q(generateGetString(name));
    return res.rows;
};
