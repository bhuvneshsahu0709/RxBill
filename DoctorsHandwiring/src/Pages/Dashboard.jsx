import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ScanLine, Pill, CalendarDays, TrendingUp } from 'lucide-react';

const Dashboard = ({ invoices = [] }) => {
  const navigate = useNavigate();

  // ── compute stats ──────────────────────────────────────────────────────────
  const today = new Date().toDateString();
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

  const totalMeds    = invoices.reduce((s, inv) => s + (inv.medicineCount || 0), 0);
  const todayCount   = invoices.filter(inv => new Date(inv.createdAt).toDateString() === today).length;
  const weekCount    = invoices.filter(inv => new Date(inv.createdAt).getTime() >= weekAgo).length;

  const stats = [
    { Icon: ScanLine,    color: 'sc-em',  value: invoices.length, label: 'Total Analyses',       delta: weekCount > 0 ? `+${weekCount} this week` : 'No scans yet' },
    { Icon: Pill,        color: 'sc-sky', value: totalMeds,        label: 'Medicines Extracted',  delta: totalMeds > 0 ? `across ${invoices.length} scan${invoices.length !== 1 ? 's' : ''}` : '—' },
    { Icon: CalendarDays,color: 'sc-vio', value: todayCount,       label: "Today's Scans",        delta: todayCount > 0 ? 'scanned today' : 'None today' },
    { Icon: TrendingUp,  color: 'sc-amb', value: weekCount,        label: 'This Week',            delta: weekCount > 0 ? 'prescriptions' : 'No scans this week' },
  ];

  const recent = invoices.slice(0, 6);

  const fmtDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <div className="page-topbar">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Overview of prescription analyses and activity</p>
        </div>
      </div>

      <div className="page-body">
        {/* Stats */}
        <div className="stat-grid">
          {stats.map(({ Icon, color, value, label, delta }) => (
            <div key={label} className="stat-card">
              <div className={`sc-icon ${color}`}>
                <Icon size={17} color={
                  color === 'sc-em'  ? '#10b981' :
                  color === 'sc-sky' ? '#0ea5e9' :
                  color === 'sc-vio' ? '#8b5cf6' : '#f59e0b'
                } strokeWidth={2} />
              </div>
              <div className="sc-value">{value}</div>
              <div className="sc-label">{label}</div>
              <div className="sc-delta">{delta}</div>
            </div>
          ))}
        </div>

        {/* Recent prescriptions */}
        <div className="panel">
          <div className="panel-head">
            <span className="ph-title">Recent Prescriptions</span>
            <button className="ph-action" onClick={() => navigate('/invoices')}>
              View all →
            </button>
          </div>

          {recent.length === 0 ? (
            <div className="empty-state">
              <span className="es-icon">🔬</span>
              <p className="es-title">No analyses yet</p>
              <p className="es-desc">Upload a prescription image on the analyzer page to get started.</p>
              <span className="es-link" onClick={() => navigate('/')}>
                Go to Upload →
              </span>
            </div>
          ) : (
            recent.map(inv => (
              <div key={inv.id} className="history-row" onClick={() => navigate('/invoices')}>
                <div className="hr-icon">💊</div>
                <div className="hr-main">
                  <div className="hr-name">{inv.patientName}</div>
                  <div className="hr-sub">Dr. {inv.doctorName}{inv.specialization ? ` · ${inv.specialization}` : ''}</div>
                </div>
                <div className="hr-meta">
                  <div className="hr-date">{fmtDate(inv.createdAt)}</div>
                  <div className="hr-meds">{inv.medicineCount} medicine{inv.medicineCount !== 1 ? 's' : ''}</div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick action */}
        {invoices.length > 0 && (
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button className="btn-analyze" style={{ marginTop: 0 }} onClick={() => navigate('/')}>
              <ScanLine size={14} /> New Analysis
            </button>
            <button className="btn-reset" style={{ width: 'auto', marginTop: 0 }} onClick={() => navigate('/invoices')}>
              View All History
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
