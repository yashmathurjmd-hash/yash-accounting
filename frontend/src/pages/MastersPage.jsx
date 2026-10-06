import { Card, Table } from 'antd';

const masterRows = [
  { key: '1', name: 'Company', count: 3 },
  { key: '2', name: 'Account / Party', count: 145 },
  { key: '3', name: 'Group', count: 32 },
  { key: '4', name: 'Product / Item', count: 420 },
  { key: '5', name: 'Unit', count: 12 },
  { key: '6', name: 'HSN / SAC', count: 114 },
  { key: '7', name: 'GST Master', count: 18 },
  { key: '8', name: 'Bank / Cash', count: 14 },
];

export default function MastersPage() {
  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Masters</h2>
      <Card>
        <Table
          columns={[
            { title: 'Master', dataIndex: 'name', key: 'name' },
            { title: 'Count', dataIndex: 'count', key: 'count' },
          ]}
          dataSource={masterRows}
          pagination={false}
        />
      </Card>
    </div>
  );
}
