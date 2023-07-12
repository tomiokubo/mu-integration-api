"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_routes_1 = __importDefault(require("../routes/product-routes"));
const cargo_routes_1 = __importDefault(require("../routes/cargo-routes"));
exports.default = (app) => {
    app.use("/product/", product_routes_1.default);
    app.use("/cargo/", cargo_routes_1.default);
};
