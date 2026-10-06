import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('vouchers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Get()
  @Roles('ADMIN', 'ACCOUNTANT')
  findAll(@Query('companyId') companyId: string) {
    return this.voucherService.findAll(companyId);
  }

  @Get(':id')
  @Roles('ADMIN', 'ACCOUNTANT')
  findOne(@Param('id') id: string) {
    return this.voucherService.findOne(id);
  }

  @Post()
  @Roles('ADMIN', 'ACCOUNTANT')
  create(@Body() dto: CreateVoucherDto) {
    return this.voucherService.create(dto);
  }

  @Put(':id')
  @Roles('ADMIN', 'ACCOUNTANT')
  update(@Param('id') id: string, @Body() dto: Partial<CreateVoucherDto>) {
    return this.voucherService.update(id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.voucherService.remove(id);
  }
}
