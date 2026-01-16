import { ClockIcon } from 'lucide-react';
import { Card } from './card';
import { CardHeader } from './card-header';
import { CardContent } from './card-content';
import { useTranslation } from 'react-i18next';
import type { WeatherData } from '@/contexts/weather-data-context';
import { mapConditionPTtoEN } from '@/utils/map-condition';
import { getConditionIconSmall } from '@/utils/map-condition-icon';
import type { JSX } from 'react';

export function WeatherHourly({ weatherData }: { weatherData: WeatherData }) {
  const { t } = useTranslation();

  let hourlyIconList: JSX.Element[] = [];
  weatherData.hourly.forEach(hour => {
    const condition = mapConditionPTtoEN(hour.condition);
    hourlyIconList.push(getConditionIconSmall(condition));
  });

  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
      <Card className='md:col-span-3'>
        <CardHeader title={t('weather.hourlyWeather')} icon={<ClockIcon />} />
        <CardContent>
          <div className='no-scrollbar flex items-center justify-between gap-4 overflow-x-auto pb-4'>
            {weatherData.hourly.map((item, idx) => (
              <div
                key={idx}
                className='hover:bg-accent hover:border-border flex min-w-20 cursor-default flex-col items-center rounded-xl border border-transparent p-3 transition-colors'
              >
                <span className='text-muted-foreground mb-2 text-sm'>
                  {item.time}
                </span>
                <div className='text-foreground mb-2'>
                  {hourlyIconList[idx]}
                </div>
                <span className='text-lg font-bold'>
                  {Math.round(item.temperature)}° C
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
