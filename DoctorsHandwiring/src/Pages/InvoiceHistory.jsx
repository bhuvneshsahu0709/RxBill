import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ChevronDown, ChevronUp, ScanLine } from 'lucide-react';

const InvoiceHistory = ({ invoices = [], onDelete }) => {
  const navigate  = useNavigate();
  const [expanded, setExpanded] = useState(null);
  const [search,   setSearch]   = useState('');
  const [confirm,  setConfirm]  = useState(null);

  const toggle = (id) => setExpanded(prev => prev === id ? null : id);

  const fmtDate = (iso) => new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });

  const filtered = invoices.filter(inv => {
    const q = search.toLowerCase();
    return (
      inv.patientName.toLowerCase().includes(q) ||
      inv.doctorName.toLowerCase().includes(q)  ||
      inv.medicines?.some(m => m.name?.toLowerCase().includes(q))
    );
  });

  const handleDelete = (id) => {
    if (confirm === id) { onDelete(id); setConfirm(null); setExpanded(null); }
    else { setConfirm(id); }
  };

  return (
    <>
      <div className="page-topbar">
        <div>
          <h1 className="page-title">Invoice History</h1>
          <p className="page-subtitle">All saved prescription analyses · {invoices.length} total</p>
        </div>
        {invoices.length > 0 && (
          <div className="topbar-chips">
            <span className="rx-tag tag-count">{invoices.length} record{invoices.length !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>

      <div className="page-body">
        {invoices.length === 0 ? (
          <div className="panel">
            <div className="empty-state">
              <span className="es-icon">📋</span>
              <p className="es-title">No history yet</p>
              <p className="es-desc">Analyze a prescription and it will appear here automatically.</p>
              <span className="es-link" onClick={() => navigate('/')}>
                <ScanLine size={13} /> Analyze Prescription
              </span>
            </div>
          </div>
        ) : (
          <div className="panel">
            <div className="panel-head">
              <span className="ph-title">All Prescriptions</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search patient, doctor, medicine…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            {filtered.length === 0 && (
              <div className="empty-state" style={{ padding: '40px 32px' }}>
                <p className="es-title" style={{ fontSize: '0.9rem' }}>No results for "{search}"</p>
                <p className="es-desc">Try a different name or medicine.</p>
              </div>
            )}

            {filtered.map(inv => (
              <React.Fragment key={inv.id}>
                <div className="history-row" onClick={() => toggle(inv.id)}>
                  <div className="hr-icon">💊</div>
                  <div className="hr-main">
                    <div className="hr-name">{inv.patientName}</div>
                    <div className="hr-sub">Dr. {inv.doctorName}{inv.specialization ? ` · ${inv.specialization}` : ''}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <div className="hr-meta">
                      <div className="hr-date">{fmtDate(inv.createdAt)}</div>
                      <div className="hr-meds">{inv.medicineCount} medicine{inv.medicineCount !== 1 ? 's' : ''}</div>
                    </div>

                    <button
                      className="btn-icon btn-view"
                      title="Expand"
                      onClick={e => { e.stopPropagation(); toggle(inv.id); }}
                    >
                      {expanded === inv.id
                        ? <ChevronUp  size={14} />
                        : <ChevronDown size={14} />
                      }
                    </button>

                    <button
                      className="btn-icon"
                      title={confirm === inv.id ? 'Click again to confirm delete' : 'Delete'}
                      onClick={e => { e.stopPropagation(); handleDelete(inv.id); }}
                      style={confirm === inv.id ? { borderColor: '#f87171', background: '#fff5f5', color: '#dc2626' } : {}}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                {expanded === inv.id && (
                  <div className="row-detail">
                    <div className="detail-grid">
                      {inv.prescriptionData?.doctor?.name && (
                        <div className="detail-tile">
                          <div className="dt-label">Doctor</div>
                          <div className="dt-value">{inv.prescriptionData.doctor.name}</div>
                        </div>
                      )}
                      {inv.prescriptionData?.patient?.name && (
                        <div className="detail-tile">
                          <div className="dt-label">Patient</div>
                          <div className="dt-value">{inv.prescriptionData.patient.name}</div>
                        </div>
                      )}
                      {inv.prescriptionData?.patient?.age && (
                        <div className="detail-tile">
                          <div className="dt-label">Age</div>
                          <div className="dt-value">{inv.prescriptionData.patient.age}</div>
                        </div>
                      )}
                      {inv.prescriptionData?.date && (
                        <div className="detail-tile">
                          <div className="dt-label">Rx Date</div>
                          <div className="dt-value">{inv.prescriptionData.date}</div>
                        </div>
                      )}
                    </div>

                    {inv.medicines?.length > 0 && (
                      <>
                        <p className="section-kicker" style={{ marginBottom: 10 }}>Medicines prescribed</p>
                        <div className="detail-meds">
                          {inv.medicines.map((med, i) => (
                            <span key={i} className="detail-med-pill">
                              💊 {med.name}
                              {med.dosage ? ` · ${med.dosage}` : ''}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default InvoiceHistory;
