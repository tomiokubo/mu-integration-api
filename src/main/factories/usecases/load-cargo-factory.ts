import { DbLoadCargo } from "@/data/usecases/load-cargo";
import { CargoRepository } from "@/infra/db/pg/repositories/cargo-repository";

export const makeDbLoadCargo = () => {
  const loadCargoRepository = new CargoRepository();
  return new DbLoadCargo(loadCargoRepository, loadCargoRepository);
};
