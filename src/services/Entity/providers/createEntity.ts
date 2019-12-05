import {Entity} from "../../../utils/dbTypes";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

const generateSetString: (entity: Entity) => string = (ent: Entity) => {
    return `INSERT INTO "RequestToPay"."Entity"
        ("EID", "Name", "Username", "Password", "BillingAddress", "PhoneNumber")
        VALUES (default, '${ent.Name}', '${ent.Username}', '${ent.Password}', '${ent.BillingAddress}', '${ent.PhoneNumber}')
        RETURNING "EID"`;
};

export const createEntity: (ent: Entity) => void = async (ent: Entity) => {
    let res = null;
    try {
        res = await q(generateSetString(ent));
    } catch (e) {
        throw new HTTP400Error("SQL Error");
    }
    if (!res) {
        throw new HTTP404Error("No response");
    } else if (res.rows.length !== 1) {
        throw new HTTP404Error("Couldn't create entity");
    }
    return res.rows[0].EID;
};
