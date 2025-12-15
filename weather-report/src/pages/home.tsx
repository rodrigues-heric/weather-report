import { useTheme } from '@/components/theme-provider';
import { WeatherHeader } from '@/components/weather-header';
import { WeatherMainCard } from '@/components/weather-main-card';
import { WeatherHourly } from '@/components/weather-hourly';
import { WeatherWeekGraph } from '@/components/weather-week-graph';
import { WeatherWeekTemperatures } from '@/components/weather-week-temperatures';
import { WeatherDetails } from '@/components/weather-details';
import { useWeatherData } from '@/contexts/weather-data-context';
import { Skeleton } from '@/components/ui/skeleton';

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

  const { weatherData, isLoading, error } = useWeatherData();

  let weatherMainCardContent;
  if (!isLoading && weatherData) {
    weatherMainCardContent = <WeatherMainCard />;
  } else if (isLoading || !weatherData) {
    weatherMainCardContent = (
      <Skeleton className='space-y-6 lg:col-span-3'></Skeleton>
    );
  }

  let weatherHourlyContent;
  if (!isLoading && weatherData) {
    weatherHourlyContent = <WeatherHourly />;
  } else if (isLoading || !weatherData) {
    weatherHourlyContent = (
      <Skeleton className='grid h-72 w-full grid-cols-1 gap-6 md:grid-cols-3'></Skeleton>
    );
  }

  let weatherWeekGraph;
  if (!isLoading && weatherData) {
    weatherWeekGraph = (
      <WeatherWeekGraph
        chartColorMax={chartColorMax}
        chartColorMin={chartColorMin}
        gridColor={gridColor}
        theme={effectiveTheme}
      />
    );
  } else if (isLoading || !weatherData) {
    weatherWeekGraph = (
      <Skeleton className='flex flex-col xl:col-span-2'></Skeleton>
    );
  }

  let weatherWeekTemperatures;
  if (!isLoading && weatherData) {
    weatherWeekTemperatures = <WeatherWeekTemperatures />;
  } else if (isLoading || !weatherData) {
    weatherWeekTemperatures = <Skeleton className='h-72'></Skeleton>;
  }

  let weatherDetailsContent;
  if (!isLoading && weatherData) {
    weatherDetailsContent = <WeatherDetails />;
  } else if (isLoading || !weatherData) {
    weatherDetailsContent = <Skeleton className='h-48'></Skeleton>;
  }

  return (
    <div className='mx-auto w-full space-y-2'>
      <WeatherHeader />

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
        {weatherMainCardContent}

        <section className='space-y-6 lg:col-span-9'>
          {weatherHourlyContent}

          <div className='grid grid-cols-1 gap-6 xl:grid-cols-3'>
            {weatherWeekGraph}
            {weatherWeekTemperatures}
          </div>

          {weatherDetailsContent}
        </section>
      </div>
    </div>
  );
}
