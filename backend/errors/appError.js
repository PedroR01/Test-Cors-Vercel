/*
La finalidad de esta clase es para realizar
una buena práctica que es extender del error de nodejs
y a su vez hacerlo de una forma más uniforme
*/
export class AppError extends Error {
    constructor(name, httpCode, description, isOperational = true) {
        super(description);
        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}


