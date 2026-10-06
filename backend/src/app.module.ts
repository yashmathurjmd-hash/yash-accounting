import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { CompanyModule } from './modules/company/company.module';
import { AccountModule } from './modules/account/account.module';
import { ProductModule } from './modules/product/product.module';
import { VoucherModule } from './modules/voucher/voucher.module';
import { ReportModule } from './modules/report/report.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { SeedModule } from './modules/seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    CompanyModule,
    AccountModule,
    ProductModule,
    VoucherModule,
    ReportModule,
    DashboardModule,
    SeedModule,
  ],
})
export class AppModule {}
