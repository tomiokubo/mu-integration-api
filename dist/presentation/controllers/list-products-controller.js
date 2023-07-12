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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListProductsController = void 0;
const helpers_1 = require("../helpers");
class ListProductsController {
    constructor(validation, listProducts) {
        this.validation = validation;
        this.listProducts = listProducts;
    }
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const error = this.validation.validate(request);
            console.log(error);
            if (error)
                return (0, helpers_1.badRequest)(error);
            try {
                const products = yield this.listProducts.list(request);
                if (products.length === 0)
                    return (0, helpers_1.noContent)();
                return (0, helpers_1.ok)(products);
            }
            catch (error) {
                return (0, helpers_1.serverError)(error);
            }
        });
    }
}
exports.ListProductsController = ListProductsController;
