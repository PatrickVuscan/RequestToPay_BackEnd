/* This is the file where the external APIs of the providers gets turned into the API used by the handlers in the IRoute
 * objects exported by this service.
 * */

// I Don't understand why this thing is needed? Looks like another layer that isn't necessarily needed.

// import {getUserByName, login} from "./providers/invoiceRequests";
//
// export const getUser = async (name: string) => {
//     return await getUserByName(name);
// };
//
// export const getLogin = async  (name: string, pass: string) => {
//     return await login(name, pass);
// };