import {Item} from "../../../utils/dbTypes";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

export const generateCreateItemString: (item: Item) => string = (item: Item) => {
    return `INSERT INTO "RequestToPay"."Item" ("IID", "Name", "SID", "Price") VALUES
        (default, '${item.Name}', ${item.SID}, ${item.Price}) RETURNING "IID"`;
};

export const createItem: (item: Item) => Promise<number> = async (item: Item) => {
    let res = null;
    try {
        res = await q(generateCreateItemString(item));
    } catch (e) {
        throw new HTTP400Error("SQL Error");
    }
    if (!res) {
        throw new HTTP404Error("No response");
    } else if (res.rows.length !== 1) {
        throw new HTTP404Error("Couldn't create invoice");
    }
    return res.rows[0].IID;
};
