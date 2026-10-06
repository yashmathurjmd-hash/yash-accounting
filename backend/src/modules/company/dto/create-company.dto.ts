export class CreateCompanyDto {
  name: string;
  shortName?: string;
  gstin?: string;
  financialYearStart?: string;
  financialYearEnd?: string;
  bookTypes?: string[];
}
