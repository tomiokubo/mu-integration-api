import { Product } from "@/domain/models/product-model";
import { ListProductsByManyCodes } from "@/domain/usecases/list-products-by-many-codes";
import { ListProductsByManyCodesRepository } from "../protocols/db/product/list-products-by-many-codes-repository";

export class DbListProductsByManyCodes implements ListProductsByManyCodes {
  constructor(
    private readonly listProductsRepository: ListProductsByManyCodesRepository
  ) {}
  async list(codes: string[]): Promise<Product[]> {
    return await this.listProductsRepository.listByManyCodes(codes);
  }
}
