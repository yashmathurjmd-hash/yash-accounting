import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.company.findMany();
  }

  create(dto: CreateCompanyDto) {
    return this.prisma.company.create({
      data: {
        name: dto.name,
        shortName: dto.shortName,
        gstin: dto.gstin,
        financialYearStart: dto.financialYearStart ? new Date(dto.financialYearStart) : null,
        financialYearEnd: dto.financialYearEnd ? new Date(dto.financialYearEnd) : null,
        bookTypes: dto.bookTypes ?? ['PAKKA', 'KACCHA', 'MIXED'],
      },
    });
  }
}
