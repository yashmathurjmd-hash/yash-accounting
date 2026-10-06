import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary')
  getSummary(@Query('companyId') companyId: string) {
    return this.dashboardService.getSummary(companyId);
  }

  @Get('recent-vouchers')
  getRecentVouchers(@Query('companyId') companyId: string) {
    return this.dashboardService.getRecentVouchers(companyId);
  }
}
