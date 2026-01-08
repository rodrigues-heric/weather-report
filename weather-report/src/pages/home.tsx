import { useTheme } from '@/components/theme-provider';
import { WeatherHeader } from '@/components/weather-header';
import { useWeatherData } from '@/contexts/weather-data-context';
import {
  getHomeMainCard,
  getHomeDetailsCard,
  getHomeHourlyCard,
  getHomeWeekGraph,
  getHomeWeekTemperatures,
} from '@/utils/home-cards';

export function Home() {
  const { theme } = useTheme();
  const effectiveTheme =
    theme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : theme;

  const yellowForDark = '#fbbf24';
  const orangeForLight = '#f59e0b';
  const blueForDark = '#3b82f6';
  const blueForLight = '#0ea5e9';

  const chartColorMax =
    effectiveTheme === 'dark' ? yellowForDark : orangeForLight;
  const chartColorMin = effectiveTheme === 'dark' ? blueForDark : blueForLight;
  const gridColor = effectiveTheme === 'dark' ? '#333' : '#e5e5e5';
  const chartInfo = {
    chartColorMax: chartColorMax,
    chartColorMin: chartColorMin,
    gridColor: gridColor,
    theme: effectiveTheme,
  };

  const { weatherData, isLoading } = useWeatherData();

  return (
    <div className='mx-auto w-full space-y-2'>
      <WeatherHeader />

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
        {getHomeMainCard(isLoading, weatherData)}

        <section className='space-y-6 lg:col-span-9'>
          {getHomeHourlyCard(isLoading, weatherData)}

          <div className='grid grid-cols-1 gap-6 xl:grid-cols-3'>
            {getHomeWeekGraph(isLoading, weatherData, chartInfo)}
            {getHomeWeekTemperatures(isLoading, weatherData)}
          </div>

          {getHomeDetailsCard(isLoading, weatherData)}
        </section>
      </div>
    </div>
  );
}
