export interface Product {
  id?: number;
  reference: string;
  code: string;
  description: string;
  unit: string;
  supplier: string;
  packageAmount: number;
  weight: number;
  height: number;
  width: number;
  length: number;
  ncm: string;
  batchControl: boolean;
}
