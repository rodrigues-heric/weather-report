import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

interface IUser {
  id: string;
  username: string;
}

interface IAuthContext {
  user: IUser | null;
  loading: boolean;
  authenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkLogin() {
      try {
        const response = await api.get('/auth/me');
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setError(null);
      await api.post('/auth/login', {
        username,
        password,
      });
      const response = await api.get('/auth/me');
      setUser(response.data);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error;
      setError(errorMsg);
      throw err;
    }
  };

  const register = async (username: string, password: string) => {
    try {
      setError(null);
      await api.post('/auth/register', {
        username,
        password,
      });
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Erro ao registrar';
      setError(errorMsg);
      throw err;
    }
  };

  const logout = async () => {
    await api.post('/auth/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authenticated: !!user,
        login,
        register,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
