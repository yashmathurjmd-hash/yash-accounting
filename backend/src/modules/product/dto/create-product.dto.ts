export class CreateProductDto {
  companyId: string;
  code: string;
  name: string;
  hsnCode?: string;
  unitId?: string;
  gstRate?: number;
  purchaseRate?: number;
  saleRate?: number;
  mrp?: number;
}
