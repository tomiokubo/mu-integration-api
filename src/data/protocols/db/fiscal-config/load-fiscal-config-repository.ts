import { FiscalConfig } from "@/domain/models/fiscal-config";

export interface LoadFiscalConfigRepository {
  load: () => Promise<FiscalConfig[]>;
}
