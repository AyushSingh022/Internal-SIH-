import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { analysisService } from '../services/index';

export default function ReportsPage() {
  const { t } = useLanguage();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analysisService.getReports()
      .then(res => setReports(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="animate-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>📋 {t('dashboard.myReports', 'My Reports')}</h1>
          <p>View and manage all your past business feasibility assessments</p>
        </div>
        <Link to="/analysis" className="btn btn-primary">
          + {t('dashboard.newAnalysis', 'New Business Analysis')}
        </Link>
      </div>

      {loading ? (
        <div className="loader"><div className="spinner" /></div>
      ) : reports.length === 0 ? (
        <div className="glass-card-static" style={{ textAlign: 'center', padding: '3rem' }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>📑</span>
          <p style={{ color: 'var(--text-muted)' }}>{t('dashboard.noReports', 'No reports yet. Start a new analysis!')}</p>
          <Link to="/analysis" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            {t('dashboard.newAnalysis', 'New Business Analysis')}
          </Link>
        </div>
      ) : (
        <div className="grid grid-3 stagger">
          {reports.map(report => (
            <Link key={report.id} to={`/report/${report.id}`} className="glass-card" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{report.category_name}</h3>
                {report.feasibility_score && (
                  <span className={`badge ${report.feasibility_score >= 70 ? 'badge-accent' : report.feasibility_score >= 40 ? 'badge-amber' : 'badge-red'}`}>
                    {report.feasibility_score}/100
                  </span>
                )}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                📍 {report.village_name}, {report.district_name}
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                State: {report.state_name} • Capital: ₹{Number(report.available_capital).toLocaleString('en-IN')}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {new Date(report.created_at).toLocaleDateString('en-IN')}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--primary-400)', fontWeight: 600 }}>
                  {t('dashboard.viewReport', 'View Report')} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
