import {Entity} from "../../../utils/dbTypes";
import {HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

type UserVerify = (name: string, password: string) => Promise<Entity>;
export const generateLoginString: (uname: string, pass: string) => string = (uname: string, pass: string) => {
    return `select * from "RequestToPay"."Entity" where "Userame" = '${uname}' and "Password" = '${pass}'`;
};
export const loginRequest: UserVerify = async (uname: string, pass: string) => {
    const res = await q(generateLoginString(uname, pass));
    if (res.rows.length !== 1) {
        throw new HTTP404Error(`Could not find user(${uname}) with specified password(${pass})`);
    }
    return res.rows[0] as Entity;
};
