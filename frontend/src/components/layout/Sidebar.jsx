import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { t, language, setLanguage, languages } = useLanguage();
  const navigate = useNavigate();
  const [langOpen, setLangOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard', icon: '🏠', label: t('nav.dashboard', 'Dashboard') },
    { to: '/analysis', icon: '📊', label: t('nav.newAnalysis', 'New Analysis') },
    { to: '/schemes', icon: '🏛️', label: t('nav.schemes', 'Gov Schemes') },
    { to: '/reports', icon: '📋', label: t('nav.myReports', 'My Reports') },
  ];

  return (
    <aside className="app-sidebar" id="app-sidebar">
      <div className="nav-brand">
        <h1>🛡️ GramVyapar <span style={{ color: '#FF7A00' }}>AI</span></h1>
        <p>{t('app.subtitle', 'Rural Business Feasibility & Advisory')}</p>
      </div>

      {user && (
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t('dashboard.welcome', 'Welcome')},</p>
          <p style={{ fontSize: '0.95rem', fontWeight: 600 }}>{user.full_name}</p>
        </div>
      )}

      <ul className="nav-links">
        {navItems.map(item => (
          <li key={item.to}>
            <NavLink to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div style={{ padding: '1rem', marginTop: 'auto', borderTop: '1px solid var(--border-color)' }}>
        {/* Language Selector */}
        <div className="lang-selector">
          {langOpen && (
            <div className="lang-dropdown">
              {languages.map(lang => (
                <div
                  key={lang.code}
                  className={`lang-option ${language === lang.code ? 'active' : ''}`}
                  onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                >
                  <span>{lang.native_name}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{lang.name}</span>
                </div>
              ))}
            </div>
          )}
          <button className="btn btn-ghost btn-block" onClick={() => setLangOpen(!langOpen)} style={{ justifyContent: 'flex-start' }}>
            <span>🌐</span> {t('nav.language', 'Language')}: {languages.find(l => l.code === language)?.native_name || language}
          </button>
        </div>

        <button className="btn btn-ghost btn-block" onClick={handleLogout} style={{ justifyContent: 'flex-start', marginTop: '0.5rem', color: 'var(--red-400)' }}>
          <span>🚪</span> {t('nav.logout', 'Logout')}
        </button>
      </div>
    </aside>
  );
}
