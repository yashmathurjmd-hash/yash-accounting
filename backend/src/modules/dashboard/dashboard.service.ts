import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  getSummary() {
    return {
      sales: 125000,
      purchase: 98000,
      outstanding: 26000,
      gst: 18500,
      stock: 425,
      cash: 57000,
      bank: 240000,
    };
  }

  getRecentVouchers() {
    return [
      { id: 'V-01', type: 'Sales', no: 'INV-1001', party: 'ABC Traders', amount: 55600, date: '06 Oct 2026' },
      { id: 'V-02', type: 'Purchase', no: 'PUR-320', party: 'Mohan Industries', amount: 41000, date: '05 Oct 2026' },
      { id: 'V-03', type: 'Payment', no: 'PAY-105', party: 'HDFC Bank', amount: 25000, date: '04 Oct 2026' },
    ];
  }
}
