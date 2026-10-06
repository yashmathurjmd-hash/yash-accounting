export class UpdateVoucherDto {
  bookType?: 'PAKKA' | 'KACCHA' | 'MIXED';
  voucherType?: string;
  voucherNo?: string;
  voucherDate?: string;
  partyId?: string;
  narration?: string;
  items?: any[];
}
