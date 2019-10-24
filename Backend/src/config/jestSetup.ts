/* This file is run when jest is setting up */

import * as Transport from "winston-transport";
import {logger} from "../utils/logger";

// silence the logger
// logger.transports.forEach((t: Transport) => {
//     return (t.silent = true);
// });
