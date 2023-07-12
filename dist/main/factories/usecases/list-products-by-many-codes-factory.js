"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDbListProductsByManyCodes = void 0;
const list_products_by_many_codes_1 = require("../../../data/usecases/list-products-by-many-codes");
const product_repository_1 = require("../../../infra/db/pg/repositories/product-repository");
const makeDbListProductsByManyCodes = () => {
    const listProductsRepository = new product_repository_1.ProductRepository();
    return new list_products_by_many_codes_1.DbListProductsByManyCodes(listProductsRepository);
};
exports.makeDbListProductsByManyCodes = makeDbListProductsByManyCodes;
