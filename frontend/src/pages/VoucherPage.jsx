import { Button, Card, DatePicker, Form, Input, Select, Table, message } from 'antd';
import { useEffect } from 'react';
import { useAppStore } from '../store';

const voucherOptions = [
  'Sales', 'Purchase', 'Sales Return', 'Purchase Return', 'Estimate', 'Order', 'Challan', 'Receipt', 'Payment', 'Contra', 'Journal', 'Expense'
];
const bookOptions = ['PAKKA', 'KACCHA', 'MIXED'];

const dataSource = [
  { key: '1', itemName: 'Laptop', qty: 1, rate: 52000, amount: 52000 },
  { key: '2', itemName: 'Keyboard', qty: 2, rate: 1800, amount: 3600 },
];

export default function VoucherPage() {
  const { app, setBook } = useAppStore();

  useEffect(() => {
    const handle = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        message.success('Voucher Saved');
      }
      if (event.key === 'F10') {
        event.preventDefault();
        message.info('Voucher List opened');
      }
    };

    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Voucher Entry</h2>

      <Card>
        <Form layout="vertical">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(180px, 1fr))', gap: 16 }}>
            <Form.Item label="Company">
              <Select defaultValue={app.companyName} options={[{ value: app.companyName, label: app.companyName }]} />
            </Form.Item>
            <Form.Item label="Book Type">
              <Select value={app.selectedBook} onChange={(value) => setBook(value)} options={bookOptions.map((v) => ({ value: v, label: v }))} />
            </Form.Item>
            <Form.Item label="Voucher Type">
              <Select defaultValue="Sales" options={voucherOptions.map((v) => ({ value: v, label: v }))} />
            </Form.Item>
            <Form.Item label="Voucher No">
              <Input defaultValue="INV-1001" />
            </Form.Item>
            <Form.Item label="Date">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="Party">
              <Input defaultValue="ABC Traders" />
            </Form.Item>
            <Form.Item label="Reference">
              <Input defaultValue="REF-01" />
            </Form.Item>
            <Form.Item label="Book">
              <Select defaultValue={app.selectedBook} options={bookOptions.map((v) => ({ value: v, label: v }))} />
            </Form.Item>
          </div>

          <div style={{ marginTop: 20 }}>
            <Table
              columns={[
                { title: 'Item', dataIndex: 'itemName', key: 'itemName' },
                { title: 'Qty', dataIndex: 'qty', key: 'qty' },
                { title: 'Rate', dataIndex: 'rate', key: 'rate' },
                { title: 'Amount', dataIndex: 'amount', key: 'amount' },
              ]}
              dataSource={dataSource}
              pagination={false}
            />
          </div>

          <div style={{ marginTop: 20 }}>
            <Form.Item label="Narration">
              <Input.TextArea rows={3} defaultValue="Sale of computer accessories" />
            </Form.Item>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
            <Button type="primary">Save (Ctrl + Enter)</Button>
            <Button>Save & New</Button>
            <Button>Print</Button>
            <Button>Voucher List (F10)</Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
