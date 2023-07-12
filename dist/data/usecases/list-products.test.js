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
const db_product_mock_1 = require("../test/mock/db-product-mock");
const list_products_1 = require("./list-products");
const makeSut = () => {
    const listProductsRepositorySpy = new db_product_mock_1.ListProductsRepositorySpy();
    const sut = new list_products_1.DbListProducts(listProductsRepositorySpy);
    return { sut, listProductsRepositorySpy };
};
const mockProduct = () => {
    return {
        id: faker_1.default.datatype.number(),
        reference: faker_1.default.datatype.number().toString(),
        code: faker_1.default.datatype.number().toString(),
        description: faker_1.default.lorem.sentence(),
        unit: "M2",
        supplier: "Biancogres",
        packageAmount: 2.33,
        weight: 13.8,
        height: 13.8,
        width: 13.8,
        length: 13.8,
        ncm: "213132445",
        batchControl: true,
    };
};
const filterOptions = {
    reference: faker_1.default.datatype.number().toString(),
};
describe("ListProducts", () => {
    it("should call ListProductsRepository with correct values", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, listProductsRepositorySpy } = makeSut();
        yield sut.list(filterOptions);
        expect(listProductsRepositorySpy.filterOptions).toEqual(filterOptions);
    }));
    it("should call ListProductsRepository without filterOption if this param is not passed", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, listProductsRepositorySpy } = makeSut();
        yield sut.list();
        expect(listProductsRepositorySpy.filterOptions).toBeFalsy();
    }));
    it("should throw if ListProductsRepository throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, listProductsRepositorySpy } = makeSut();
        jest.spyOn(listProductsRepositorySpy, "list").mockImplementationOnce(() => {
            throw new Error();
        });
        const promise = sut.list();
        yield expect(promise).rejects.toThrowError();
    }));
    it("should return a list of Products on success", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, listProductsRepositorySpy } = makeSut();
        const productList = [
            mockProduct(),
            mockProduct(),
            mockProduct(),
            mockProduct(),
        ];
        listProductsRepositorySpy.result = productList;
        const result = yield sut.list();
        expect(result).toEqual(productList);
    }));
});
