import { Controller, HttpResponse } from "../protocols";

import { ok, serverError } from "../helpers";

import { LoadFiscalConfig } from "@/domain/usecases/load-fiscal-config";

export class LoadFiscalConfigController implements Controller {
  constructor(private readonly loadFiscalConfig: LoadFiscalConfig) {}
  async handle(): Promise<HttpResponse> {
    try {
      const data = await this.loadFiscalConfig.load();

      return ok(data);
    } catch (error) {
      return serverError(error);
    }
  }
}
