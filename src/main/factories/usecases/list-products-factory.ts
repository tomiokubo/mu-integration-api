import { DbListProducts } from "@/data/usecases/list-products";
import { ProductRepository } from "@/infra/db/pg/repositories/product-repository";

export const makeDbListProducts = () => {
  const listProductsRepository = new ProductRepository();
  return new DbListProducts(listProductsRepository);
};
