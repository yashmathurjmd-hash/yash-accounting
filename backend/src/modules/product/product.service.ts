import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(companyId: string) {
    return this.prisma.product.findMany({ where: { companyId } });
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
}
