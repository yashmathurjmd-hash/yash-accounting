import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateVoucherItemDto {
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  unitPrice: number;

  @IsNotEmpty()
  gstRate: number;
}

export class CreateVoucherDto {
  @IsNotEmpty()
  companyId: string;

  @IsNotEmpty()
  @IsEnum(['PAKKA', 'KACCHA', 'MIXED'])
  bookType: 'PAKKA' | 'KACCHA' | 'MIXED';

  @IsNotEmpty()
  voucherType: string;

  @IsNotEmpty()
  voucherNo: string;

  @IsNotEmpty()
  voucherDate: string;

  @IsNotEmpty()
  partyId: string;

  @IsOptional()
  @IsString()
  referenceNo?: string;

  @IsOptional()
  @IsString()
  narration?: string;

  @IsArray()
  items: CreateVoucherItemDto[];
}
