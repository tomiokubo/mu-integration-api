import { Product } from "@/domain/models/product-model";

export interface ListProductsByManyCodesRepository {
  listByManyCodes: (codes: string[]) => Promise<Product[]>;
}
