import { cloneElement } from 'react';
import { Card } from './card';
import { Wind, Droplets, Sun, Gauge, Eye, Thermometer } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { WeatherData } from '@/contexts/weather-data-context';

const DetailBox = ({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string | number;
}) => (
  <Card className='hover:bg-accent/40 group flex cursor-pointer flex-col items-center justify-center p-4 transition-colors'>
    <div className='text-muted-foreground group-hover:text-primary mb-2 transition-colors'>
      {cloneElement(icon, { size: 24 })}
    </div>
    <span className='text-muted-foreground mb-1 text-xs font-bold tracking-wider uppercase'>
      {label}
    </span>
    <span className='text-foreground text-lg font-bold'>{value}</span>
  </Card>
);

export function WeatherDetails({ weatherData }: { weatherData: WeatherData }) {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className='mb-4 ml-1 text-lg font-semibold'>
        {t('weather.details')}
      </h3>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6'>
        <DetailBox
          icon={<Wind />}
          label={t('weather.wind')}
          value={weatherData.windSpeed + ' km/h'}
        />
        <DetailBox
          icon={<Droplets />}
          label={t('weather.humidity')}
          value={weatherData.humidity + '%'}
        />
        <DetailBox
          icon={<Sun />}
          label={t('weather.uvIndex')}
          value={weatherData.uvIndex}
        />
        <DetailBox
          icon={<Eye />}
          label={t('weather.visibility')}
          value={weatherData.visibility + ' km'}
        />
        <DetailBox
          icon={<Gauge />}
          label={t('weather.pressure')}
          value={weatherData.pressure + ' hPa'}
        />
        <DetailBox
          icon={<Thermometer />}
          label={t('weather.feelsLike')}
          value={`${weatherData.feelsLike}° C`}
        />
      </div>
    </div>
  );
}
