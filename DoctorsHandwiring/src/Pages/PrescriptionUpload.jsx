import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { CircularProgress, Tabs, Tab } from '@mui/material';
import { Zap, Clock, Shield, ScanLine, RotateCcw, CheckCircle2 } from 'lucide-react';
import InvoiceGenerator from '../Components/InvoiceGenerator';

const FEATURES = [
  {
    Icon: Zap,
    title: '90%+ extraction accuracy',
    desc: 'Custom AI reads handwritten and printed prescriptions — names, dosages, frequencies, durations.',
  },
  {
    Icon: Clock,
    title: 'Under 15 seconds',
    desc: 'Cuts invoice time from 3–5 minutes to under 15 seconds per scan.',
  },
  {
    Icon: Shield,
    title: '30–40% fewer errors',
    desc: 'Built-in validation logic corrects common OCR and handwriting misreads before output.',
  },
];

const PrescriptionUpload = ({ onSave }) => {
  const [file, setFile]            = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [response, setResponse]    = useState(null);
  const [loading, setLoading]      = useState(false);
  const [error, setError]          = useState('');
  const [activeTab, setActiveTab]  = useState(0);

  const onDrop = (acceptedFiles) => {
    const f = acceptedFiles[0];
    if (!f) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
    setError('');
    setResponse(null);
  };

  useEffect(() => {
    return () => { if (previewUrl) URL.revokeObjectURL(previewUrl); };
  }, [previewUrl]);

  const handleUpload = async () => {
    if (!file) { setError('Select a prescription image first.'); return; }
    const fd = new FormData();
    fd.append('file', file);
    setLoading(true);
    setError('');

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/process-prescription`,
        fd,
        { headers: { 'Content-Type': 'multipart/form-data' }, timeout: 60000 },
      );
      if (res.data.success) {
        setResponse(res.data.data);
        setActiveTab(0);
        if (onSave) onSave(res.data.data);
      } else {
        setError(res.data.error || 'Unable to process prescription. Please try again.');
      }
    } catch (err) {
      if (err.code === 'ERR_NETWORK' || err.message?.includes('Network Error')) {
        setError('Cannot reach backend. Make sure the server is running on port 5000.');
      } else {
        setError(err.response?.data?.error || 'An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResponse(null);
    setFile(null);
    if (previewUrl) { URL.revokeObjectURL(previewUrl); setPreviewUrl(null); }
    setError('');
    setActiveTab(0);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] },
    onDrop,
    multiple: false,
  });

  const vis = (v) => v && v !== 'not visible' && v !== 'Not visible' && v !== 'N/A' && v !== 'n/a';

  // ── Upload section ─────────────────────────────────────────────────────────
  const UploadSection = (
    <div className="upload-panel">
      {/* Left: upload card */}
      <div className="upload-card">
        <div className="uc-head">
          <span className="uc-title">Upload Prescription</span>
          <span className="uc-hint">JPEG · PNG · Max 5 MB</span>
        </div>
        <div className="uc-body">
          <div
            {...getRootProps()}
            className={`upload-zone${isDragActive ? ' drag-active' : ''}`}
          >
            <input {...getInputProps()} />
            <span className="uz-icon">{isDragActive ? '📥' : '🔬'}</span>
            <p className="uz-title">{isDragActive ? 'Drop to analyze' : 'Drop prescription image here'}</p>
            <p className="uz-hint">or click to browse files</p>
          </div>

          {file && (
            <div className="file-preview">
              {previewUrl && <img src={previewUrl} alt="Preview" className="fp-thumb" />}
              <div className="fp-info">
                <div className="fp-name">{file.name}</div>
                <div className="fp-size">{(file.size / 1024 / 1024).toFixed(2)} MB · Ready</div>
              </div>
              <span className="fp-check">✓</span>
            </div>
          )}

          {error && (
            <div className="error-bar"><p>⚠ {error}</p></div>
          )}

          <button
            className="btn-analyze"
            onClick={handleUpload}
            disabled={loading || !file}
          >
            {loading ? (
              <>
                <CircularProgress size={13} color="inherit" thickness={5} />
                Analyzing…
              </>
            ) : (
              <>
                <ScanLine size={14} />
                Analyze Prescription
              </>
            )}
          </button>
        </div>
      </div>

      {/* Right: features panel */}
      <div className="features-panel">
        <p className="fp-head">Why RxBill</p>
        {FEATURES.map(({ Icon, title, desc }) => (
          <div key={title} className="feature-card">
            <div className="fc-icon">
              <Icon size={15} color="#10b981" strokeWidth={2} />
            </div>
            <p className="fc-title">{title}</p>
            <p className="fc-desc">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // ── Results section ────────────────────────────────────────────────────────
  const ResultsSection = response && (
    <div className="results-wrap">
      {/* Tabs */}
      <div className="dark-tabs-bar">
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          sx={{
            minHeight: 44,
            '& .MuiTab-root': {
              color: '#a1a1aa',
              minHeight: 44,
              fontSize: '0.84rem',
              fontWeight: 500,
            },
            '& .MuiTab-root.Mui-selected': { color: '#10b981' },
            '& .MuiTabs-indicator': { backgroundColor: '#10b981', height: 2 },
          }}
        >
          <Tab label="Prescription Details" />
          <Tab label="Generate Invoice" />
        </Tabs>
      </div>

      {activeTab === 0 && (
        <div className="results-grid">
          {/* Left: medicines */}
          <div>
            <p className="section-kicker">
              Prescribed medicines
              {response.medicines?.length > 0 && (
                <span className="rx-tag tag-count" style={{ marginLeft: 8 }}>
                  {response.medicines.length}
                </span>
              )}
            </p>
            {response.medicines?.map((med, i) => (
              <div key={i} className="med-card">
                <p className="med-name">💊 {med.name || 'Unknown'}</p>
                <div className="med-tags">
                  {vis(med.dosage)       && <span className="rx-tag tag-dosage">Dosage: {med.dosage}</span>}
                  {vis(med.frequency)    && <span className="rx-tag tag-frequency">Frequency: {med.frequency}</span>}
                  {vis(med.duration)     && <span className="rx-tag tag-duration">Duration: {med.duration}</span>}
                  {vis(med.instructions) && <span className="rx-tag tag-note">{med.instructions}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Right: metadata */}
          <div>
            <p className="section-kicker">Prescription info</p>

            {response.doctor && (
              <div className="info-tile">
                <p className="it-label">Prescribing Doctor</p>
                <p className="it-value">{response.doctor.name || '—'}</p>
                {vis(response.doctor.specialization) && (
                  <p className="it-sub">{response.doctor.specialization}</p>
                )}
              </div>
            )}

            {response.patient && (
              <div className="info-tile">
                <p className="it-label">Patient</p>
                <p className="it-value">{response.patient.name || '—'}</p>
                {vis(response.patient.age) && (
                  <p className="it-sub">Age: {response.patient.age}</p>
                )}
              </div>
            )}

            {vis(response.date) && (
              <div className="info-tile">
                <p className="it-label">Prescription Date</p>
                <p className="it-value" style={{ fontSize: '0.88rem' }}>{response.date}</p>
              </div>
            )}

            <div className="info-tile" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle2 size={14} color="#10b981" strokeWidth={2} />
              <span style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: '0.78rem', color: '#34d399', fontWeight: 600 }}>
                Analysis complete
              </span>
            </div>

            <button className="btn-reset" onClick={handleReset}>
              <RotateCcw size={13} />
              New Analysis
            </button>
          </div>
        </div>
      )}

      {activeTab === 1 && (
        <div className="invoice-island">
          <InvoiceGenerator prescriptionData={response} />
        </div>
      )}
    </div>
  );

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Page header */}
      <div className="page-topbar">
        <div>
          <h1 className="page-title">Prescription Analyzer</h1>
          <p className="page-subtitle">Extract medicines · dosages · generate invoices instantly</p>
        </div>
        {response && (
          <div className="topbar-chips">
            <span className="rx-tag tag-count" style={{ fontSize: '0.72rem', height: 24, padding: '0 11px' }}>
              {response.medicines?.length || 0} medicines
            </span>
            <span className="rx-tag tag-ok" style={{ fontSize: '0.72rem', height: 24, padding: '0 11px' }}>
              Analyzed
            </span>
          </div>
        )}
      </div>

      {/* Page body */}
      <div className="page-body">
        {!response && UploadSection}
        {response  && ResultsSection}
      </div>
    </>
  );
};

export default PrescriptionUpload;
