import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  findAll(@Query('companyId') companyId: string) {
    return this.accountService.findAll(companyId);
  }

  @Post()
  create(@Body() dto: CreateAccountDto) {
    return this.accountService.create(dto);
  }
}
