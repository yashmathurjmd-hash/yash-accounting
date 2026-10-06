const express = require('express');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const dashboardSummary = {
  sales: 125000,
  purchase: 98000,
  outstanding: 26000,
  gst: 18500,
  stock: 425,
  cash: 57000,
  bank: 240000,
};

const recentVouchers = [
  { id: 'V-01', type: 'Sales', no: 'INV-1001', party: 'ABC Traders', amount: 55600, date: '06 Oct 2026' },
  { id: 'V-02', type: 'Purchase', no: 'PUR-320', party: 'Mohan Industries', amount: 41000, date: '05 Oct 2026' },
  { id: 'V-03', type: 'Payment', no: 'PAY-105', party: 'HDFC Bank', amount: 25000, date: '04 Oct 2026' },
];

const masters = [
  { name: 'Company', count: 3 },
  { name: 'Account / Party', count: 145 },
  { name: 'Group', count: 32 },
  { name: 'Product / Item', count: 420 },
  { name: 'GST Master', count: 18 },
];

const reports = [
  { report: 'Ledger', description: 'Party and account-wise ledger' },
  { report: 'Day Book', description: 'Daily voucher summary' },
  { report: 'Trial Balance', description: 'Debit-credit matching report' },
  { report: 'P&L', description: 'Profit and loss statement' },
  { report: 'GST Report', description: 'Tax summary and registers' },
  { report: 'Stock', description: 'Inventory movement records' },
];

const adminRows = [
  { name: 'Dealer', value: '12' },
  { name: 'Store IDs', value: '34' },
  { name: 'Subscriptions', value: '6' },
  { name: 'Backup Status', value: 'Healthy' },
  { name: 'Sync Status', value: 'Online' },
  { name: 'License Status', value: 'Active' },
];

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'YASH Accounting V50' });
});

app.get('/api/dashboard', (req, res) => {
  res.json(dashboardSummary);
});

app.get('/api/recent-vouchers', (req, res) => {
  res.json(recentVouchers);
});

app.get('/api/masters', (req, res) => {
  res.json(masters);
});

app.get('/api/reports', (req, res) => {
  res.json(reports);
});

app.get('/api/admin', (req, res) => {
  res.json(adminRows);
});

app.get('/api/books', (req, res) => {
  res.json(['PAKKA', 'KACCHA', 'MIXED']);
});

app.post('/api/vouchers/save', (req, res) => {
  const { voucherNo, voucherType, bookType } = req.body || {};

  res.json({
    ok: true,
    message: 'Voucher saved successfully',
    voucherNo,
    voucherType,
    bookType,
  });
});

app.listen(port, () => {
  console.log(`YASH Accounting backend running at http://localhost:${port}`);
});
