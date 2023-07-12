"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const field_validation_composite_1 = require("./field-validation-composite");
const errors_1 = require("../../presentation/errors");
const mock_validaton_1 = require("../../presentation/test/mocks/mock-validaton");
const faker_1 = __importDefault(require("faker"));
const field = faker_1.default.random.word();
const makeSut = () => {
    const validationSpies = [new mock_validaton_1.ValidationSpy(), new mock_validaton_1.ValidationSpy()];
    const sut = new field_validation_composite_1.ValidationComposite(validationSpies);
    return {
        sut,
        validationSpies,
    };
};
describe("Validation Composite", () => {
    test("Should return an error if any validation fails", () => {
        const { sut, validationSpies } = makeSut();
        validationSpies[1].error = new errors_1.MissingParamError(field);
        const error = sut.validate({ [field]: faker_1.default.random.word() });
        expect(error).toEqual(validationSpies[1].error);
    });
    test("Should return the first error if more then one validation fails", () => {
        const { sut, validationSpies } = makeSut();
        validationSpies[0].error = new Error();
        validationSpies[1].error = new errors_1.MissingParamError(field);
        const error = sut.validate({ [field]: faker_1.default.random.word() });
        expect(error).toEqual(validationSpies[0].error);
    });
    test("Should return null if validation succeeds", () => {
        const { sut } = makeSut();
        const error = sut.validate({ [field]: faker_1.default.random.word() });
        expect(error).toBeFalsy();
    });
});
