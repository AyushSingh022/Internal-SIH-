import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { analysisService } from '../services/index';

export default function DashboardPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analysisService.getReports()
      .then(res => setReports(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const quickActions = [
    { to: '/analysis', icon: '📊', label: t('dashboard.newAnalysis', 'New Business Analysis'), color: 'var(--gradient-primary)' },
    { to: '/schemes', icon: '🏛️', label: t('dashboard.govSchemes', 'Government Schemes'), color: 'var(--gradient-accent)' },
    { to: '/reports', icon: '📋', label: t('dashboard.myReports', 'My Reports'), color: 'var(--gradient-warm)' },
  ];

  return (
    <div className="animate-in">
      <div className="page-header">
        <h1>👋 {t('dashboard.welcome', 'Welcome')}, {user?.full_name || 'User'}</h1>
        <p>{t('app.tagline', 'Empowering rural entrepreneurs with smart business insights')}</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-3 stagger" style={{ marginBottom: '2rem' }}>
        {quickActions.map(action => (
          <Link key={action.to} to={action.to} className="glass-card" style={{ textDecoration: 'none', textAlign: 'center', padding: '2rem' }}>
            <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.75rem' }}>{action.icon}</span>
            <span style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>{action.label}</span>
          </Link>
        ))}
      </div>

      {/* Recent Reports */}
      <div className="section">
        <div className="section-header">
          <span className="section-icon">📋</span>
          <h2>{t('dashboard.recentReports', 'Recent Reports')}</h2>
        </div>

        {loading ? (
          <div className="loader"><div className="spinner" /></div>
        ) : reports.length === 0 ? (
          <div className="glass-card-static" style={{ textAlign: 'center', padding: '3rem' }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>📊</span>
            <p style={{ color: 'var(--text-muted)' }}>{t('dashboard.noReports', 'No reports yet. Start a new analysis!')}</p>
            <Link to="/analysis" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              {t('dashboard.newAnalysis', 'New Business Analysis')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-3 stagger">
            {reports.slice(0, 6).map(report => (
              <Link key={report.id} to={`/report/${report.id}`} className="glass-card" style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>{report.category_name}</h3>
                  {report.feasibility_score && (
                    <span className={`badge ${report.feasibility_score >= 70 ? 'badge-accent' : report.feasibility_score >= 40 ? 'badge-amber' : 'badge-red'}`}>
                      {report.feasibility_score}/100
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  📍 {report.village_name}, {report.district_name}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  {report.state_name} • ₹{Number(report.available_capital).toLocaleString('en-IN')}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  {new Date(report.created_at).toLocaleDateString('en-IN')}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
