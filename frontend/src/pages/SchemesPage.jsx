import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { schemeService } from '../services/index';
import toast from 'react-hot-toast';

export default function SchemesPage() {
  const { t } = useLanguage();
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterLevel, setFilterLevel] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    schemeService.getAll({ government_level: filterLevel || undefined })
      .then(res => setSchemes(res.data || []))
      .catch(() => toast.error('Failed to load schemes'))
      .finally(() => setLoading(false));
  }, [filterLevel]);

  const filteredSchemes = schemes.filter(s => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (s.name && s.name.toLowerCase().includes(q)) ||
           (s.full_name && s.full_name.toLowerCase().includes(q)) ||
           (s.department && s.department.toLowerCase().includes(q));
  });

  return (
    <div className="animate-in">
      <div className="page-header">
        <h1>🏛️ {t('dashboard.govSchemes', 'Government Schemes')}</h1>
        <p>{t('schemes.title', 'Eligible Government Schemes for Rural Micro-Entrepreneurs')}</p>
      </div>

      <div className="glass-card-static" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <input
            type="text"
            className="form-input"
            placeholder="🔍 Search scheme name or department..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div style={{ width: 200 }}>
          <select className="form-select" value={filterLevel} onChange={e => setFilterLevel(e.target.value)}>
            <option value="">All Government Levels</option>
            <option value="central">Central Government</option>
            <option value="state">State Government</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loader"><div className="spinner" /></div>
      ) : filteredSchemes.length === 0 ? (
        <div className="glass-card-static" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--text-muted)' }}>{t('schemes.noSchemes', 'No matching government scheme found.')}</p>
        </div>
      ) : (
        <div className="grid grid-2 stagger">
          {filteredSchemes.map((scheme) => (
            <div key={scheme.id} className="scheme-card animate-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <h3>{scheme.name}</h3>
                <span className="badge badge-primary">{scheme.government_level}</span>
              </div>
              {scheme.full_name && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{scheme.full_name}</p>}
              {scheme.department && <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>🏢 {scheme.department}</p>}
              {scheme.description && <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{scheme.description}</p>}

              {scheme.best_for && Array.isArray(scheme.best_for) && (
                <div style={{ marginBottom: '0.75rem' }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>Best For:</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.25rem' }}>
                    {scheme.best_for.map((item, idx) => (
                      <span key={idx} className="badge badge-amber">{item}</span>
                    ))}
                  </div>
                </div>
              )}

              {scheme.source_url && (
                <p style={{ fontSize: '0.75rem', marginTop: '1rem' }}>
                  <a href={scheme.source_url} target="_blank" rel="noopener noreferrer">🔗 {t('schemes.source', 'Source Guidelines')}</a>
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
