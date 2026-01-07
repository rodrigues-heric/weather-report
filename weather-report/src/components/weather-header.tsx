import { MapPin } from 'lucide-react';
import { CitySearch } from './city-search';
import type { City } from './hooks/use-city-search';
import { useState } from 'react';
import { useSendCityData } from './hooks/use-send-city-data';
import { useTranslation } from 'react-i18next';

const displayCity = (city: City | null) => {
  const { t } = useTranslation();

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
    </>
  );
};

export function WeatherHeader() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language == 'pt-BR' ? 'pt' : 'en';

  const handleCitySelection = (city: City) => {
    setSelectedCity(city);
  };

  useSendCityData(selectedCity, currentLanguage);

  return (
    <div className='flex flex-col items-start justify-between pb-2 md:flex-row md:items-center'>
      <div className='relative mb-4 w-full md:hidden'>
        <CitySearch onCitySelect={handleCitySelection} />
      </div>

      <div className='text-muted-foreground flex items-center gap-2'>
        {displayCity(selectedCity)}
      </div>

      <div className='flex items-center gap-4'>
        <div className='relative hidden md:block'>
          <CitySearch onCitySelect={handleCitySelection} />
        </div>
      </div>
    </div>
  );
}
