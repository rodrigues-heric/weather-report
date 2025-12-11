import { Sun, ArrowDown, ArrowUp } from 'lucide-react';
import { Card } from './card';
import { CardContent } from './card-content';
import { useTranslation } from 'react-i18next';

// MOCK
const currentData = {
  city: 'Porto Alegre',
  state: 'RS',
  temp: 24,
  condition: 'partiallyCloudy',
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

export function WeatherMainCard() {
  const { t } = useTranslation();

  return (
    <section className='space-y-6 lg:col-span-3'>
      <Card className='from-primary/10 to-background border-primary/20 h-full bg-linear-to-b'>
        <CardContent className='flex h-full flex-col items-center justify-center space-y-6 pt-10 text-center'>
          <div className='bg-background border-border rounded-full border p-4 shadow-lg'>
            <Sun size={64} className='animate-pulse-slow text-yellow-500' />
          </div>
          <div>
            <h1 className='text-foreground text-7xl font-bold tracking-tighter'>
              {currentData.temp}°
            </h1>
            <p className='text-muted-foreground mt-2 text-xl font-medium'>
              {t(`weatherConditions.${currentData.condition}`)}
            </p>
          </div>

          <div className='mt-4 grid w-full grid-cols-2 gap-4'>
            <div className='bg-background/50 border-border flex flex-col rounded-lg border p-3'>
              <span className='text-muted-foreground text-xs uppercase'>
                Min
              </span>
              <span className='flex items-center justify-center gap-1 text-lg font-bold'>
                <ArrowDown size={14} className='text-blue-500' />
                {currentData.min}°
              </span>
            </div>
            <div className='bg-background/50 border-border flex flex-col rounded-lg border p-3'>
              <span className='text-muted-foreground text-xs uppercase'>
                Máx
              </span>
              <span className='flex items-center justify-center gap-1 text-lg font-bold'>
                <ArrowUp size={14} className='text-red-500' />
                {currentData.max}°
              </span>
            </div>
          </div>

          <p className='text-muted-foreground px-2 text-sm leading-relaxed'>
            {currentData.description}
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
