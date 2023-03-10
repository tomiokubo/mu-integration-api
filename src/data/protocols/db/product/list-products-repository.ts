import { Product } from "@/domain/models/product-model";
import { ListProductsFilterOptions } from "@/domain/usecases/list-products";

export interface ListProductsRepository {
  list: (filterOptions?: ListProductsFilterOptions) => Promise<Product[]>;
}
