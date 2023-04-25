import { RawCargo } from "@/data/protocols/db/cargo/load-cargo-repository";
import { CargoItem } from "@/domain/models/cargo-item";
import { Cargo } from "@/domain/models/cargo-model";

const toCargoItem = (rawCargo: RawCargo): CargoItem => {
  const { itemReference, productReference, eanCode, amount, invoiced } =
    rawCargo;
  const totalAmount = amount;
  return {
    itemReference,
    productReference,
    eanCode,
    totalAmount,
    invoiced: !!invoiced,
    batches: [],
  };
};

export const toCargo = (rawCargos: RawCargo[]): Cargo => {
  const {
    cargoReference,
    orderReference,
    clientName,
    clientCpf,
    cep,
    neighborhood,
    additionalInformation,
    propertyNumber,
    street,
    referencePoint,
    city,
    federalUnit,
  } = rawCargos[0];
  const cargoItems: CargoItem[] = rawCargos.map(toCargoItem);
  return {
    cargoReference,
    orderReference,
    clientName,
    clientCpf,
    cep,
    neighborhood,
    additionalInformation,
    propertyNumber,
    street,
    referencePoint,
    city,
    federalUnit,
    cargoItems,
  };
};
