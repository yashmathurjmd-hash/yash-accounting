import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary(companyId: string) {
    const [salesResult, purchaseResult, gstResult, stockResult, outstandingResult] = await Promise.all([
      this.prisma.voucher.groupBy({
        by: ['companyId'],
        where: {
          companyId,
          voucherType: {
            in: ['SALES', 'SALE', 'INVOICE'],
          },
        },
        _sum: { totalAmount: true },
      }),
      this.prisma.voucher.groupBy({
        by: ['companyId'],
        where: {
          companyId,
          voucherType: {
            in: ['PURCHASE', 'PUR', 'BILL'],
          },
        },
        _sum: { totalAmount: true },
      }),
      this.prisma.gstEntry.groupBy({
        by: ['companyId'],
        where: { companyId },
        _sum: { taxAmount: true },
      }),
      this.prisma.stockBalance.groupBy({
        by: ['companyId'],
        where: { companyId },
        _sum: { quantity: true },
      }),
      this.prisma.partyOutstanding.groupBy({
        by: ['companyId'],
        where: { companyId, status: 'OPEN' },
        _sum: { outstandingAmount: true },
      }),
    ]);

    const sales = salesResult[0]?._sum.totalAmount ?? 0;
    const purchase = purchaseResult[0]?._sum.totalAmount ?? 0;
    const gst = gstResult[0]?._sum.taxAmount ?? 0;
    const stock = stockResult[0]?._sum.quantity ?? 0;
    const outstanding = outstandingResult[0]?._sum.outstandingAmount ?? 0;

    const cashAccounts = await this.prisma.account.findMany({
      where: { companyId, name: { contains: 'Cash', mode: 'insensitive' } },
      select: { id: true, name: true, openingBalance: true },
    });

    const bankAccounts = await this.prisma.account.findMany({
      where: { companyId, name: { contains: 'Bank', mode: 'insensitive' } },
      select: { id: true, name: true, openingBalance: true },
    });

    const cash = cashAccounts.reduce((sum, account) => sum + Number(account.openingBalance || 0), 0);
    const bank = bankAccounts.reduce((sum, account) => sum + Number(account.openingBalance || 0), 0);

    return {
      sales: Number(sales.toFixed(2)),
      purchase: Number(purchase.toFixed(2)),
      outstanding: Number(outstanding.toFixed(2)),
      gst: Number(gst.toFixed(2)),
      stock: Number(stock.toFixed(2)),
      cash: Number(cash.toFixed(2)),
      bank: Number(bank.toFixed(2)),
    };
  }

  async getRecentVouchers(companyId: string) {
    const vouchers = await this.prisma.voucher.findMany({
      where: { companyId },
      include: { party: true },
      orderBy: { voucherDate: 'desc' },
      take: 5,
    });

    return vouchers.map((voucher) => ({
      id: voucher.id,
      type: voucher.voucherType,
      no: voucher.voucherNo,
      party: voucher.party?.name ?? 'N/A',
      amount: Number(voucher.totalAmount.toFixed(2)),
      date: voucher.voucherDate.toISOString().slice(0, 10),
    }));
  }
}
