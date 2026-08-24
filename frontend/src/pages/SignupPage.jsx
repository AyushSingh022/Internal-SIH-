import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { locationService } from '../services/index';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const { signup } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    full_name: '', email: '', mobile: '', password: '', confirm_password: '',
    preferred_language: 'en', state_id: '', district_id: '',
  });
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    locationService.getStates().then(res => setStates(res.data || [])).catch(() => {});
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
    if (form.password !== form.confirm_password) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await signup(form);
      toast.success('Account created!');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Signup failed');
      toast.error(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const update = (key, val) => setForm({ ...form, [key]: val });

  return (
    <div className="auth-card animate-in" style={{ maxWidth: 480 }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '2.5rem' }}>🚀</span>
      </div>
      <h1>{t('auth.signup', 'Sign Up')}</h1>
      <p className="auth-subtitle">{t('auth.createAccount', 'Create your account')}</p>

      {error && <div className="disclaimer" style={{ marginBottom: '1rem' }}>⚠️ {error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">{t('auth.fullName', 'Full Name')}</label>
          <input id="signup-name" type="text" className="form-input" value={form.full_name} onChange={e => update('full_name', e.target.value)} required />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">{t('auth.email', 'Email')}</label>
            <input id="signup-email" type="email" className="form-input" value={form.email} onChange={e => update('email', e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">{t('auth.mobile', 'Mobile')}</label>
            <input id="signup-mobile" type="tel" className="form-input" value={form.mobile} onChange={e => update('mobile', e.target.value)} />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">{t('auth.password', 'Password')}</label>
            <input id="signup-password" type="password" className="form-input" value={form.password} onChange={e => update('password', e.target.value)} required minLength={8} />
          </div>
          <div className="form-group">
            <label className="form-label">{t('auth.confirmPassword', 'Confirm')}</label>
            <input id="signup-confirm" type="password" className="form-input" value={form.confirm_password} onChange={e => update('confirm_password', e.target.value)} required />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">{t('auth.state', 'State')}</label>
            <select id="signup-state" className="form-select" value={form.state_id} onChange={e => update('state_id', e.target.value)}>
              <option value="">{t('location.selectState', 'Select')}</option>
              {states.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">{t('auth.district', 'District')}</label>
            <select id="signup-district" className="form-select" value={form.district_id} onChange={e => update('district_id', e.target.value)}>
              <option value="">{t('location.selectDistrict', 'Select')}</option>
              {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
        </div>
        <button id="signup-submit" type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
          {loading ? t('common.loading', 'Loading...') : t('auth.signupBtn', 'Create Account')}
        </button>
      </form>

      <p className="auth-footer">
        {t('auth.hasAccount', 'Already have an account?')}{' '}
        <Link to="/login">{t('auth.login', 'Login')}</Link>
      </p>
    </div>
  );
}
