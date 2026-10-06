import { Card, Table } from 'antd';

const rows = [
  { key: '1', name: 'Dealer', value: '12' },
  { key: '2', name: 'Store IDs', value: '34' },
  { key: '3', name: 'Subscriptions', value: '6' },
  { key: '4', name: 'Backup Status', value: 'Healthy' },
  { key: '5', name: 'Sync Status', value: 'Online' },
  { key: '6', name: 'License Status', value: 'Active' },
];

export default function AdminPage() {
  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Admin / License</h2>
      <Card>
        <Table
          columns={[
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Value', dataIndex: 'value', key: 'value' },
          ]}
          dataSource={rows}
          pagination={false}
        />
      </Card>
    </div>
  );
}
