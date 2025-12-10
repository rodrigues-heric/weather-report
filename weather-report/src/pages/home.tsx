import { useTheme } from '@/components/theme-provider';
import { WeatherHeader } from '@/components/weather-header';
import { WeatherMainCard } from '@/components/weather-main-card';
import { WeatherHourly } from '@/components/weather-hourly';
import { WeatherWeekGraph } from '@/components/weather-week-graph';
import { WeatherWeekTemperatures } from '@/components/weather-week-temperatures';
import { WeatherDetails } from '@/components/weather-details';

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

  return (
    <div className='mx-auto w-full space-y-2'>
      <WeatherHeader />

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
        <WeatherMainCard />

        <section className='space-y-6 lg:col-span-9'>
          <WeatherHourly />

          <div className='grid h-[400px] grid-cols-1 gap-6 xl:grid-cols-3'>
            <WeatherWeekGraph
              chartColorMax={chartColorMax}
              chartColorMin={chartColorMin}
              gridColor={gridColor}
              theme={effectiveTheme}
            />

            <WeatherWeekTemperatures />
          </div>

          <WeatherDetails />
        </section>
      </div>
    </div>
  );
}
