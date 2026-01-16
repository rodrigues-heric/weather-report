import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

export interface WeatherData {
  name: string;
  state: string;
  country: string;
  condition: string;
  feelsLike: number;
  humidity: number;
  maxTemperature: number;
  minTemperature: number;
  pressure: number;
  temperature: number;
  uvIndex: number;
  visibility: number;
  windSpeed: number;
  sunrise?: string;
  sunset?: string;
  forecast: Array<{
    date: string;
    condition: string;
    minTemperature: number;
    maxTemperature: number;
  }>;
  hourly: Array<{
    time: string;
    temperature: number;
    condition: string;
  }>;
}

interface WeatherDataContextType {
  weatherData: WeatherData | null;
  setWeatherData: (data: WeatherData | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const WeatherDataContext = createContext<WeatherDataContextType | undefined>(
  undefined
);

interface WeatherDataProviderProps {
  children: ReactNode;
}

export const WeatherDataProvider: React.FC<WeatherDataProviderProps> = ({
  children,
}) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const contextValue: WeatherDataContextType = {
    weatherData,
    setWeatherData,
    isLoading,
    setIsLoading,
    error,
    setError,
  };

  return (
    <WeatherDataContext.Provider value={contextValue}>
      {children}
    </WeatherDataContext.Provider>
  );
};

export const useWeatherData = () => {
  const context = useContext(WeatherDataContext);

  if (context === undefined) {
    throw new Error('useWeatherData must be used within a WeatherDataProvider');
  }

  return context;
};
