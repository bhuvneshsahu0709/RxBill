import React, { useState } from 'react';
import { Trash2, CheckCircle2, Server, Info } from 'lucide-react';

const SettingsPage = ({ invoices = [], onClear }) => {
  const [cleared, setCleared] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  const handleClear = () => {
    if (!confirmClear) { setConfirmClear(true); return; }
    onClear();
    setCleared(true);
    setConfirmClear(false);
    setTimeout(() => setCleared(false), 3000);
  };

  return (
    <>
      <div className="page-topbar">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Configure RxBill and manage your data</p>
        </div>
      </div>

      <div className="page-body">
        {/* API Config */}
        <div className="settings-section">
          <div className="ss-head">
            <p className="ss-title">Backend Configuration</p>
            <p className="ss-sub">Connection settings for the prescription analysis server</p>
          </div>
          <div className="ss-body">
            <div className="settings-row">
              <div>
                <div className="sr-label">API Endpoint</div>
                <div className="sr-sub">http://localhost:5000/api/process-prescription</div>
              </div>
              <span className="rx-tag tag-ok">
                <Server size={11} /> Active
              </span>
            </div>
            <div className="settings-row">
              <div>
                <div className="sr-label">AI Model</div>
                <div className="sr-sub">Google Gemini · Auto-selected (1.5 Flash / 1.5 Pro)</div>
              </div>
              <span className="rx-tag tag-dosage">Configured</span>
            </div>
            <div className="settings-row">
              <div>
                <div className="sr-label">Rate Limiting</div>
                <div className="sr-sub">Max 10 requests per minute per IP</div>
              </div>
              <span className="rx-tag tag-frequency">Enabled</span>
            </div>
          </div>
        </div>

        {/* Data management */}
        <div className="settings-section">
          <div className="ss-head">
            <p className="ss-title">Data Management</p>
            <p className="ss-sub">Manage locally stored prescription history</p>
          </div>
          <div className="ss-body">
            <div className="settings-row">
              <div>
                <div className="sr-label">Stored Records</div>
                <div className="sr-sub">{invoices.length} prescription{invoices.length !== 1 ? 's' : ''} saved in browser localStorage</div>
              </div>
              <span className="rx-tag tag-note">{invoices.length} records</span>
            </div>
            <div className="settings-row">
              <div>
                <div className="sr-label">Clear History</div>
                <div className="sr-sub" style={{ color: confirmClear ? '#dc2626' : undefined }}>
                  {confirmClear ? 'Click again to confirm — this cannot be undone' : 'Permanently delete all saved prescription records'}
                </div>
              </div>
              {cleared ? (
                <span className="rx-tag tag-ok">
                  <CheckCircle2 size={11} /> Cleared
                </span>
              ) : (
                <button
                  className="btn-danger"
                  onClick={handleClear}
                  disabled={invoices.length === 0}
                  style={invoices.length === 0 ? { opacity: 0.4, cursor: 'not-allowed' } : {}}
                >
                  <Trash2 size={13} />
                  {confirmClear ? 'Confirm Delete' : 'Clear History'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* About */}
        <div className="settings-section">
          <div className="ss-head">
            <p className="ss-title">About RxBill</p>
            <p className="ss-sub">Version and legal information</p>
          </div>
          <div className="ss-body">
            <div className="settings-row">
              <div><div className="sr-label">Version</div><div className="sr-sub">1.0.0</div></div>
              <span className="rx-tag tag-note">Stable</span>
            </div>
            <div className="settings-row">
              <div><div className="sr-label">Patent Status</div><div className="sr-sub">Patent Pending — AI-powered prescription-to-invoice automation</div></div>
              <span className="rx-tag tag-warn">Pending</span>
            </div>
            <div className="settings-row">
              <div><div className="sr-label">Stack</div><div className="sr-sub">React 19 · MUI v7 · Express · Google Gemini · jsPDF</div></div>
            </div>
            <div className="settings-row" style={{ border: 'none', padding: '12px 0 0' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <Info size={14} style={{ color: '#94a3b8', flexShrink: 0, marginTop: 2 }} />
                <p style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: '0.74rem', color: '#94a3b8', lineHeight: 1.65 }}>
                  All prescription data is processed server-side and not stored permanently. History is saved locally in your browser only.
                  Ensure GEMINI_API_KEY is set in <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 4, fontSize: '0.72rem' }}>Backend/.env</code> for analysis to work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
