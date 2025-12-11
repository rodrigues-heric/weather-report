import { useTranslation } from 'react-i18next';
import { Card } from './card';
import { CardContent } from './card-content';
import { CardHeader } from './card-header';
import { Sun, CloudRain, Wind } from 'lucide-react';

// MOCK
const dailyData = [
  { day: 'Seg', min: 18, max: 26, icon: <Sun size={18} /> },
  { day: 'Ter', min: 19, max: 28, icon: <CloudRain size={18} /> },
  { day: 'Qua', min: 20, max: 25, icon: <CloudRain size={18} /> },
  { day: 'Qui', min: 17, max: 22, icon: <Wind size={18} /> },
  { day: 'Sex', min: 16, max: 24, icon: <Sun size={18} /> },
  { day: 'Sáb', min: 18, max: 27, icon: <Sun size={18} /> },
  { day: 'Dom', min: 19, max: 29, icon: <Sun size={18} /> },
];

export function WeatherWeekTemperatures() {
  const { t } = useTranslation();

  return (
    <Card className='flex flex-col overflow-hidden xl:col-span-1'>
      <CardHeader title={t('weather.7DayForecast')} />
      <CardContent className='custom-scrollbar flex-1 space-y-4 overflow-y-auto pr-2'>
        {dailyData.map((day, idx) => (
          <div
            key={idx}
            className='hover:bg-accent/50 hover:border-border flex items-center justify-between rounded-lg border border-transparent p-3 transition-colors'
          >
            <span className='w-12 font-medium'>{day.day}</span>
            <div className='flex flex-1 items-center gap-2 px-4'>
              <span className='text-muted-foreground mr-4 text-xs'>
                {day.icon}
              </span>
              <div className='bg-secondary h-1.5 flex-1 overflow-hidden rounded-full'>
                <div
                  className='bg-primary h-full rounded-full'
                  style={{ width: `${(day.max / 35) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className='w-16 text-right text-sm font-semibold'>
              <span className='text-muted-foreground'>{day.min}°</span> /{' '}
              {day.max}°
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
