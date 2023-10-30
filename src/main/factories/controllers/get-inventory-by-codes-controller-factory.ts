import { GetInventoryByCodesController } from "@/presentation/controllers/get-inventory-by-codes-controller";
import { Controller } from "../../../presentation/protocols";
import { makeListProductsByManyCodesValidation } from "../validations/list-products-by-many-codes-validation";
import { makeDbGetInventoryByCodes } from "../usecases/get-inventory-by-codes";

export const makeGetInventoryByCodesController = (): Controller => {
  const controller = new GetInventoryByCodesController(
    makeListProductsByManyCodesValidation(),
    makeDbGetInventoryByCodes()
  );
  return controller;
};
