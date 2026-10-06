import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}

  ledgerReport(companyId: string) {
    return this.prisma.ledgerEntry.findMany({
      where: { companyId },
      include: { account: true },
    });
  }

  stockReport(companyId: string) {
    return this.prisma.stockBalance.findMany({
      where: { companyId },
      include: { product: true },
    });
  }

  gstReport(companyId: string) {
    return this.prisma.gstEntry.findMany({
      where: { companyId },
    });
  }
}
