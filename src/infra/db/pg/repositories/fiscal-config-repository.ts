import { LoadFiscalConfigRepository } from "@/data/protocols/db/fiscal-config/load-fiscal-config-repository";
import { FiscalConfig } from "@/domain/models/fiscal-config";
import { DbHelper } from "../db-helper";
import { StateFiscalConfig } from "@/domain/models/state-fiscal-config";
import { IpiConfig } from "@/domain/models/ipi-config";

export class FiscalConfigRepository implements LoadFiscalConfigRepository {
  async load(): Promise<{
    fiscalConfig: FiscalConfig[];
    stateFiscalConfig: StateFiscalConfig[];
    ipiConfig: IpiConfig[];
  }> {
    const fiscalConfig = await DbHelper.getAppDataSource()?.manager.query(
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
    const stateFiscalConfig = await DbHelper.getAppDataSource()?.manager.query(
      `SELECT sigla AS siglaEstado
      ,aliqicms AS aliquotaICMSEstado
      ,ncoicm1mer AS aliquotaICMSDentroDoEstado
      ,ncoicm2mer AS aliquotaICMSParaSudeste
      ,ncoicm3mer AS aliquotaICMSParaNorteNordesteEEspiritoSanto
       FROM ESTADOSCAD`
    );

    const ipiConfig = await DbHelper.getAppDataSource()?.manager.query(
      `SELECT DISTINCT 
      clasfiscal AS ncm
      , percipi AS ipi
      FROM CLAFISCCAD`
    );
    return { fiscalConfig, stateFiscalConfig, ipiConfig };
  }
}
