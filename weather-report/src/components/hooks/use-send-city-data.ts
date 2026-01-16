import { useEffect } from 'react';
import type { City } from './use-city-search';
import {
  useWeatherData,
  type WeatherData,
} from '../../contexts/weather-data-context';

/**
 * Hook customizado para enviar dados de uma cidade e atualizar o estado global.
 */
export function useSendCityData(cityData: City | null, lang: string = 'en') {
  const { setWeatherData, setIsLoading, setError } = useWeatherData();

  const sendCityToBackend = async (cityData: City) => {
    const url = 'http://localhost:3000/api/city/fetch';

    setIsLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: cityData.name,
          country: cityData.country,
          state: cityData.admin1,
          lang: lang,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      const data: WeatherData = await response.json();
      setWeatherData(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Falha desconhecida ao buscar previsão.';
      setError(errorMessage);
      console.error('Falha ao enviar dados da cidade:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (cityData) {
      sendCityToBackend(cityData);
    }
  }, [cityData, setWeatherData, setIsLoading, setError]);
}
