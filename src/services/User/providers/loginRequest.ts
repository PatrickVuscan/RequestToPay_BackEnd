import {entity} from "../../../utils/dbTypes";
import {HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";

type UserVerify = (name: string, password: string) => Promise<entity>;
export const generateLoginString: (uname: string, pass: string) => string = (uname: string, pass: string) => {
    return `select *
            from requesttopay.entity
            where name='${uname}' and
                  password='${pass}'`;
};
export const loginRequest: UserVerify = async (uname: string, pass: string) => {
    const res = await q(generateLoginString(uname, pass));
    if (res.rows.length !== 1) {
        throw new HTTP404Error(`Could not find user(${uname}) with specified password(${pass})`);
    }
    return res.rows[0] as entity;
};
