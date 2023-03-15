import { ListProductsRepository } from "@/data/protocols/db/product/list-products-repository";
import { Product } from "@/domain/models/product-model";
import { ListProductsFilterOptions } from "@/domain/usecases/list-products";
import { DbHelper } from "../db-helper";

export class ProductRepository implements ListProductsRepository {
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
        "INNER JOIN PRODREFCAD ref " +
        "ON P.codpro = ref.codpro " +
        "WHERE ref.referencia = @0 AND I.filial = 2",
      [filterOptions?.code]
    );
    return products;
  }
}
