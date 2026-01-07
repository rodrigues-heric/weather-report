import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';

export const ProtectedRoute = () => {
  const { authenticated, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;

  return authenticated ? <Outlet /> : <Navigate to='/login' />;
};
