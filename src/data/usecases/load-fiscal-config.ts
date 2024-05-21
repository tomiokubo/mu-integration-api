import { LoadFiscalConfig } from "@/domain/usecases/load-fiscal-config";
import { LoadFiscalConfigRepository } from "../protocols/db/fiscal-config/load-fiscal-config-repository";
import { FiscalConfig } from "@/domain/models/fiscal-config";
import { StateFiscalConfig } from "@/domain/models/state-fiscal-config";
import { IpiConfig } from "@/domain/models/ipi-config";

export class DbLoadFiscalConfig implements LoadFiscalConfig {
  constructor(
    private readonly LoadFiscalConfigRepository: LoadFiscalConfigRepository
  ) {}
  load(): Promise<{
    fiscalConfig: FiscalConfig[];
    stateFiscalConfig: StateFiscalConfig[];
    ipiConfig: IpiConfig[];
  }> {
    return this.LoadFiscalConfigRepository.load();
  }
}
