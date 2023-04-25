import { Controller, HttpResponse } from "../protocols";
import { Validation } from "../protocols/validation";
import { badRequest, noContent, ok, serverError } from "../helpers";
import { LoadCargo } from "@/domain/usecases/load-cargo";

export class LoadCargoController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadCargo: LoadCargo
  ) {}
  async handle(request: { cargoReference: string }): Promise<HttpResponse> {
    const error = this.validation.validate(request);
    if (error) return badRequest(error);
    try {
      const cargo = await this.loadCargo.load(request.cargoReference);
      if (!cargo) return noContent();
      return ok(cargo);
    } catch (error) {
      return serverError(error);
    }
  }
}
