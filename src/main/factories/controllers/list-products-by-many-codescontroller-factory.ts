import { ListProductsByManyCodesController } from "@/presentation/controllers/list-products-by-many-codes-controller";
import { Controller } from "@/presentation/protocols";
import { makeDbListProductsByManyCodes } from "../usecases/list-products-by-many-codes-factory";
import { makeListProductsByManyCodesValidation } from "../validations/list-products-by-many-codes-validation";

export const makeListProductsByManyCodesController = (): Controller => {
  const controller = new ListProductsByManyCodesController(
    makeListProductsByManyCodesValidation(),
    makeDbListProductsByManyCodes()
  );
  return controller;
};
