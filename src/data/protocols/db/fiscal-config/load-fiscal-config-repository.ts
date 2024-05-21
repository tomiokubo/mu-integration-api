import { FiscalConfig } from "@/domain/models/fiscal-config";
import { IpiConfig } from "@/domain/models/ipi-config";
import { StateFiscalConfig } from "@/domain/models/state-fiscal-config";

export interface LoadFiscalConfigRepository {
  load: () => Promise<{
    fiscalConfig: FiscalConfig[];
    stateFiscalConfig: StateFiscalConfig[];
    ipiConfig: IpiConfig[];
  }>;
}
