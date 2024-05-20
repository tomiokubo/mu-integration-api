import { LoadFiscalConfig } from "@/domain/usecases/load-fiscal-config";
import { LoadFiscalConfigRepository } from "../protocols/db/fiscal-config/load-fiscal-config-repository";
import { FiscalConfig } from "@/domain/models/fiscal-config";

export class DbLoadFiscalConfig implements LoadFiscalConfig {
  constructor(
    private readonly LoadFiscalConfigRepository: LoadFiscalConfigRepository
  ) {}
  load(): Promise<FiscalConfig[]> {
    return this.LoadFiscalConfigRepository.load();
  }
}
