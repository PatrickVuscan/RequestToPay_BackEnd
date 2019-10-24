/* This is the file where the external APIs of the providers gets turned into the API used by the handlers in the IRoute
 * objects exported by this service.
  * */

import {getUserByName} from "./providers/query";

export const getUser = async (name: string) => {
    return await getUserByName(name);
};
