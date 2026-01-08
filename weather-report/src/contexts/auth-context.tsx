import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { useWeatherData } from './weather-data-context';

interface IUser {
  id: string;
  username: string;
  favoriteCity?: Record<string, any> | null;
}

interface IAuthContext {
  user: IUser | null;
  loading: boolean;
  authenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  updateFavoriteCity: (city: Record<string, any> | null) => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setWeatherData } = useWeatherData();

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
      // If the user doesn't have a favorite city, ensure weather data is cleared
      if (!response.data?.favoriteCity) {
        setWeatherData(null);
      }
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
    // Clear any weather data on logout to avoid showing previous search
    setWeatherData(null);
  };

  const updateFavoriteCity = (city: Record<string, any> | null) => {
    if (user) {
      setUser({ ...user, favoriteCity: city });
    }
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
        updateFavoriteCity,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
