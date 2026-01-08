import { MapPin, Star } from 'lucide-react';
import { CitySearch } from './city-search';
import type { City } from './hooks/use-city-search';
import { useState, useEffect } from 'react';
import { useSendCityData } from './hooks/use-send-city-data';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { saveFavoriteCity } from './hooks/use-save-favorite-city';
import { useAuth } from '../contexts/auth-context';

function DisplayCity({ city }: { city: City | null }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { user, updateFavoriteCity } = useAuth();

  useEffect(() => {
    if (user?.favoriteCity && city) {
      const isCityFavorited =
        user.favoriteCity.name === city.name &&
        user.favoriteCity.country === city.country;
      setIsFavorited(isCityFavorited);
    } else {
      setIsFavorited(false);
    }
  }, [city, user?.favoriteCity]);

  const handleFavorite = async () => {
    try {
      setIsLoading(true);
      if (!isFavorited) {
        await saveFavoriteCity(city);
        updateFavoriteCity(city);
      } else {
        await saveFavoriteCity(null);
        updateFavoriteCity(null);
      }
      setIsFavorited(!isFavorited);
    } catch (error) {
      console.error('Failed to save favorite city:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!city) {
    return (
      <span className='text-foreground text-lg font-medium'>
        {t('search.select')}
      </span>
    );
  }

  return (
    <>
      <MapPin className='h-5 w-5' />
      <span className='text-foreground text-lg font-medium'>
        {city.name}, {city.admin1} | {city.country}
      </span>
      <Button
        variant='ghost'
        size='icon'
        onClick={handleFavorite}
        disabled={isLoading}
      >
        {isFavorited ? (
          <Star className='h-5 w-5 text-yellow-400' fill='currentColor' />
        ) : (
          <Star className='h-5 w-5' />
        )}
      </Button>
    </>
  );
}

export function WeatherHeader() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const { i18n } = useTranslation();
  const { user } = useAuth();
  const currentLanguage = i18n.language == 'pt-BR' ? 'pt' : 'en';

  const handleCitySelection = (city: City) => {
    setSelectedCity(city);
  };

  useEffect(() => {
    if (user?.favoriteCity && !selectedCity) {
      const favoriteCity = user.favoriteCity as City;
      setSelectedCity(favoriteCity);
    }
  }, [user?.favoriteCity, selectedCity]);

  useEffect(() => {
    if (user && !user.favoriteCity) {
      setSelectedCity(null);
    }
  }, [user?.favoriteCity]);

  useSendCityData(selectedCity, currentLanguage);

  return (
    <div className='flex flex-col items-start justify-between pb-2 md:flex-row md:items-center'>
      <div className='relative mb-4 w-full md:hidden'>
        <CitySearch onCitySelect={handleCitySelection} />
      </div>

      <div className='text-muted-foreground flex items-center gap-2'>
        <DisplayCity city={selectedCity} />
      </div>

      <div className='flex items-center gap-4'>
        <div className='relative hidden md:block'>
          <CitySearch onCitySelect={handleCitySelection} />
        </div>
      </div>
    </div>
  );
}
