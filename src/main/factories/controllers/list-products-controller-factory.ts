import { ListProductsController } from "@/presentation/controllers/list-products-controller";
import { Controller } from "@/presentation/protocols";
import { makeDbListProducts } from "../usecases/list-products-factory";
import { makeListProductsValidation } from "../validations/list-products-validation";

export const makeListProductsController = (): Controller => {
  const controller = new ListProductsController(
    makeListProductsValidation(),
    makeDbListProducts()
  );
  return controller;
};
