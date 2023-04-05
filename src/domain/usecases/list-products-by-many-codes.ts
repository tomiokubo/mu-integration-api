import { Product } from "../models/product-model";

export interface ListProductsByManyCodes {
  list: (codes: string[]) => Promise<Product[]>;
}
