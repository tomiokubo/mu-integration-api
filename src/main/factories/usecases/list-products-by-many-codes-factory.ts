import { DbListProductsByManyCodes } from "@/data/usecases/list-products-by-many-codes";
import { ProductRepository } from "@/infra/db/pg/repositories/product-repository";

export const makeDbListProductsByManyCodes = () => {
  const listProductsRepository = new ProductRepository();
  return new DbListProductsByManyCodes(listProductsRepository);
};
