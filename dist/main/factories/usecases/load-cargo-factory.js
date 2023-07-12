"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDbLoadCargo = void 0;
const load_cargo_1 = require("../../../data/usecases/load-cargo");
const cargo_repository_1 = require("../../../infra/db/pg/repositories/cargo-repository");
const makeDbLoadCargo = () => {
    const loadCargoRepository = new cargo_repository_1.CargoRepository();
    return new load_cargo_1.DbLoadCargo(loadCargoRepository, loadCargoRepository);
};
exports.makeDbLoadCargo = makeDbLoadCargo;
