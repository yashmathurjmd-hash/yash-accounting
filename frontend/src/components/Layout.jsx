import Sidebar from './Sidebar';
import { useAppStore } from '../store';

export default function Layout({ children }) {
  const { app } = useAppStore();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f7fb' }}>
      <Sidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header
          style={{
            height: 70,
            background: '#fff',
            borderBottom: '1px solid #e5eaf1',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 22px',
          }}
        >
          <div>
            <strong>{app.companyName}</strong>
            <div style={{ fontSize: 12, color: '#64748b' }}>{app.selectedYear}</div>
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span
              style={{
                background: app.isOffline ? '#fff2e8' : '#e8f8ee',
                color: app.isOffline ? '#b45309' : '#15803d',
                padding: '6px 10px',
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {app.isOffline ? 'Offline' : 'Online'}
            </span>
            <span style={{ fontWeight: 700 }}>{app.selectedBook}</span>
            <span style={{ color: '#475569' }}>{app.userName}</span>
          </div>
        </header>

        <main style={{ padding: 24 }}>{children}</main>
      </div>
    </div>
  );
}
