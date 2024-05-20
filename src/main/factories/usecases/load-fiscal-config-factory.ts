import { DbLoadFiscalConfig } from "@/data/usecases/load-fiscal-config";
import { FiscalConfigRepository } from "@/infra/db/pg/repositories/fiscal-config-repository";

export const makeDbLoadFiscalConfig = () => {
  const loadFiscalConfigRepository = new FiscalConfigRepository();
  return new DbLoadFiscalConfig(loadFiscalConfigRepository);
};
