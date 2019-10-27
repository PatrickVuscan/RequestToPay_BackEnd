/* This defines some common HTTPErrors that can be instantiated. */
import {logger} from "./logger";

export abstract class HTTPClientError extends Error {
    public statusCode!: number;
    public name!: string;

    protected constructor(message: object | string) {
        super(JSON.stringify(message));
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
        logger.error({
            file: "httpErrors.ts",
            stack: this.stack,
            message: this.message,
        });
    }
}

/* This is thrown when there is a bad request made to the server. */
export class HTTP400Error extends HTTPClientError {
    constructor(message: string | object = "Bad Request") {
        super(message);
        this.statusCode = 400;
    }
}

/* This is thrown when a request is made that the client is not authorized for. */
export class HTTP401Error extends HTTPClientError {
    public readonly statusCode = 401;

    constructor(message: string | object = "Unauthorized") {
        super(message);
    }
}

/* This is thrown when the client is forbidden from making a certain request. */
export class HTTP403Error extends HTTPClientError {
    constructor(message: string | object = "Forbidden") {
        super(message);
        this.statusCode = 403;
    }
}

/* Thrown when a file or something is not found. */
export class HTTP404Error extends HTTPClientError {
    constructor(message: string | object = "Not found") {
        super(message);
        this.statusCode = 404;
    }
}
