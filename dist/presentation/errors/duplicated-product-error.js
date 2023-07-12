"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicatedProductError = void 0;
class DuplicatedProductError extends Error {
    constructor() {
        super("The received product reference already exists");
        this.name = "DuplicatedProduct";
    }
}
exports.DuplicatedProductError = DuplicatedProductError;
