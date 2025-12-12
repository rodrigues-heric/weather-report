import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export interface City {
  id: number;
  name: string;
  country: string;
  admin1?: string; // Estado/Região
  latitude: number;
  longitude: number;
}

interface GeocodingResponse {
  results?: City[];
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export function useCitySearch(initialQuery: string = '') {
  const [query, setQuery] = useState<string>(initialQuery);
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const debouncedQuery = useDebounce<string>(query, 500);
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language == 'pt-BR' ? 'pt' : 'en';

  useEffect(() => {
    if (debouncedQuery.length < 3) {
      setSuggestions([]);
      return;
    }

    const fetchCities = async () => {
      setIsLoading(true);
      try {
        const apiURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(debouncedQuery)}&count=5&language=${currentLanguage}&format=json`;
        const response = await fetch(apiURL);

        if (!response.ok) {
          throw new Error(`Erro de rede: ${response.status}`);
        }

        const data: GeocodingResponse = await response.json();

        setSuggestions(data.results || []);
      } catch (error) {
        console.error('Erro ao buscar cidades:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, [debouncedQuery]);

  return {
    query,
    setQuery,
    suggestions,
    isLoading,
    clearSuggestions: () => setSuggestions([]),
  };
}
