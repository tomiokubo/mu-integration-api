import { FiscalConfig } from "../models/fiscal-config";
import { IpiConfig } from "../models/ipi-config";
import { StateFiscalConfig } from "../models/state-fiscal-config";

export interface LoadFiscalConfig {
  load: () => Promise<{
    fiscalConfig: FiscalConfig[];
    stateFiscalConfig: StateFiscalConfig[];
    ipiConfig: IpiConfig[];
  }>;
}
