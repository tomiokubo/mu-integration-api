import { Product } from "@/domain/models/product-model";
import {
  ListProducts,
  ListProductsFilterOptions,
} from "@/domain/usecases/list-products";

export class ListProductsSpy implements ListProducts {
  filterOptions?: ListProductsFilterOptions;
  result: Product[] = [];
  async list(filterOptions?: ListProductsFilterOptions): Promise<Product[]> {
    this.filterOptions = filterOptions;
    return this.result;
  }
}
