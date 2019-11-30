import {Entity} from "../../../utils/dbTypes";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

export const generateInsertString: (entity: Entity) => string = (ent: Entity) => {
    return `INSERT INTO "RequestToPay"."Entity"
        ("EID", "Name", "Username", "Password", "BillingAddress")
        VALUES (default, '${ent.Name}', '${ent.Username}', '${ent.Password}', '${ent.BillingAddress}')
        RETURNING "EID"`;
};

export const createEntity: (ent: Entity) => void = async (ent: Entity) => {
    let res = null;
    try {
        res = await q(generateInsertString(ent));
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
