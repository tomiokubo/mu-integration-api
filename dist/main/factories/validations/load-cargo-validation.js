"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoadCargoValidation = void 0;
const validators_1 = require("../../../validation/validators");
const makeLoadCargoValidation = () => {
    const validations = [];
    for (const field of ["cargoReference"]) {
        validations.push(new validators_1.RequiredFieldValidation(field));
    }
    return new validators_1.ValidationComposite(validations);
};
exports.makeLoadCargoValidation = makeLoadCargoValidation;
