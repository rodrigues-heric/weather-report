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
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <Card className='flex flex-col xl:col-span-2'>
      <CardHeader
        title={t('weather.7DayVariation')}
        icon={<Calendar size={18} />}
      />
      <CardContent className='min-h-0 flex-1'>
        <div className='h-64 xl:h-full'>
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart
              data={dailyData}
              margin={{ top: 10, right: 10, left: -20, bottom: 30 }}
            >
              <defs>
                <linearGradient id='colorMax' x1='0' y1='0' x2='0' y2='1'>
                  <stop
                    offset='5%'
                    stopColor={chartColorMax}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset='95%'
                    stopColor={chartColorMax}
                    stopOpacity={0}
                  />
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
                interval={0}
                angle={-25}
                textAnchor='end'
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
                name={t('weather.max')}
              />
              <Area
                type='monotone'
                dataKey='min'
                stroke={chartColorMin}
                strokeWidth={2}
                fill='transparent'
                strokeDasharray='4 4'
                name={t('weather.min')}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
