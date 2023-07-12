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
    const containsFilter =
      filterOptions?.code ||
      filterOptions?.description ||
      filterOptions?.reference;
    const products = await DbHelper.getAppDataSource()?.manager.query(
      "SELECT P.codpro as reference, ref.referencia as eanCode, C.descricaolonga as description, P.unid1 as unit, " +
        "P.modelo as supplier, C.vendaminima as packageAmount, P.pesounit as weight, " +
        "C.alturacm as height, C.larguracm as width, C.comprimentocm as length, P.codigoncm as ncm, I.controlelote as batchControl " +
        "FROM produtocad P " +
        "INNER JOIN complementoproduto C " +
        "ON P.codpro = C.codpro " +
        "INNER JOIN itemfilest I " +
        "ON P.codpro = I.codpro " +
        "INNER JOIN PRODREFCAD ref " +
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
}
