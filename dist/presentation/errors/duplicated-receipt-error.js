"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicatedReceiptError = void 0;
class DuplicatedReceiptError extends Error {
    constructor(nfs) {
        super("The received receipt reference already exists");
        this.nfs = nfs;
        this.name = "DuplicatedReceipt";
    }
}
exports.DuplicatedReceiptError = DuplicatedReceiptError;
