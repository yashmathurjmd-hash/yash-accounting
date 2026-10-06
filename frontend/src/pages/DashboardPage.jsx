import { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic, Table } from 'antd';

export default function DashboardPage() {
  const [summary, setSummary] = useState({
    sales: 0,
    purchase: 0,
    outstanding: 0,
    gst: 0,
    stock: 0,
    cash: 0,
    bank: 0,
  });
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/dashboard')
      .then((res) => res.json())
      .then((data) => setSummary(data));

    fetch('http://localhost:4000/api/recent-vouchers')
      .then((res) => res.json())
      .then((data) => setRecent(data));
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Dashboard</h2>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6}><Card><Statistic title="Sales" value={summary.sales} precision={2} /></Card></Col>
        <Col xs={24} sm={12} md={8} lg={6}><Card><Statistic title="Purchase" value={summary.purchase} precision={2} /></Card></Col>
        <Col xs={24} sm={12} md={8} lg={6}><Card><Statistic title="Outstanding" value={summary.outstanding} precision={2} /></Card></Col>
        <Col xs={24} sm={12} md={8} lg={6}><Card><Statistic title="GST" value={summary.gst} precision={2} /></Card></Col>
        <Col xs={24} sm={12} md={8} lg={6}><Card><Statistic title="Cash" value={summary.cash} precision={2} /></Card></Col>
        <Col xs={24} sm={12} md={8} lg={6}><Card><Statistic title="Bank" value={summary.bank} precision={2} /></Card></Col>
        <Col xs={24} sm={12} md={8} lg={6}><Card><Statistic title="Stock" value={summary.stock} /></Card></Col>
      </Row>

      <div style={{ marginTop: 30 }}>
        <Card title="Recent Vouchers">
          <Table
            columns={[
              { title: 'Type', dataIndex: 'type', key: 'type' },
              { title: 'Voucher No', dataIndex: 'no', key: 'no' },
              { title: 'Party', dataIndex: 'party', key: 'party' },
              { title: 'Amount', dataIndex: 'amount', key: 'amount', render: (v) => `₹${v}` },
              { title: 'Date', dataIndex: 'date', key: 'date' },
            ]}
            dataSource={recent}
            pagination={false}
          />
        </Card>
      </div>
    </div>
  );
}
