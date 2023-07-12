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
exports.DbLoadCargo = void 0;
const to_cargo_1 = require("./utils/to-cargo");
class DbLoadCargo {
    constructor(loadCargoRepository, loadCargoBatchesRepository) {
        this.loadCargoRepository = loadCargoRepository;
        this.loadCargoBatchesRepository = loadCargoBatchesRepository;
    }
    load(cargoNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            let rawCargos = yield this.loadCargoRepository.load(cargoNumber);
            rawCargos = rawCargos.reduce((acc, raw) => {
                const existing = acc.find((i) => i.itemReference === raw.itemReference);
                if (!existing) {
                    acc.push(raw);
                }
                return acc;
            }, []);
            const cargo = (0, to_cargo_1.toCargo)(rawCargos);
            const items = [];
            cargo.cargoItems.map((item) => {
                items.push(item.itemReference);
            });
            const rawCargoBatchesList = yield this.loadCargoBatchesRepository.loadBatches(items);
            rawCargoBatchesList.map((raw) => {
                var _a;
                const matchingItem = cargo.cargoItems.find((item) => item.itemReference === raw.itemReference);
                if (matchingItem) {
                    (_a = matchingItem.batches) === null || _a === void 0 ? void 0 : _a.push(raw);
                }
            });
            return cargo;
        });
    }
}
exports.DbLoadCargo = DbLoadCargo;
