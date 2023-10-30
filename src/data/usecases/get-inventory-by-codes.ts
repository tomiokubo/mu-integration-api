import { Product } from "@/domain/models/product-model";
import { GetInventoryByCodes } from "@/domain/usecases/get-inventory-by-codes";
import { GetInventoryByCodesRepository } from "../protocols/db/product/get-inventory-by-codes";

export class DbGetInventoryByCodes implements GetInventoryByCodes {
  constructor(
    private readonly getInventoryByCodesRepository: GetInventoryByCodesRepository
  ) {}
  async getInventory(codes: string[], branch?: string[]): Promise<Product[]> {
    return await this.getInventoryByCodesRepository.getInventoryByCodes(
      codes,
      branch
    );
  }
}
