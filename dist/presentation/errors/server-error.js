"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = void 0;
class ServerError extends Error {
    constructor(error) {
        super("Internal server error");
        this.name = "ServerError";
        this.data = error;
    }
}
exports.ServerError = ServerError;
