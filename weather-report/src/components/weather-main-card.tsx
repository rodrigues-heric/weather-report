import { Sun, ArrowDown, ArrowUp, Sunrise, Sunset } from 'lucide-react';
import { Card } from './card';
import { CardContent } from './card-content';
import { useTranslation } from 'react-i18next';
import type { WeatherData } from '@/contexts/weather-data-context';
import { mapConditionPTtoEN } from '@/utils/map-condition';
import { getConditionIconBig } from '@/utils/map-condition-icon.tsx';

export function WeatherMainCard({ weatherData }: { weatherData: WeatherData }) {
  const { t } = useTranslation();

  const conditionEN = mapConditionPTtoEN(weatherData.condition);
  const conditionIcon = getConditionIconBig(conditionEN);

  return (
    <section className='space-y-6 lg:col-span-3'>
      <Card className='from-primary/10 to-background border-primary/20 h-full bg-linear-to-b'>
        <CardContent className='flex h-full flex-col items-center justify-center space-y-6 pt-10 text-center'>
          <div className='bg-background border-border rounded-full border p-4 shadow-lg'>
            {conditionIcon}
          </div>
          <div>
            <h1 className='text-foreground text-7xl font-bold tracking-tighter'>
              {Math.round(weatherData.temperature)}° C
            </h1>
            <p className='text-muted-foreground mt-2 text-xl font-medium'>
              {t(
                `weatherConditions.${mapConditionPTtoEN(weatherData.condition)}`
              )}
            </p>
          </div>

          <div className='mt-4 grid w-full grid-cols-2 gap-4'>
            <div className='bg-background/50 border-border flex flex-col rounded-lg border p-3'>
              <span className='text-muted-foreground text-xs uppercase'>
                {t('weather.min')}
              </span>
              <span className='flex items-center justify-center gap-1 text-lg font-bold'>
                <ArrowDown size={14} className='text-blue-500' />
                {Math.round(weatherData.minTemperature)}° C
              </span>
            </div>
            <div className='bg-background/50 border-border flex flex-col rounded-lg border p-3'>
              <span className='text-muted-foreground text-xs uppercase'>
                {t('weather.max')}
              </span>
              <span className='flex items-center justify-center gap-1 text-lg font-bold'>
                <ArrowUp size={14} className='text-red-500' />
                {Math.round(weatherData.maxTemperature)}° C
              </span>
            </div>
            <div className='bg-background/50 border-border flex flex-col rounded-lg border p-3'>
              <span className='text-muted-foreground text-xs uppercase'>
                {t('weather.sunrise')}
              </span>
              <span className='flex items-center justify-center gap-1 text-lg font-bold'>
                <Sunrise size={14} className='text-yellow-300' />
                {weatherData.sunrise || '--:--'}
              </span>
            </div>
            <div className='bg-background/50 border-border flex flex-col rounded-lg border p-3'>
              <span className='text-muted-foreground text-xs uppercase'>
                {t('weather.sunset')}
              </span>
              <span className='flex items-center justify-center gap-1 text-lg font-bold'>
                <Sunset size={14} className='text-yellow-600' />
                {weatherData.sunset || '--:--'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
