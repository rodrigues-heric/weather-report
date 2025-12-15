import { MapPin } from 'lucide-react';
import { CitySearch } from './city-search';
import type { City } from './hooks/use-city-search';
import { useState } from 'react';
import { useSendCityData } from './hooks/use-send-city-data';

const displayCity = (city: City | null) => {
  if (!city) {
    return (
      <span className='text-foreground text-lg font-medium'>
        Selecione uma cidade
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

  const handleCitySelection = (city: City) => {
    setSelectedCity(city);
  };

  useSendCityData(selectedCity);

  return (
    <header className='flex items-center justify-between pb-2'>
      <div className='text-muted-foreground flex items-center gap-2'>
        {displayCity(selectedCity)}
      </div>

      <div className='flex items-center gap-4'>
        <div className='relative hidden md:block'>
          <CitySearch onCitySelect={handleCitySelection} />
        </div>
      </div>
    </header>
  );
}
