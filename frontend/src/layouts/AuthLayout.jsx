import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthLayout() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div className="loader"><div className="spinner" /></div>;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <div className="auth-layout">
      <Outlet />
    </div>
  );
}
