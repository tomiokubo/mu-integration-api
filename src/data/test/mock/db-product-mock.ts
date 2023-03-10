import { ListProductsRepository } from "@/data/protocols/db/product/list-products-repository";
import { Product } from "@/domain/models/product-model";

import { ListProductsFilterOptions } from "@/domain/usecases/list-products";

export class ListProductsRepositorySpy implements ListProductsRepository {
  filterOptions?: ListProductsFilterOptions;
  result: Product[] = [];
  async list(
    filterOptions?: ListProductsFilterOptions | undefined
  ): Promise<Product[]> {
    this.filterOptions = filterOptions;
    return this.result;
  }
}
