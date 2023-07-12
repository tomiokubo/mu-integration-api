"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const required_field_validatior_1 = require("../validators/required-field-validatior");
const errors_1 = require("../../presentation/errors");
const faker_1 = __importDefault(require("faker"));
const field = faker_1.default.random.word();
const makeSut = () => {
    return new required_field_validatior_1.RequiredFieldValidation(field);
};
describe("RequiredField Validation", () => {
    test("Should return a MissingParamError if validation fails", () => {
        const sut = makeSut();
        const error = sut.validate({ invalidField: faker_1.default.random.word() });
        expect(error).toEqual(new errors_1.MissingParamError(field));
    });
    test("Should not return if validation succeeds", () => {
        const sut = makeSut();
        const error = sut.validate({ [field]: faker_1.default.random.word() });
        expect(error).toBeNull();
    });
});
