import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SeedService {
  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    const company = await this.prisma.company.upsert({
      where: { id: 'default-company' },
      update: {},
      create: {
        id: 'default-company',
        name: 'YASH Pvt Ltd',
        shortName: 'YASH',
        gstin: '27ABCDE1234F1Z5',
        financialYearStart: new Date('2026-04-01'),
        financialYearEnd: new Date('2027-03-31'),
        bookTypes: ['PAKKA', 'KACCHA', 'MIXED'],
      },
    });

    const passwordHash = await bcrypt.hash('admin123', 10);

    const user = await this.prisma.user.upsert({
      where: { email: 'admin@yash.com' },
      update: {},
      create: {
        companyId: company.id,
        name: 'Admin User',
        email: 'admin@yash.com',
        passwordHash,
        role: 'ADMIN',
      },
    });

    return {
      message: 'Seed complete',
      companyId: company.id,
      userId: user.id,
      email: user.email,
      password: 'admin123',
    };
  }
}
