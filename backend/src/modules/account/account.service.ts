import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(companyId: string) {
    return this.prisma.account.findMany({ where: { companyId } });
  }

  create(dto: CreateAccountDto) {
    return this.prisma.account.create({
      data: {
        companyId: dto.companyId,
        groupId: dto.groupId,
        code: dto.code,
        name: dto.name,
        accountType: dto.accountType,
        gstin: dto.gstin,
        openingBalance: dto.openingBalance ?? 0,
        balanceType: dto.balanceType ?? 'DR',
      },
    });
  }
}
