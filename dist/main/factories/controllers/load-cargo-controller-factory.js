"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoadCargoController = void 0;
const load_cargo_controller_1 = require("../../../presentation/controllers/load-cargo-controller");
const load_cargo_validation_1 = require("../validations/load-cargo-validation");
const load_cargo_factory_1 = require("../usecases/load-cargo-factory");
const makeLoadCargoController = () => {
    const controller = new load_cargo_controller_1.LoadCargoController((0, load_cargo_validation_1.makeLoadCargoValidation)(), (0, load_cargo_factory_1.makeDbLoadCargo)());
    return controller;
};
exports.makeLoadCargoController = makeLoadCargoController;
