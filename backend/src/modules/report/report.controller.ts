import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('ledger')
  ledger(@Query('companyId') companyId: string) {
    return this.reportService.ledgerReport(companyId);
  }

  @Get('stock')
  stock(@Query('companyId') companyId: string) {
    return this.reportService.stockReport(companyId);
  }

  @Get('gst')
  gst(@Query('companyId') companyId: string) {
    return this.reportService.gstReport(companyId);
  }
}
