import {
  ListProducts,
  ListProductsFilterOptions,
} from "@/domain/usecases/list-products";
import { badRequest, noContent, ok, serverError } from "../helpers";
import { Controller, HttpResponse } from "../protocols";
import { Validation } from "../protocols/validation";

export class ListProductsController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly listProducts: ListProducts
  ) {}
  async handle(request?: ListProductsFilterOptions): Promise<HttpResponse> {
    const error = this.validation.validate(request);
    if (error) return badRequest(error);
    try {
      const products = await this.listProducts.list(request);
      if (products.length === 0) return noContent();
      return ok(products);
    } catch (error) {
      return serverError(error);
    }
  }
}
