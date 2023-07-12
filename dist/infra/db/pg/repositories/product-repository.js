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
exports.ProductRepository = void 0;
const db_helper_1 = require("../db-helper");
class ProductRepository {
    list(filterOptions) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const containsFilter = (filterOptions === null || filterOptions === void 0 ? void 0 : filterOptions.code) ||
                (filterOptions === null || filterOptions === void 0 ? void 0 : filterOptions.description) ||
                (filterOptions === null || filterOptions === void 0 ? void 0 : filterOptions.reference);
            const products = yield ((_a = db_helper_1.DbHelper.getAppDataSource()) === null || _a === void 0 ? void 0 : _a.manager.query("SELECT P.codpro as reference, ref.referencia as eanCode, C.descricaolonga as description, P.unid1 as unit, " +
                "P.modelo as supplier, C.vendaminima as packageAmount, P.pesounit as weight, " +
                "C.alturacm as height, C.larguracm as width, C.comprimentocm as length, P.codigoncm as ncm, I.controlelote as batchControl " +
                "FROM produtocad P " +
                "INNER JOIN complementoproduto C " +
                "ON P.codpro = C.codpro " +
                "INNER JOIN itemfilest I " +
                "ON P.codpro = I.codpro " +
                "INNER JOIN PRODREFCAD ref " +
                "ON P.codpro = ref.codpro " +
                "WHERE I.filial = 2 " +
                `${(filterOptions === null || filterOptions === void 0 ? void 0 : filterOptions.code) ? "AND ref.referencia = @0 " : ""}` +
                `${(filterOptions === null || filterOptions === void 0 ? void 0 : filterOptions.reference)
                    ? "AND P.codpro = " + filterOptions.reference + " "
                    : ""}` +
                `${(filterOptions === null || filterOptions === void 0 ? void 0 : filterOptions.description)
                    ? "AND C.descricaolonga LIKE '%" + filterOptions.description + "%'"
                    : ""}`, [filterOptions === null || filterOptions === void 0 ? void 0 : filterOptions.code]));
            return products;
        });
    }
    listByManyCodes(codes) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield ((_a = db_helper_1.DbHelper.getAppDataSource()) === null || _a === void 0 ? void 0 : _a.manager.query("SELECT P.codpro as reference, ref.referencia as eanCode, C.descricaolonga as description, P.unid1 as unit, " +
                "P.modelo as supplier, P.faconv as conversionFactor, P.unid1 as conversionUnit, C.vendaminima as packageAmount, P.pesounit as weight, " +
                "C.alturacm as height, C.larguracm as width, C.comprimentocm as length, P.codigoncm as ncm, I.controlelote as batchControl " +
                "FROM produtocad P " +
                "INNER JOIN complementoproduto C " +
                "ON P.codpro = C.codpro " +
                "INNER JOIN itemfilest I " +
                "ON P.codpro = I.codpro " +
                "INNER JOIN PRODREFCAD ref " +
                "ON P.codpro = ref.codpro " +
                "WHERE ref.referencia IN (" +
                `${codes.map((code) => {
                    return `'${code}'`;
                })}` +
                ") AND I.filial = 2"));
            return products;
        });
    }
}
exports.ProductRepository = ProductRepository;
