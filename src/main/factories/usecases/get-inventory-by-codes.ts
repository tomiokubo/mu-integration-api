import { DbGetInventoryByCodes } from "@/data/usecases/get-inventory-by-codes";
import { ProductRepository } from "@/infra/db/pg/repositories/product-repository";

export const makeDbGetInventoryByCodes = () => {
  const repository = new ProductRepository();
  return new DbGetInventoryByCodes(repository);
};
