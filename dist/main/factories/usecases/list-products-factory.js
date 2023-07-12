"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDbListProducts = void 0;
const list_products_1 = require("../../../data/usecases/list-products");
const product_repository_1 = require("../../../infra/db/pg/repositories/product-repository");
const makeDbListProducts = () => {
    const listProductsRepository = new product_repository_1.ProductRepository();
    return new list_products_1.DbListProducts(listProductsRepository);
};
exports.makeDbListProducts = makeDbListProducts;
