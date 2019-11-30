import {Entity} from "../../../utils/dbTypes";
import {HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

const generateGetString: (uname: string, pass: string) => string = (uname: string, pass: string) => {
    return `select *
        from "RequestToPay"."Entity"
        where "Username" = '${uname}' and "Password" = '${pass}'`;
};

export const loginRequest: (name: string, password: string) => Promise<Entity> =
    async (uname: string, pass: string) => {
    const res = await q(generateGetString(uname, pass));
    if (res.rows.length !== 1) {
        throw new HTTP404Error(`Could not find entity(${uname}) with specified password(${pass})`);
    }
    return res.rows[0] as Entity;
};
