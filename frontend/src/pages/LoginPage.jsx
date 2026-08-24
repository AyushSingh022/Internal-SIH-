import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    <div className="auth-card animate-in">
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
