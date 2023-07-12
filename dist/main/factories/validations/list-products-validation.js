"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeListProductsValidation = void 0;
const validators_1 = require("../../../validation/validators");
const makeListProductsValidation = () => {
    const validations = [];
    return new validators_1.ValidationComposite(validations);
};
exports.makeListProductsValidation = makeListProductsValidation;
