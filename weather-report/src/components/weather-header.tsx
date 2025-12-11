import { MapPin, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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
          <Search className='text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4' />
          <input
            type='text'
            placeholder={t('search.placeholder')}
            className='border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring h-10 w-[250px] rounded-md border px-3 py-2 pl-9 text-sm focus-visible:ring-2 focus-visible:outline-none'
          />
        </div>
      </div>
    </header>
  );
}
