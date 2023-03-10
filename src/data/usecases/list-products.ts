import { Product } from "@/domain/models/product-model";
import {
  ListProducts,
  ListProductsFilterOptions,
} from "@/domain/usecases/list-products";
import { ListProductsRepository } from "../protocols/db/product/list-products-repository";

export class DbListProducts implements ListProducts {
  constructor(
    private readonly loadProductsRepository: ListProductsRepository
  ) {}
  async list(
    filterOptions?: ListProductsFilterOptions | undefined
  ): Promise<Product[]> {
    return await this.loadProductsRepository.list(filterOptions);
  }
}
