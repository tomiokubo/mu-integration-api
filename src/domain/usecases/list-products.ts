import { Product } from "../models/product-model";

export type ListProductsFilterOptions = {
  reference?: string;
  code?: string;
};

export interface ListProducts {
  list: (filterOptions?: ListProductsFilterOptions) => Promise<Product[]>;
}
