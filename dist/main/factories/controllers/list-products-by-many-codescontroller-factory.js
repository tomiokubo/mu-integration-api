"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeListProductsByManyCodesController = void 0;
const list_products_by_many_codes_controller_1 = require("../../../presentation/controllers/list-products-by-many-codes-controller");
const list_products_by_many_codes_factory_1 = require("../usecases/list-products-by-many-codes-factory");
const list_products_by_many_codes_validation_1 = require("../validations/list-products-by-many-codes-validation");
const makeListProductsByManyCodesController = () => {
    const controller = new list_products_by_many_codes_controller_1.ListProductsByManyCodesController((0, list_products_by_many_codes_validation_1.makeListProductsByManyCodesValidation)(), (0, list_products_by_many_codes_factory_1.makeDbListProductsByManyCodes)());
    return controller;
};
exports.makeListProductsByManyCodesController = makeListProductsByManyCodesController;
