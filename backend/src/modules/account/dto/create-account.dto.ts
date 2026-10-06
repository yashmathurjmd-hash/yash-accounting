export class CreateAccountDto {
  companyId: string;
  groupId?: string;
  code: string;
  name: string;
  accountType?: string;
  gstin?: string;
  openingBalance?: number;
  balanceType?: 'DR' | 'CR';
}
