"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicatedCargoError = void 0;
class DuplicatedCargoError extends Error {
    constructor() {
        super("The received cargo number is duplicated");
        this.name = "Duplicated cargo number";
    }
}
exports.DuplicatedCargoError = DuplicatedCargoError;
