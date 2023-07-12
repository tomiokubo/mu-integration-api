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
exports.CargoRepository = void 0;
const db_helper_1 = require("../db-helper");
class CargoRepository {
    load(cargoNumber) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return yield ((_a = db_helper_1.DbHelper.getAppDataSource()) === null || _a === void 0 ? void 0 : _a.manager.query(`SELECT ITF.NUMEROLISTA AS cargoReference, NUMPED AS orderReference, ITF.CODPRO AS productReference, REF.REFERENCIA as eanCode,
        ITF.ITEM as itemReference,
        QUANT as amount, CLI.NOME AS clientName, CLI.CGC AS clientCpf, ENDE.CEP AS cep, ENDE.BAIRRO AS neighborhood,
        ENDE.COMPLEMENTO AS additionalInformation,
        ENDE.NUMERO AS propertyNumber, ENDE.RUA AS street, ENDE.REFERENCIA AS referencePoint,
        CID.NOME AS city, PROV.NOME AS federalUnit 
        FROM PEDICLICAD PED 
        JOIN ITEMFATURADO ITF ON ITF.PEDIDO = PED.NUMPED
        JOIN PRODREFCAD REF ON ITF.CODPRO = REF.CODPRO
        JOIN CLIENTECAD CLI ON CLI.OID = PED.CODCLIE
        JOIN ENDERECO_R ENDE ON ENDE.OID = PED.CODENDENT
        JOIN CIDADE_R CID ON CID.OID = ENDE.RCIDADE
        JOIN PROVINCIA_R PROV ON PROV.OID = CID.RPROVINCIA 
        WHERE ITF.NUMEROLISTA = @0
        ORDER BY ITF.ITEM`, [cargoNumber]));
        });
    }
    loadBatches(itemReferences) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return yield ((_a = db_helper_1.DbHelper.getAppDataSource()) === null || _a === void 0 ? void 0 : _a.manager.query(`
        SELECT R.RItem as itemReference, R.loteinterno as batchReference, R.quant as amount,
         (SELECT lote FROM lote L 
            WHERE L.codpro = R.codpro AND 
            L.loteinterno = R.loteinterno) as batch 
            FROM reservalote R 
            WHERE R.ritem IN (
                ${itemReferences.map((reference) => {
                return `'${reference}'`;
            })}
            )
        `));
        });
    }
}
exports.CargoRepository = CargoRepository;
