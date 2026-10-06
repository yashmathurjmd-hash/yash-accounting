import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(companyId: string) {
    return this.prisma.product.findMany({
      where: { companyId },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  create(dto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        companyId: dto.companyId,
        code: dto.code,
        name: dto.name,
        hsnCode: dto.hsnCode,
        unitId: dto.unitId,
        gstRate: dto.gstRate ?? 0,
        purchaseRate: dto.purchaseRate ?? 0,
        saleRate: dto.saleRate ?? 0,
        mrp: dto.mrp ?? 0,
      },
    });
  }

  async update(id: string, dto: Partial<CreateProductDto>) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new BadRequestException('Product not found');

    return this.prisma.product.update({
      where: { id },
      data: {
        ...dto,
        gstRate: dto.gstRate ?? product.gstRate,
        purchaseRate: dto.purchaseRate ?? product.purchaseRate,
        saleRate: dto.saleRate ?? product.saleRate,
        mrp: dto.mrp ?? product.mrp ?? 0,
      },
    });
  }

  async remove(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new BadRequestException('Product not found');

    return this.prisma.product.delete({ where: { id } });
  }
}
