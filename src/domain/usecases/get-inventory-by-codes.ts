import { Product } from "../models/product-model";

export interface GetInventoryByCodes {
  getInventory: (codes: string[], branch?: string[]) => Promise<Product[]>;
}
