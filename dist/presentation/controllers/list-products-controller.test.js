"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = __importDefault(require("faker"));
const helpers_1 = require("../helpers");
const mock_products_1 = require("../test/mocks/mock-products");
const mock_validaton_1 = require("../test/mocks/mock-validaton");
const list_products_controller_1 = require("./list-products-controller");
const makeSut = () => {
    const listProductsSpy = new mock_products_1.ListProductsSpy();
    const validationSpy = new mock_validaton_1.ValidationSpy();
    const sut = new list_products_controller_1.ListProductsController(validationSpy, listProductsSpy);
    return { sut, listProductsSpy, validationSpy };
};
const mockProduct = () => {
    return {
        id: faker_1.default.datatype.number(),
        reference: faker_1.default.datatype.number().toString(),
        code: faker_1.default.datatype.number().toString(),
        description: faker_1.default.lorem.sentence(),
        unit: "M2",
        supplier: faker_1.default.company.companyName(),
        packageAmount: faker_1.default.datatype.float(),
        weight: faker_1.default.datatype.float(),
        height: faker_1.default.datatype.float(),
        width: faker_1.default.datatype.float(),
        length: faker_1.default.datatype.float(),
        ncm: faker_1.default.datatype.number.toString(),
        batchControl: true,
    };
};
describe("ListProductsController", () => {
    it("should call Validation with correct values", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, validationSpy } = makeSut();
        const code = faker_1.default.datatype.number().toString();
        yield sut.handle({ code });
        expect(validationSpy.input).toEqual({ code });
    }));
    it("should return 400 if validation return error", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, validationSpy } = makeSut();
        validationSpy.error = new Error();
        const code = faker_1.default.datatype.number().toString();
        const result = yield sut.handle({ code });
        expect(result).toEqual((0, helpers_1.badRequest)(new Error()));
    }));
    it("should call ListProducts with correct values", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, listProductsSpy } = makeSut();
        const reference = faker_1.default.datatype.number().toString();
        yield sut.handle({ reference });
        expect(listProductsSpy.filterOptions).toEqual({ reference });
        yield sut.handle();
        expect(listProductsSpy.filterOptions).toBeFalsy();
    }));
    it("should return 500 if ListProducts throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, listProductsSpy } = makeSut();
        jest.spyOn(listProductsSpy, "list").mockImplementationOnce(() => {
            throw new Error();
        });
        const result = yield sut.handle();
        expect(result).toEqual((0, helpers_1.serverError)(new Error()));
    }));
    it("should return 204 if ListProducts returns an empty array", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, listProductsSpy } = makeSut();
        listProductsSpy.result = [];
        const result = yield sut.handle();
        expect(result).toEqual((0, helpers_1.noContent)());
    }));
    it("should return 200 on sucess", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, listProductsSpy } = makeSut();
        const list = [mockProduct(), mockProduct(), mockProduct()];
        listProductsSpy.result = list;
        const result = yield sut.handle();
        expect(result).toEqual((0, helpers_1.ok)(list));
    }));
});
