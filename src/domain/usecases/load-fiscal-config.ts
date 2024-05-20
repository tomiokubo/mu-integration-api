import { FiscalConfig } from "../models/fiscal-config";

export interface LoadFiscalConfig {
  load: () => Promise<FiscalConfig[]>;
}
