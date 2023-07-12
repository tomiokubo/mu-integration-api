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
exports.LoadCargoController = void 0;
const helpers_1 = require("../helpers");
class LoadCargoController {
    constructor(validation, loadCargo) {
        this.validation = validation;
        this.loadCargo = loadCargo;
    }
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const error = this.validation.validate(request);
            if (error)
                return (0, helpers_1.badRequest)(error);
            try {
                const cargo = yield this.loadCargo.load(request.cargoReference);
                if (!cargo)
                    return (0, helpers_1.noContent)();
                return (0, helpers_1.ok)(cargo);
            }
            catch (error) {
                return (0, helpers_1.serverError)(error);
            }
        });
    }
}
exports.LoadCargoController = LoadCargoController;
