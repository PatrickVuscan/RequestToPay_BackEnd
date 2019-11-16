import {Item} from "../../../utils/dbTypes";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

export const generateGetItemByItemIDString: (IID: number) => string = (IID: number) => {
    return `select * from "RequestToPay"."Item" where "IID" = ${IID};`;
};

export const getItemByItemID: (IID: number) => Promise<Item> = async (IID: number) => {
    const res = await q(generateGetItemByItemIDString(IID));
    if (res.rows.length === 0) {
        throw new HTTP404Error(
            `Found no invoices with this ItemID: ${IID}.  Query result: ${res}`,
        );
    } else if (res.rows.length > 1) {
        throw new HTTP400Error(
            `Found multiple invoices with this ItemID: ${IID}.  Query result: ${res}`,
        );
    }
    return res.rows[0];
};
