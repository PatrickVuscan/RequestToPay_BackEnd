import {entity} from "../../../utils/dbTypes";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

export const generateCreateEntityString: (entity: entity) => string = (ent: entity) => {
    return `INSERT INTO "RequestToPay"."Entity" ("EID", "Name", "Password", "BillingAddress") VALUES
        (default, '${ent.Name}', '${ent.Password}', '${ent.BillingAddress}') RETURNING "EID"`;
};

export const createEntity: (ent: entity) => void = async (ent: entity) => {
    let res = null;
    try {
        res = await q(generateCreateEntityString(ent));
    } catch (e) {
        throw new HTTP400Error("SQL Error");
    }
    if (!res) {
        throw new HTTP404Error("No response");
    } else if (res.rows.length !== 1) {
        throw new HTTP404Error("Couldn't create invoice");
    }
    return res.rows[0].EID;
};
