import { ListProductsByManyCodesRepository } from "@/data/protocols/db/product/list-products-by-many-codes-repository";
import { ListProductsRepository } from "@/data/protocols/db/product/list-products-repository";
import { Product } from "@/domain/models/product-model";
import { ListProductsFilterOptions } from "@/domain/usecases/list-products";
import { DbHelper } from "../db-helper";

export class ProductRepository
  implements ListProductsRepository, ListProductsByManyCodesRepository
{
  async list(
    filterOptions?: ListProductsFilterOptions | undefined
  ): Promise<Product[]> {
    const products = await DbHelper.getAppDataSource()?.manager.query(
      "SELECT P.codpro as reference, ref.referencia as eanCode, C.descricaolonga as description, P.unid1 as unit, " +
        "P.modelo as supplier, C.vendaminima as packageAmount, P.pesounit as weight, " +
        "C.alturacm as height, C.larguracm as width, C.comprimentocm as length, P.codigoncm as ncm, I.controlelote as batchControl " +
        "FROM produtocad P " +
        "INNER JOIN complementoproduto C " +
        "ON P.codpro = C.codpro " +
        "INNER JOIN itemfilest I " +
        "ON P.codpro = I.codpro " +
        "LEFT JOIN PRODREFCAD ref " +
        "ON P.codpro = ref.codpro " +
        "WHERE I.filial = 2 " +
        `${filterOptions?.code ? "AND ref.referencia = @0 " : ""}` +
        `${
          filterOptions?.reference
            ? "AND P.codpro = " + filterOptions.reference + " "
            : ""
        }` +
        `${
          filterOptions?.description
            ? "AND C.descricaolonga LIKE '%" + filterOptions.description + "%'"
            : ""
        }`,
      [filterOptions?.code]
    );
    return products;
  }

  async listByManyCodes(codes: string[]): Promise<Product[]> {
    const products = await DbHelper.getAppDataSource()?.manager.query(
      "SELECT P.codpro as reference, ref.referencia as eanCode, C.descricaolonga as description, P.unid1 as unit, " +
        "P.modelo as supplier, P.faconv as conversionFactor, P.unid1 as conversionUnit, C.vendaminima as packageAmount, P.pesounit as weight, " +
        "C.alturacm as height, C.larguracm as width, C.comprimentocm as length, P.codigoncm as ncm, I.controlelote as batchControl " +
        "FROM produtocad P " +
        "INNER JOIN complementoproduto C " +
        "ON P.codpro = C.codpro " +
        "INNER JOIN itemfilest I " +
        "ON P.codpro = I.codpro " +
        "INNER JOIN PRODREFCAD ref " +
        "ON P.codpro = ref.codpro " +
        "WHERE ref.referencia IN (" +
        `${codes.map((code) => {
          return `'${code}'`;
        })}` +
        ") AND I.filial = 2"
    );
    return products;
  }

  async getInventoryByCodes(
    codes: string[],
    branch?: string[]
  ): Promise<Product[]> {
    if (!codes || codes.length === 0) {
      const products = await DbHelper.getAppDataSource()?.manager.query(
        `SELECT
        I.FILIAL as branch
        ,A.CODPRO as reference
        ,REF.referencia as eanCode
        ,A.MODELO as supplier
        ,B.DESCRICAOLONGA as description
        ,A.UNID1 as unit
        ,I.QUANT as amount
        
      FROM
        PRODUTOCAD A
        INNER JOIN ITEMFILEST I ON (I.CODPRO=A.CODPRO) 
        INNER JOIN COMPLEMENTOPRODUTO B ON (B.CODPRO=A.CODPRO)
        INNER JOIN PRODREFCAD REF ON A.CODPRO = REF.CODPRO
        WHERE I.QUANT <> 0
        ${
          branch &&
          `AND I.FILIAL IN (${branch.map((code) => {
            return `'${code}'`;
          })})`
        }
        `
      );
      return products;
    }
    const products = await DbHelper.getAppDataSource()?.manager.query(
      `SELECT
      I.FILIAL as branch
      ,A.CODPRO as reference
      ,REF.referencia as eanCode
      ,A.MODELO as supplier
      ,B.DESCRICAOLONGA as description
      ,A.UNID1 as unit
      ,I.QUANT as amount
      
    FROM
      PRODUTOCAD A
      INNER JOIN ITEMFILEST I ON (I.CODPRO=A.CODPRO) 
      INNER JOIN COMPLEMENTOPRODUTO B ON (B.CODPRO=A.CODPRO)
      INNER JOIN PRODREFCAD REF ON A.CODPRO = REF.CODPRO
      WHERE REF.referencia IN (${codes.map((code) => {
        return `'${code}'`;
      })})
      ${
        branch && branch.length > 0
          ? "AND I.FILIAL IN (" +
            branch.map((item) => {
              return `'${item}'`;
            }) +
            ")"
          : ""
      }
      `
    );
    return products;
  }
}
