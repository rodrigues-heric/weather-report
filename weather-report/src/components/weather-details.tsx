import { cloneElement } from 'react';
import { Card } from './card';
import { Wind, Droplets, Sun, Gauge, Eye, Thermometer } from 'lucide-react';

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

export function WeatherDetails() {
  return (
    <div>
      <h3 className='mb-4 ml-1 text-lg font-semibold'>Detalhes do Clima</h3>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6'>
        <DetailBox
          icon={<Wind />}
          label='Vento'
          value={currentData.details.windSpeed}
        />
        <DetailBox
          icon={<Droplets />}
          label='Umidade'
          value={currentData.details.humidity}
        />
        <DetailBox
          icon={<Sun />}
          label='Índice UV'
          value={currentData.details.uvIndex}
        />
        <DetailBox
          icon={<Eye />}
          label='Visibilidade'
          value={currentData.details.visibility}
        />
        <DetailBox
          icon={<Gauge />}
          label='Pressão'
          value={currentData.details.pressure}
        />
        <DetailBox
          icon={<Thermometer />}
          label='Sensação'
          value={`${currentData.feelsLike}°`}
        />
      </div>
    </div>
  );
}
