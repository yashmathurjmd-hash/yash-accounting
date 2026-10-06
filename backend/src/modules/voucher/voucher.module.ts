import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { VoucherController } from './voucher.controller';
import { VoucherService } from './voucher.service';

@Module({
  controllers: [VoucherController],
  providers: [VoucherService, PrismaService],
})
export class VoucherModule {}
