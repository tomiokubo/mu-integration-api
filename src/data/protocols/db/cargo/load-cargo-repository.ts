export type RawCargo = {
  cargoReference: string;
  orderReference: string;
  productReference: string;
  eanCode: string;
  itemReference: string;
  amount: number;
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
  invoiced?: string;
};

export interface LoadCargoRepository {
  load: (cargoNumber: string) => Promise<RawCargo[]>;
}
