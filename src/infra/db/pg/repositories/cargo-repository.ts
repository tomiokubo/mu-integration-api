import {
  LoadCargoRepository,
  RawCargo,
} from "@/data/protocols/db/cargo/load-cargo-repository";
import { DbHelper } from "../db-helper";
import {
  LoadCargoBatchesRepository,
  RawCargoBatches,
} from "@/data/protocols/db/cargo/load-cargo-batches-repository";

export class CargoRepository
  implements LoadCargoRepository, LoadCargoBatchesRepository
{
  async load(cargoNumber: string): Promise<RawCargo[]> {
    return await DbHelper.getAppDataSource()?.manager.query(
      `SELECT ITF.NUMEROLISTA AS cargoReference, NUMPED AS orderReference, ITF.CODPRO AS productReference, REF.REFERENCIA as eanCode,
        ITF.ITEM as itemReference,
        QUANT as amount, CLI.NOME AS clientName, CLI.CGC AS clientCpf, ENDE.CEP AS cep, ENDE.BAIRRO AS neighborhood,
        ENDE.COMPLEMENTO AS additionalInformation,
        ENDE.NUMERO AS propertyNumber, ENDE.RUA AS street, ENDE.REFERENCIA AS referencePoint,
        CID.NOME AS city, PROV.NOME AS federalUnit 
        FROM PEDICLICAD PED 
        JOIN ITEMFATURADO ITF ON ITF.PEDIDO = PED.NUMPED
        JOIN PRODREFCAD REF ON ITF.CODPRO = REF.CODPRO
        JOIN CLIENTECAD CLI ON CLI.OID = PED.CODCLIE
        JOIN ENDERECO_R ENDE ON ENDE.OID = PED.CODENDENT
        JOIN CIDADE_R CID ON CID.OID = ENDE.RCIDADE
        JOIN PROVINCIA_R PROV ON PROV.OID = CID.RPROVINCIA 
        WHERE ITF.NUMEROLISTA = @0
        ORDER BY ITF.ITEM`,
      [cargoNumber]
    );
  }
  async loadBatches(itemReferences: string[]): Promise<RawCargoBatches[]> {
    return await DbHelper.getAppDataSource()?.manager.query(
      `
        SELECT R.RItem as itemReference, R.loteinterno as batchReference, R.quant as amount,
         (SELECT lote FROM lote L 
            WHERE L.codpro = R.codpro AND 
            L.loteinterno = R.loteinterno) as batch 
            FROM reservalote R 
            WHERE R.ritem IN (
                ${itemReferences.map((reference) => {
                  return `'${reference}'`;
                })}
            )
        `
    );
  }
}
