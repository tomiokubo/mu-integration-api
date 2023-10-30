import { Product } from "@/domain/models/product-model";

export interface GetInventoryByCodesRepository {
  getInventoryByCodes: (
    codes: string[],
    branch?: string[]
  ) => Promise<Product[]>;
}
