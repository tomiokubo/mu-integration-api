import { Cargo } from "@/domain/models/cargo-model";
import { LoadCargo } from "@/domain/usecases/load-cargo";
import {
  LoadCargoRepository,
  RawCargo,
} from "../protocols/db/cargo/load-cargo-repository";
import { LoadCargoBatchesRepository } from "../protocols/db/cargo/load-cargo-batches-repository";
import { toCargo } from "./utils/to-cargo";

export class DbLoadCargo implements LoadCargo {
  constructor(
    private readonly loadCargoRepository: LoadCargoRepository,
    private readonly loadCargoBatchesRepository: LoadCargoBatchesRepository
  ) {}
  async load(cargoNumber: string): Promise<Cargo> {
    let rawCargos = await this.loadCargoRepository.load(cargoNumber);

    rawCargos = rawCargos.reduce((acc: RawCargo[], raw) => {
      const existing = acc.find((i) => i.itemReference === raw.itemReference);
      if (!existing) {
        acc.push(raw);
      }
      return acc;
    }, []);

    const cargo = toCargo(rawCargos);

    const items: string[] = [];

    cargo.cargoItems.map((item) => {
      items.push(item.itemReference);
    });

    const rawCargoBatchesList =
      await this.loadCargoBatchesRepository.loadBatches(items);

    rawCargoBatchesList.map((raw) => {
      const matchingItem = cargo.cargoItems.find(
        (item) => item.itemReference === raw.itemReference
      );
      if (matchingItem) {
        matchingItem.batches?.push(raw);
      }
    });
    return cargo;
  }
}
