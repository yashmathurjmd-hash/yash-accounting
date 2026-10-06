import { Card, Table, Tabs } from 'antd';

const tabs = [{ key: 'ledger', label: 'Ledger' }, { key: 'trial', label: 'Trial Balance' }, { key: 'gst', label: 'GST' }, { key: 'stock', label: 'Stock' }];

const rows = [
  { key: '1', report: 'Ledger', description: 'Party and account-wise ledger' },
  { key: '2', report: 'Day Book', description: 'Daily voucher summary' },
  { key: '3', report: 'Trial Balance', description: 'Debit-credit matching report' },
  { key: '4', report: 'P&L', description: 'Profit and loss statement' },
  { key: '5', report: 'Balance Sheet', description: 'Assets and liabilities report' },
  { key: '6', report: 'GST Report', description: 'Tax summary and registers' },
];

export default function ReportsPage() {
  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Reports</h2>
      <Card>
        <Tabs items={tabs} />
        <div style={{ marginTop: 20 }}>
          <Table
            columns={[
              { title: 'Report', dataIndex: 'report', key: 'report' },
              { title: 'Description', dataIndex: 'description', key: 'description' },
            ]}
            dataSource={rows}
            pagination={false}
          />
        </div>
      </Card>
    </div>
  );
}
