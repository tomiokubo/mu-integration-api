export interface CargoItem {
  itemReference: string;
  productReference: string;
  eanCode: string;
  totalAmount: number;
  invoiced?: boolean;
  batches?: CargoItemBatch[];
}

export interface CargoItemBatch {
  itemReference: string;
  batchReference: string;
  batch: string;
  amount: number;
}
