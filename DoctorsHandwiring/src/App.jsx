import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Upload, LayoutDashboard, FileText } from 'lucide-react';
import PrescriptionUpload from './Pages/PrescriptionUpload';
import Dashboard from './Pages/Dashboard';
import InvoiceHistory from './Pages/InvoiceHistory';
import './App.scss';

// ── MUI theme ─────────────────────────────────────────────────────────────────
const theme = createTheme({
  palette: {
    primary:    { main: '#10b981', light: '#34d399', dark: '#059669' },
    secondary:  { main: '#059669' },
    background: { default: '#eef2f7', paper: '#ffffff' },
    text:       { primary: '#0f172a', secondary: '#475569' },
  },
  typography: {
    fontFamily: '"IBM Plex Sans", "Segoe UI", system-ui, sans-serif',
    h4: { fontWeight: 700 }, h5: { fontWeight: 600 }, h6: { fontWeight: 600 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#ffffff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 4px 14px rgba(0,0,0,0.06)',
          border: '1px solid #e2e8f0',
        },
      },
    },
    MuiButton: {
      styleOverrides: { root: { borderRadius: '9px', textTransform: 'none', fontWeight: 600, fontFamily: '"IBM Plex Sans", system-ui, sans-serif' } },
    },
    MuiTextField: {
      styleOverrides: { root: { '& .MuiOutlinedInput-root': { borderRadius: '9px', fontFamily: '"IBM Plex Sans", system-ui, sans-serif' } } },
    },
    MuiTab: {
      styleOverrides: { root: { fontFamily: '"IBM Plex Sans", system-ui, sans-serif', textTransform: 'none', fontWeight: 500, fontSize: '0.875rem' } },
    },
    MuiChip: {
      styleOverrides: { root: { fontFamily: '"IBM Plex Sans", system-ui, sans-serif' } },
    },
    MuiTableCell: {
      styleOverrides: { root: { fontFamily: '"IBM Plex Sans", system-ui, sans-serif' } },
    },
  },
});

// ── localStorage-backed invoice store ─────────────────────────────────────────
const STORE_KEY = 'rxbill_invoices';

function loadInvoices() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY) || '[]'); }
  catch { return []; }
}

// ── Nav items ─────────────────────────────────────────────────────────────────
const NAV = [
  { Icon: Upload,          label: 'Upload & Analyze', path: '/' },
  { Icon: LayoutDashboard, label: 'Dashboard',         path: '/dashboard' },
  { Icon: FileText,        label: 'Invoice History',   path: '/invoices' },
];

// ── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar() {
  const { pathname } = useLocation();
  const isActive = (path) => path === '/' ? pathname === '/' : pathname.startsWith(path);

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">⚕</div>
        <span className="sidebar-title s-reveal">RxBill</span>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section">
          <span className="sidebar-section-label s-reveal">WORKSPACE</span>
          {NAV.slice(0, 3).map(({ Icon, label, path }) => (
            <Link key={path} to={path} className={`sidebar-item${isActive(path) ? ' active' : ''}`}>
              <span className="s-icon"><Icon size={17} strokeWidth={isActive(path) ? 2.2 : 1.75} /></span>
              <span className="s-label s-reveal">{label}</span>
              {isActive(path) && <span className="s-dot s-reveal" />}
            </Link>
          ))}
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="sf-status">
          <span className="sf-dot" />
          <span className="s-reveal">Systems Nominal</span>
        </div>
        <span className="sf-version s-reveal">v1.0 · Patent Pending</span>
      </div>
    </aside>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
function App() {
  const [invoices, setInvoices] = useState(loadInvoices);

  const saveInvoice = (prescriptionData) => {
    const record = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      patientName: prescriptionData.patient?.name || 'Unknown Patient',
      doctorName:  prescriptionData.doctor?.name  || 'Unknown Doctor',
      specialization: prescriptionData.doctor?.specialization || '',
      medicineCount:  prescriptionData.medicines?.length || 0,
      medicines: prescriptionData.medicines || [],
      date: prescriptionData.date || '',
      prescriptionData,
    };
    setInvoices(prev => {
      const updated = [record, ...prev];
      localStorage.setItem(STORE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteInvoice = (id) => {
    setInvoices(prev => {
      const updated = prev.filter(inv => inv.id !== id);
      localStorage.setItem(STORE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="app-shell">
          <Sidebar />
          <main className="main-area">
            <Routes>
              <Route path="/"          element={<PrescriptionUpload onSave={saveInvoice} />} />
              <Route path="/dashboard" element={<Dashboard invoices={invoices} />} />
              <Route path="/invoices"  element={<InvoiceHistory invoices={invoices} onDelete={deleteInvoice} />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
