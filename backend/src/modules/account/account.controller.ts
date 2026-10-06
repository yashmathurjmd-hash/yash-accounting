import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('accounts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @Roles('ADMIN', 'ACCOUNTANT')
  findAll(@Query('companyId') companyId: string) {
    return this.accountService.findAll(companyId);
  }

  @Get(':id')
  @Roles('ADMIN', 'ACCOUNTANT')
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(id);
  }

  @Post()
  @Roles('ADMIN', 'ACCOUNTANT')
  create(@Body() dto: CreateAccountDto) {
    return this.accountService.create(dto);
  }

  @Put(':id')
  @Roles('ADMIN', 'ACCOUNTANT')
  update(@Param('id') id: string, @Body() dto: Partial<CreateAccountDto>) {
    return this.accountService.update(id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.accountService.remove(id);
  }
}
