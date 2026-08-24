import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { locationService, INDIAN_STATES_FALLBACK } from '../services/index';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { login } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', state_id: '', district_id: '' });
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    locationService.getStates()
      .then(res => setStates(res.data && res.data.length > 0 ? res.data : INDIAN_STATES_FALLBACK))
      .catch(() => setStates(INDIAN_STATES_FALLBACK));
  }, []);

  useEffect(() => {
    if (form.state_id) {
      locationService.getDistricts(form.state_id).then(res => setDistricts(res.data || [])).catch(() => {});
    } else {
      setDistricts([]);
    }
  }, [form.state_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card animate-in" style={{ maxWidth: 480 }}>
      {/* English / Hindi Language Toggle for Login */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <button
          type="button"
          className={`btn btn-sm ${language === 'en' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setLanguage('en')}
          style={{ padding: '0.35rem 1rem', fontSize: '0.85rem' }}
        >
          English
        </button>
        <button
          type="button"
          className={`btn btn-sm ${language === 'hi' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setLanguage('hi')}
          style={{ padding: '0.35rem 1rem', fontSize: '0.85rem' }}
        >
          हिन्दी
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '2.5rem' }}>🚀</span>
      </div>
      <h1>{t('auth.login', 'Login')}</h1>
      <p className="auth-subtitle">{t('auth.welcome', 'Welcome back')}</p>

      {error && <div className="disclaimer" style={{ marginBottom: '1rem' }}>⚠️ {error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">{t('auth.email', 'Email Address')}</label>
          <input
            id="login-email"
            type="email"
            className="form-input"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">{t('auth.password', 'Password')}</label>
          <input
            id="login-password"
            type="password"
            className="form-input"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            placeholder="••••••••"
            required
          />
        </div>

        {/* State and District Selection on Login */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div className="form-group">
            <label className="form-label">{t('auth.state', 'State')}</label>
            <select
              id="login-state"
              className="form-select"
              value={form.state_id}
              onChange={e => setForm({ ...form, state_id: e.target.value, district_id: '' })}
            >
              <option value="">{t('location.selectState', 'Select State')}</option>
              {states.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} {s.name_local ? `(${s.name_local})` : ''}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">{t('auth.district', 'District')}</label>
            <select
              id="login-district"
              className="form-select"
              value={form.district_id}
              onChange={e => setForm({ ...form, district_id: e.target.value })}
            >
              <option value="">{t('location.selectDistrict', 'Select District')}</option>
              {districts.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button id="login-submit" type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
          {loading ? t('common.loading', 'Loading...') : t('auth.loginBtn', 'Login')}
        </button>
      </form>

      <p className="auth-footer">
        {t('auth.noAccount', "Don't have an account?")}{' '}
        <Link to="/signup">{t('auth.signup', 'Sign Up')}</Link>
      </p>
    </div>
  );
}
