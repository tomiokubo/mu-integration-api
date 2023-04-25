import { DbListProducts } from "@/data/usecases/list-products";
import { DbLoadCargo } from "@/data/usecases/load-cargo";
import { CargoRepository } from "@/infra/db/pg/repositories/cargo-repository";
import { ProductRepository } from "@/infra/db/pg/repositories/product-repository";

export const makeDbLoadCargo = () => {
  const loadCargoRepository = new CargoRepository();
  return new DbLoadCargo(loadCargoRepository, loadCargoRepository);
};
