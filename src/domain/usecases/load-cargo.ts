import { Cargo } from "../models/cargo-model";

export interface LoadCargo {
  load: (cargoNumber: string) => Promise<Cargo>;
}
