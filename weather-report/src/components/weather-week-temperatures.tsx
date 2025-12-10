import { Card } from './card';
import { CardContent } from './card-content';
import { CardHeader } from './card-header';

// MOCK
const dailyData = [
  { day: 'Seg', min: 18, max: 26, condition: 'Sol' },
  { day: 'Ter', min: 19, max: 28, condition: 'Nublado' },
  { day: 'Qua', min: 20, max: 25, condition: 'Chuva' },
  { day: 'Qui', min: 17, max: 22, condition: 'Vento' },
  { day: 'Sex', min: 16, max: 24, condition: 'Sol' },
  { day: 'Sáb', min: 18, max: 27, condition: 'Sol' },
  { day: 'Dom', min: 19, max: 29, condition: 'Quente' },
];

export function WeatherWeekTemperatures() {
  return (
    <Card className='flex flex-col overflow-hidden xl:col-span-1'>
      <CardHeader title='Próximos Dias' />
      <CardContent className='custom-scrollbar flex-1 space-y-4 overflow-y-auto pr-2'>
        {dailyData.map((day, idx) => (
          <div
            key={idx}
            className='hover:bg-accent/50 hover:border-border flex items-center justify-between rounded-lg border border-transparent p-3 transition-colors'
          >
            <span className='w-12 font-medium'>{day.day}</span>
            <div className='flex flex-1 items-center gap-2 px-4'>
              <span className='text-muted-foreground text-xs'>
                {day.condition}
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
