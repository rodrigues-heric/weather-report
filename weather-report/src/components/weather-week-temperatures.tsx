import { useTranslation } from 'react-i18next';
import { Card } from './card';
import { CardContent } from './card-content';
import { CardHeader } from './card-header';
import type { WeatherData } from '@/contexts/weather-data-context';
import { getWeekDay } from '@/utils/dates';
import type { JSX } from 'react';
import { mapConditionPTtoEN } from '@/utils/map-condition';
import { getConditionIconSmall } from '@/utils/map-condition-icon';

export function WeatherWeekTemperatures({
  weatherData,
}: {
  weatherData: WeatherData;
}) {
  const { t } = useTranslation();

  let cardData: { day: string; min: number; max: number; icon: JSX.Element }[] =
    [];
  weatherData.forecast.forEach(day => {
    const weekDay = getWeekDay(day.date).slice(0, 3);
    const condition = mapConditionPTtoEN(day.condition);
    const dayIcon = getConditionIconSmall(condition);

    const info = {
      day: t('weekDays.' + weekDay),
      min: Math.round(day.minTemperature),
      max: Math.round(day.maxTemperature),
      icon: dayIcon,
    };
    cardData.push(info);
  });

  return (
    <Card className='flex flex-col overflow-hidden xl:col-span-1'>
      <CardHeader title={t('weather.7DayForecast')} />
      <CardContent className='custom-scrollbar flex-1 space-y-4 overflow-y-auto pr-2'>
        {cardData.map((data, idx) => (
          <div
            key={idx}
            className='hover:bg-accent/50 hover:border-border flex items-center justify-between rounded-lg border border-transparent p-3 transition-colors'
          >
            <span className='w-12 font-medium'>{data.day}</span>
            <div className='flex flex-1 items-center gap-2 px-4'>
              <span className='text-muted-foreground mr-4 text-xs'>
                {data.icon}
              </span>
              <div className='bg-secondary h-1.5 flex-1 overflow-hidden rounded-full'>
                <div
                  className='bg-primary h-full rounded-full'
                  style={{ width: `${(data.min / data.max) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className='w-16 text-right text-sm font-semibold'>
              <span className='text-muted-foreground'>{data.min}°</span> /{' '}
              {data.max}°
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
