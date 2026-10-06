import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';

const calcGST = (amount: number, gstRate: number) =>
  Number((amount * (gstRate / 100)).toFixed(2));

@Injectable()
export class VoucherService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(companyId: string) {
    return this.prisma.voucher.findMany({
      where: { companyId },
      include: { voucherItems: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.voucher.findUnique({
      where: { id },
      include: { voucherItems: true, ledger: true, stock: true, gst: true },
    });
  }

  async create(dto: CreateVoucherDto) {
    return this.prisma.$transaction(async (tx) => {
      const company = await tx.company.findUnique({ where: { id: dto.companyId } });
      if (!company) throw new BadRequestException('Company not found');

      const duplicate = await tx.voucher.findFirst({
        where: {
          companyId: dto.companyId,
          voucherType: dto.voucherType,
          voucherNo: dto.voucherNo,
        },
      });

      if (duplicate) throw new BadRequestException('Duplicate voucher number');

      const voucher = await tx.voucher.create({
        data: {
          companyId: dto.companyId,
          bookType: dto.bookType,
          voucherType: dto.voucherType,
          voucherNo: dto.voucherNo,
          voucherDate: new Date(dto.voucherDate),
          partyId: dto.partyId,
          referenceNo: dto.referenceNo,
          narration: dto.narration,
          totalAmount: 0,
          gstAmount: 0,
          status: 'POSTED',
          revisionNo: 1,
        },
      });

      let totalAmount = 0;
      let totalGst = 0;

      for (const item of dto.items) {
        const product = await tx.product.findUnique({ where: { id: item.productId } });
        if (!product) throw new BadRequestException(`Product not found: ${item.productId}`);

        const amount = Number((item.quantity * item.unitPrice).toFixed(2));
        const gstAmount = calcGST(amount, item.gstRate);

        totalAmount += amount;
        totalGst += gstAmount;

        await tx.voucherItem.create({
          data: {
            voucherId: voucher.id,
            productId: item.productId,
            description: product.name,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            amount,
            gstRate: item.gstRate,
            gstAmount: gstAmount,
            itemType: 'PRODUCT',
          },
        });

        const stockBalance = await tx.stockBalance.findFirst({
          where: { companyId: dto.companyId, productId: item.productId },
        });

        if (stockBalance) {
          await tx.stockBalance.update({
            where: { id: stockBalance.id },
            data: {
              quantity: Number((stockBalance.quantity - item.quantity).toFixed(3)),
              avgRate: item.unitPrice,
              updatedAt: new Date(),
            },
          });
        } else {
          await tx.stockBalance.create({
            data: {
              companyId: dto.companyId,
              productId: item.productId,
              quantity: Number((-item.quantity).toFixed(3)),
              avgRate: item.unitPrice,
              updatedAt: new Date(),
            },
          });
        }

        await tx.stockEntry.create({
          data: {
            companyId: dto.companyId,
            voucherId: voucher.id,
            productId: item.productId,
            warehouseId: null,
            quantity: Number((-item.quantity).toFixed(3)),
            rate: item.unitPrice,
            stockType: 'OUT',
            entryDate: new Date(dto.voucherDate),
          },
        });

        await tx.gstEntry.create({
          data: {
            companyId: dto.companyId,
            voucherId: voucher.id,
            gstType: 'CGST',
            taxAmount: Number((gstAmount / 2).toFixed(2)),
            accountId: dto.partyId,
          },
        });
      }

      await tx.voucher.update({
        where: { id: voucher.id },
        data: {
          totalAmount: Number(totalAmount.toFixed(2)),
          gstAmount: Number(totalGst.toFixed(2)),
          updatedAt: new Date(),
        },
      });

      await tx.ledgerEntry.create({
        data: {
          companyId: dto.companyId,
          voucherId: voucher.id,
          accountId: dto.partyId,
          entryDate: new Date(dto.voucherDate),
          drAmount: Number(totalAmount.toFixed(2)),
          crAmount: 0,
          narration: dto.narration ?? 'Voucher entry',
        },
      });

      await tx.ledgerEntry.create({
        data: {
          companyId: dto.companyId,
          voucherId: voucher.id,
          accountId: dto.partyId,
          entryDate: new Date(dto.voucherDate),
          drAmount: 0,
          crAmount: Number((totalAmount + totalGst).toFixed(2)),
          narration: 'Sales Revenue',
        },
      });

      await tx.partyOutstanding.create({
        data: {
          companyId: dto.companyId,
          partyId: dto.partyId,
          voucherId: voucher.id,
          outstandingAmount: Number((totalAmount + totalGst).toFixed(2)),
          dueDate: new Date(dto.voucherDate),
          status: 'OPEN',
        },
      });

      await tx.auditLog.create({
        data: {
          companyId: dto.companyId,
          entityType: 'VOUCHER',
          entityId: voucher.id,
          actionType: 'CREATE',
          oldValue: null,
          newValue: {
            voucherNo: dto.voucherNo,
            totalAmount: Number(totalAmount.toFixed(2)),
          },
          changedBy: null,
        },
      });

      return {
        success: true,
        voucherId: voucher.id,
        voucherNo: voucher.voucherNo,
        totalAmount: Number(totalAmount.toFixed(2)),
        gstAmount: Number(totalGst.toFixed(2)),
      };
    });
  }

  async update(id: string, dto: Partial<CreateVoucherDto>) {
    const existing = await this.prisma.voucher.findUnique({
      where: { id },
      include: {
        voucherItems: true,
        ledger: true,
        stock: true,
        gst: true,
      },
    });

    if (!existing) throw new BadRequestException('Voucher not found');

    for (const ledger of existing.ledger) {
      await this.prisma.ledgerEntry.delete({ where: { id: ledger.id } });
    }

    for (const gst of existing.gst) {
      await this.prisma.gstEntry.delete({ where: { id: gst.id } });
    }

    for (const stock of existing.stock) {
      await this.prisma.stockEntry.delete({ where: { id: stock.id } });
    }

    for (const item of existing.voucherItems) {
      await this.prisma.voucherItem.delete({ where: { id: item.id } });
    }

    await this.prisma.voucher.update({
      where: { id },
      data: {
        status: 'REVERSED',
        revisionNo: existing.revisionNo + 1,
      },
    });

    if (!dto.companyId || !dto.items) {
      throw new BadRequestException('Updated voucher requires companyId and items');
    }

    return this.create({
      companyId: dto.companyId,
      bookType: dto.bookType || existing.bookType,
      voucherType: dto.voucherType || existing.voucherType,
      voucherNo: dto.voucherNo || existing.voucherNo,
      voucherDate: dto.voucherDate || existing.voucherDate.toISOString(),
      partyId: dto.partyId || existing.partyId!,
      referenceNo: dto.referenceNo,
      narration: dto.narration || existing.narration || '',
      items: dto.items,
    });
  }

  async remove(id: string) {
    return this.prisma.voucher.delete({ where: { id } });
  }
}
