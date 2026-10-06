import { NavLink } from 'react-router-dom';
import {
  DashboardOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  BarChartOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const items = [
  { to: '/', label: 'Dashboard', icon: <DashboardOutlined /> },
  { to: '/masters', label: 'Masters', icon: <AppstoreOutlined /> },
  { to: '/voucher', label: 'Voucher', icon: <FileTextOutlined /> },
  { to: '/reports', label: 'Reports', icon: <BarChartOutlined /> },
  { to: '/admin', label: 'Admin', icon: <SettingOutlined /> },
];

export default function Sidebar() {
  return (
    <aside style={{ width: 220, background: '#f7f9fc', borderRight: '1px solid #e5eaf1', padding: 12 }}>
      <div style={{ fontSize: 24, fontWeight: 800, padding: '10px 8px 18px' }}>YASH</div>
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 12px',
            borderRadius: 8,
            marginBottom: 8,
            textDecoration: 'none',
            color: isActive ? '#0d6efd' : '#334155',
            background: isActive ? '#eaf3ff' : 'transparent',
            fontWeight: 700,
          })}
        >
          {item.icon}
          {item.label}
        </NavLink>
      ))}
    </aside>
  );
}
