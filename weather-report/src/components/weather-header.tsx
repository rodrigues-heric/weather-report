import { MapPin } from 'lucide-react';
import { CitySearch } from './city-search';

// MOCK
const currentData = {
  city: 'Porto Alegre',
  state: 'RS',
  temp: 24,
  condition: 'Parcialmente Nublado',
  min: 18,
  max: 28,
  feelsLike: 26,
  description:
    'O céu permanecerá nublado durante a tarde, com possibilidade de garoa à noite.',
  details: {
    humidity: '65%',
    pressure: '1012 hPa',
    visibility: '10 km',
    uvIndex: 'Moderado (4)',
    windSpeed: '12 km/h',
    airQuality: 'Bom (42)',
  },
};

export function WeatherHeader() {
  return (
    <header className='flex items-center justify-between pb-2'>
      <div className='text-muted-foreground flex items-center gap-2'>
        <MapPin className='h-5 w-5' />
        <span className='text-foreground text-lg font-medium'>
          {currentData.city}, {currentData.state}
        </span>
      </div>

      <div className='flex items-center gap-4'>
        <div className='relative hidden md:block'>
          <CitySearch />
        </div>
      </div>
    </header>
  );
}
