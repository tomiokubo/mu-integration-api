import { ListProductsByManyCodes } from "@/domain/usecases/list-products-by-many-codes";
import { badRequest, ok, serverError } from "../helpers";
import { Controller, HttpResponse } from "../protocols";
import { Validation } from "../protocols/validation";

export class ListProductsByManyCodesController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly listProducts: ListProductsByManyCodes
  ) { }
  async handle(request: { codes: string[] }): Promise<HttpResponse> {
    const error = this.validation.validate(request);
    if (error) return badRequest(error);
    try {
      const products = await this.listProducts.list(request.codes);
      return ok(products);
    } catch (error) {
      return serverError(error);
    }
  }
}
