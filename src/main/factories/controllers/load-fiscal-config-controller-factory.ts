import { Controller } from "@/presentation/protocols";
import { LoadFiscalConfigController } from "@/presentation/controllers/load-fiscal-config-controller";
import { makeDbLoadFiscalConfig } from "../usecases/load-fiscal-config-factory";

export const makeLoadFiscalConfigController = (): Controller => {
  const controller = new LoadFiscalConfigController(makeDbLoadFiscalConfig());
  return controller;
};
