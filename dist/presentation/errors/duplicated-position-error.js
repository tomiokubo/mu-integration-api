"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicatedPositionError = void 0;
class DuplicatedPositionError extends Error {
    constructor() {
        super("The received position reference already exists");
        this.name = "DuplicatedPosition";
    }
}
exports.DuplicatedPositionError = DuplicatedPositionError;
