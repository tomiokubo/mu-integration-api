import { Controller } from "@/presentation/protocols";
import { LoadCargoController } from "@/presentation/controllers/load-cargo-controller";
import { makeLoadCargoValidation } from "../validations/load-cargo-validation";
import { makeDbLoadCargo } from "../usecases/load-cargo-factory";

export const makeLoadCargoController = (): Controller => {
  const controller = new LoadCargoController(
    makeLoadCargoValidation(),
    makeDbLoadCargo()
  );
  return controller;
};
