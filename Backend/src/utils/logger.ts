/* This file configures the logger that logs to the console and a file in logs. */
import * as winston from "winston";

// define the custom settings for each transport (file, console)
const options = {
    console: {
        level: "debug",
        handleExceptions: true,
        json: false,
        colorize: true,
    },
    file: {
        colorize: true,
        filename: `./logs/app.log`,
        handleExceptions: true,
        json: true,
        level: "info",
        maxFiles: 5,
        maxsize: 5242880, // 5MB
    },
};

export const logger =  winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console),
    ],
    exitOnError: false, // do not exit on handled exceptions
});
