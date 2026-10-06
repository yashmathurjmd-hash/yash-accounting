import { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Card, DatePicker, Form, Input, Modal, Popconfirm, Select, Space, Table, Tag, message } from 'antd';
import { useAppStore } from '../store';

const voucherOptions = ['Sales', 'Purchase', 'Sales Return', 'Purchase Return', 'Estimate', 'Order', 'Challan', 'Receipt', 'Payment', 'Contra', 'Journal', 'Expense'];
const bookOptions = ['PAKKA', 'KACCHA', 'MIXED'];
const PARTY_STORAGE_KEY = 'yash-accounting-parties-v1';
const defaultParties = [
  { id: 'party-1', name: 'ABC Traders', city: 'Mumbai', group: 'Sundry Debtor' },
  { id: 'party-2', name: 'Maharashtra Steel', city: 'Thane', group: 'Sundry Creditor' },
  { id: 'party-3', name: 'Shree Enterprises', city: 'Kalyan', group: 'Sundry Creditor' },
];
const dataSource = [
  { key: '1', itemName: 'Laptop', qty: 1, rate: 52000, amount: 52000 },
  { key: '2', itemName: 'Keyboard', qty: 2, rate: 1800, amount: 3600 },
];

function loadParties() {
  try {
    const stored = window.localStorage.getItem(PARTY_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return defaultParties;
}

export default function VoucherPage() {
  const { app, setBook } = useAppStore();
  const [form] = Form.useForm();
  const [parties, setParties] = useState(loadParties);
  const [partyOpen, setPartyOpen] = useState(false);
  const [partySearch, setPartySearch] = useState('');
  const [selectedPartyIndex, setSelectedPartyIndex] = useState(0);
  const [editingParty, setEditingParty] = useState(null);
  const [partyInfo, setPartyInfo] = useState(null);
  const partySearchRef = useRef(null);
  const referenceRef = useRef(null);

  const filteredParties = useMemo(() => {
    const query = partySearch.trim().toLowerCase();
    if (!query) return parties;
    return parties.filter((party) =>
      [party.name, party.city, party.group].some((value) => String(value || '').toLowerCase().includes(query)),
    );
  }, [parties, partySearch]);

  useEffect(() => {
    window.localStorage.setItem(PARTY_STORAGE_KEY, JSON.stringify(parties));
  }, [parties]);

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

  const openPartyList = () => {
    setPartySearch('');
    setSelectedPartyIndex(0);
    setPartyOpen(true);
    window.setTimeout(() => partySearchRef.current?.focus(), 0);
  };

  const selectParty = (party) => {
    form.setFieldsValue({ party: party.name });
    setPartyOpen(false);
    window.setTimeout(() => referenceRef.current?.focus(), 0);
  };

  const saveParty = (values) => {
    if (editingParty?.id) {
      setParties((current) => current.map((party) => party.id === editingParty.id ? { ...party, ...values } : party));
      message.success('Party updated');
    } else {
      setParties((current) => [...current, { id: `party-${Date.now()}`, ...values }]);
      message.success('Party added');
    }
    setEditingParty(null);
  };

  const deleteParty = (id) => {
    setParties((current) => current.filter((party) => party.id !== id));
    setSelectedPartyIndex(0);
    message.success('Party deleted');
  };

  const handlePartyKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedPartyIndex((index) => Math.min(index + 1, Math.max(filteredParties.length - 1, 0)));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedPartyIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const party = filteredParties[selectedPartyIndex];
      if (party) selectParty(party);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setPartyOpen(false);
    }
  };

  const selectedParty = filteredParties[selectedPartyIndex];

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Voucher Entry</h2>
      <Card>
        <Form form={form} layout="vertical" initialValues={{ party: '', reference: 'REF-01', narration: 'Sale of computer accessories' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(180px, 1fr))', gap: 16 }}>
            <Form.Item label="Company"><Select defaultValue={app.companyName} options={[{ value: app.companyName, label: app.companyName }]} /></Form.Item>
            <Form.Item label="Book Type"><Select value={app.selectedBook} onChange={setBook} options={bookOptions.map((v) => ({ value: v, label: v }))} /></Form.Item>
            <Form.Item label="Voucher Type"><Select defaultValue="Sales" options={voucherOptions.map((v) => ({ value: v, label: v }))} /></Form.Item>
            <Form.Item label="Voucher No"><Input defaultValue="INV-1001" /></Form.Item>
            <Form.Item label="Date"><DatePicker style={{ width: '100%' }} /></Form.Item>
            <Form.Item label="Supplier / Party" name="party">
              <Input placeholder="Press Enter to open Party List" onPressEnter={openPartyList} suffix={<Button type="link" size="small" onClick={openPartyList}>List</Button>} />
            </Form.Item>
            <Form.Item label="Reference" name="reference"><Input ref={referenceRef} /></Form.Item>
            <Form.Item label="Book"><Select defaultValue={app.selectedBook} options={bookOptions.map((v) => ({ value: v, label: v }))} /></Form.Item>
          </div>

          <Table
            style={{ marginTop: 20 }}
            columns={[
              { title: 'Item', dataIndex: 'itemName', key: 'itemName' },
              { title: 'Qty', dataIndex: 'qty', key: 'qty' },
              { title: 'Rate', dataIndex: 'rate', key: 'rate' },
              { title: 'Amount', dataIndex: 'amount', key: 'amount' },
            ]}
            dataSource={dataSource}
            pagination={false}
          />

          <Form.Item label="Narration" name="narration" style={{ marginTop: 20 }}><Input.TextArea rows={3} /></Form.Item>

          <Space>
            <Button type="primary" onClick={() => message.success('Voucher Saved')}>Save (Ctrl + Enter)</Button>
            <Button>Save & New</Button>
            <Button>Print</Button>
            <Button onClick={() => message.info('Voucher List opened')}>Voucher List (F10)</Button>
          </Space>
        </Form>
      </Card>

      <Modal title="Party List" open={partyOpen} onCancel={() => setPartyOpen(false)} width={900} footer={null} destroyOnClose>
        <Input
          ref={partySearchRef}
          value={partySearch}
          onChange={(event) => { setPartySearch(event.target.value); setSelectedPartyIndex(0); }}
          onKeyDown={handlePartyKeyDown}
          placeholder="Search Party Name / City / Group"
          autoComplete="off"
        />
        <Space wrap style={{ margin: '12px 0' }}>
          <Button type="primary" onClick={() => setEditingParty({ name: '', city: '', group: 'Sundry Creditor' })}>Add</Button>
          <Button disabled={!selectedParty} onClick={() => setEditingParty({ ...selectedParty })}>Edit</Button>
          <Popconfirm title="Delete selected party?" onConfirm={() => selectedParty && deleteParty(selectedParty.id)}>
            <Button danger disabled={!selectedParty}>Delete</Button>
          </Popconfirm>
          <Button disabled={!selectedParty} onClick={() => setPartyInfo(selectedParty)}>Info</Button>
          <Button disabled={!selectedParty} onClick={() => message.info(`Ledger: ${selectedParty?.name || ''}`)}>Ledger</Button>
          <Button onClick={() => setPartyOpen(false)}>Esc / Close</Button>
        </Space>

        <Table
          rowKey="id"
          size="small"
          pagination={false}
          dataSource={filteredParties}
          rowClassName={(record) => record.id === selectedParty?.id ? 'yash-party-selected' : ''}
          onRow={(record, index) => ({
            onClick: () => setSelectedPartyIndex(index),
            onDoubleClick: () => selectParty(record),
          })}
          columns={[
            { title: 'Account Name', dataIndex: 'name' },
            { title: 'City', dataIndex: 'city' },
            { title: 'Group', dataIndex: 'group' },
            { title: 'Select', render: (_, record) => <Button type="link" onClick={() => selectParty(record)}>Enter</Button> },
          ]}
        />
        <div style={{ marginTop: 10, color: '#667085' }}>↑ ↓ Select • Enter Select • Double-click Select • Esc Close</div>
      </Modal>

      <Modal title={editingParty?.id ? 'Edit Party' : 'Add Party'} open={Boolean(editingParty)} onCancel={() => setEditingParty(null)} footer={null}>
        <Form layout="vertical" initialValues={editingParty || { name: '', city: '', group: 'Sundry Creditor' }} onFinish={saveParty}>
          <Form.Item label="Account Name" name="name" rules={[{ required: true, message: 'Account Name is required' }]}><Input autoFocus /></Form.Item>
          <Form.Item label="City" name="city"><Input /></Form.Item>
          <Form.Item label="Group" name="group"><Input /></Form.Item>
          <Space><Button type="primary" htmlType="submit">Save</Button><Button onClick={() => setEditingParty(null)}>Cancel</Button></Space>
        </Form>
      </Modal>

      <Modal title="Party Info" open={Boolean(partyInfo)} onCancel={() => setPartyInfo(null)} footer={null}>
        {partyInfo && <Space direction="vertical">
          <div><strong>Account Name:</strong> {partyInfo.name}</div>
          <div><strong>City:</strong> {partyInfo.city || '-'}</div>
          <div><strong>Group:</strong> {partyInfo.group || '-'}</div>
          <Tag color="blue">Party Master</Tag>
        </Space>}
      </Modal>
    </div>
  );
}
