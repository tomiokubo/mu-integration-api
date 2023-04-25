import { CargoItem } from "./cargo-item";

export interface Cargo {
  cargoReference: string;
  orderReference: string;
  clientName: string;
  clientCpf: string;
  cep: string;
  neighborhood: string;
  additionalInformation: string;
  propertyNumber: string;
  street: string;
  referencePoint: string;
  city: string;
  federalUnit: string;
  cargoItems: CargoItem[];
}
