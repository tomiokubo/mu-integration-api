export type RawCargoBatches = {
  itemReference: string;
  batchReference: string;
  batch: string;
  amount: number;
};

export interface LoadCargoBatchesRepository {
  loadBatches: (itemReferences: string[]) => Promise<RawCargoBatches[]>;
}
