import { Calendar } from 'lucide-react';
import { Card } from './card';
import { CardHeader } from './card-header';
import { CardContent } from './card-content';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

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

export function WeatherWeekGraph({
  chartColorMax,
  chartColorMin,
  gridColor,
  theme,
}: {
  chartColorMax: string;
  chartColorMin: string;
  gridColor: string;
  theme: string;
}) {
  return (
    <Card className='flex flex-col xl:col-span-2'>
      <CardHeader
        title='Variação de Temperatura (7 Dias)'
        icon={<Calendar size={18} />}
      />
      <CardContent className='min-h-0 flex-1'>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart
            data={dailyData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id='colorMax' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor={chartColorMax} stopOpacity={0.3} />
                <stop offset='95%' stopColor={chartColorMax} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray='3 3'
              vertical={false}
              stroke={gridColor}
              opacity={0.4}
            />
            <XAxis
              dataKey='day'
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'currentColor', opacity: 0.5 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'currentColor', opacity: 0.5 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#1f2937' : '#fff',
                borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
            <Area
              type='monotone'
              dataKey='max'
              stroke={chartColorMax}
              strokeWidth={3}
              fillOpacity={1}
              fill='url(#colorMax)'
              name='Máxima'
            />
            <Area
              type='monotone'
              dataKey='min'
              stroke={chartColorMin}
              strokeWidth={2}
              fill='transparent'
              strokeDasharray='4 4'
              name='Mínima'
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
