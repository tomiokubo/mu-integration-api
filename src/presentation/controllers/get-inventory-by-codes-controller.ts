import { badRequest, noContent, ok, serverError } from "../helpers";
import { Controller, HttpResponse } from "../protocols";
import { Validation } from "../protocols/validation";
import { GetInventoryByCodes } from "@/domain/usecases/get-inventory-by-codes";

export class GetInventoryByCodesController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly getInventory: GetInventoryByCodes
  ) {}
  async handle(request: {
    codes: string[];
    branch: string[];
  }): Promise<HttpResponse> {
    console.log(request);
    try {
      const products = await this.getInventory.getInventory(
        request.codes,
        request.branch
      );
      return ok(products);
    } catch (error) {
      return serverError(error);
    }
  }
}
