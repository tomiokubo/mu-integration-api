"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeListProductsController = void 0;
const list_products_controller_1 = require("../../../presentation/controllers/list-products-controller");
const list_products_factory_1 = require("../usecases/list-products-factory");
const list_products_validation_1 = require("../validations/list-products-validation");
const makeListProductsController = () => {
    const controller = new list_products_controller_1.ListProductsController((0, list_products_validation_1.makeListProductsValidation)(), (0, list_products_factory_1.makeDbListProducts)());
    return controller;
};
exports.makeListProductsController = makeListProductsController;
