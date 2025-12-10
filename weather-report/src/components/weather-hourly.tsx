import { ClockIcon, Sun, CloudRain, Wind, Moon } from 'lucide-react';
import { Card } from './card';
import { CardHeader } from './card-header';
import { CardContent } from './card-content';

// MOCK
const hourlyForecast = [
  { time: '14:00', temp: 24, icon: <Sun size={18} /> },
  { time: '15:00', temp: 25, icon: <Sun size={18} /> },
  { time: '16:00', temp: 24, icon: <CloudRain size={18} /> },
  { time: '17:00', temp: 23, icon: <CloudRain size={18} /> },
  { time: '18:00', temp: 22, icon: <Wind size={18} /> },
  { time: '19:00', temp: 21, icon: <Wind size={18} /> },
  { time: '20:00', temp: 20, icon: <Moon size={18} /> },
  { time: '21:00', temp: 19, icon: <Moon size={18} /> },
];

export function WeatherHourly() {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
      <Card className='md:col-span-3'>
        <CardHeader title='Previsão por Hora' icon={<ClockIcon />} />
        <CardContent>
          <div className='no-scrollbar flex items-center justify-between gap-4 overflow-x-auto pb-4'>
            {hourlyForecast.map((item, idx) => (
              <div
                key={idx}
                className='hover:bg-accent hover:border-border flex min-w-20 cursor-default flex-col items-center rounded-xl border border-transparent p-3 transition-colors'
              >
                <span className='text-muted-foreground mb-2 text-sm'>
                  {item.time}
                </span>
                <div className='text-foreground mb-2'>{item.icon}</div>
                <span className='text-lg font-bold'>{item.temp}°</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
