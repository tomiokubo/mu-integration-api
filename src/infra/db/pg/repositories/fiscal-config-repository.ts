import { LoadFiscalConfigRepository } from "@/data/protocols/db/fiscal-config/load-fiscal-config-repository";
import { FiscalConfig } from "@/domain/models/fiscal-config";
import { DbHelper } from "../db-helper";

export class FiscalConfigRepository implements LoadFiscalConfigRepository {
  async load(): Promise<FiscalConfig[]> {
    return await DbHelper.getAppDataSource()?.manager.query(
      `SELECT DISTINCT
      clasfiscal AS ncm
      , percipi AS ipi
      , ESTADODESTINO AS estadoDestino
      , ESTADOORIGEM AS estadoOrigem
      , S.SUBSTRIB AS mva
      ,ALIQUOTAICMSST AS aliquotaICMS
      ,BASEICMSST AS baseICMSST
      ,BASEICMS AS baseICMS
      ,ALIQUOTAICMS AS aliquotaICMSInterno
      FROM CLAFISCCAD C
      INNER JOIN SUBSTENTRADA S 
      ON C.cf=S.CF `
    );
  }
}
