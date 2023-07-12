"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeListProductsByManyCodesValidation = void 0;
const validators_1 = require("../../../validation/validators");
const makeListProductsByManyCodesValidation = () => {
    const validations = [];
    for (const field of ["codes"]) {
        validations.push(new validators_1.RequiredFieldValidation(field));
    }
    return new validators_1.ValidationComposite(validations);
};
exports.makeListProductsByManyCodesValidation = makeListProductsByManyCodesValidation;
