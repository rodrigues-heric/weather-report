import { WeatherMainCard } from '@/components/weather-main-card';
import { Skeleton } from '@/components/ui/skeleton';
import type { WeatherData } from '@/contexts/weather-data-context';
import type { JSX } from 'react';
import { WeatherHourly } from '@/components/weather-hourly';
import { WeatherWeekGraph } from '@/components/weather-week-graph';
import { WeatherWeekTemperatures } from '@/components/weather-week-temperatures';
import { WeatherDetails } from '@/components/weather-details';

export function getHomeMainCard(
  isLoading: boolean,
  weatherData: WeatherData | null
): JSX.Element {
  if (!isLoading && weatherData)
    return <WeatherMainCard weatherData={weatherData} />;
  if (isLoading)
    return <Skeleton className='space-y-6 lg:col-span-3'></Skeleton>;
  return <></>;
}

export function getHomeHourlyCard(
  isLoading: boolean,
  weatherData: WeatherData | null
): JSX.Element {
  if (!isLoading && weatherData)
    return <WeatherHourly weatherData={weatherData} />;
  if (isLoading)
    return (
      <Skeleton className='grid h-72 w-full grid-cols-1 gap-6 md:grid-cols-3'></Skeleton>
    );
  return <></>;
}

export function getHomeWeekGraph(
  isLoading: boolean,
  weatherData: WeatherData | null,
  chartInfo: {
    chartColorMax: string;
    chartColorMin: string;
    gridColor: string;
    theme: 'dark' | 'light';
  }
): JSX.Element {
  if (!isLoading && weatherData)
    return (
      <WeatherWeekGraph
        weatherData={weatherData}
        chartColorMax={chartInfo.chartColorMax}
        chartColorMin={chartInfo.chartColorMin}
        gridColor={chartInfo.gridColor}
        theme={chartInfo.theme}
      />
    );
  if (isLoading)
    return <Skeleton className='flex flex-col xl:col-span-2'></Skeleton>;
  return <></>;
}

export function getHomeWeekTemperatures(
  isLoading: boolean,
  weatherData: WeatherData | null
): JSX.Element {
  if (!isLoading && weatherData)
    return <WeatherWeekTemperatures weatherData={weatherData} />;
  if (isLoading) return <Skeleton className='h-72'></Skeleton>;
  return <></>;
}

export function getHomeDetailsCard(
  isLoading: boolean,
  weatherData: WeatherData | null
): JSX.Element {
  if (!isLoading && weatherData)
    return <WeatherDetails weatherData={weatherData} />;
  if (isLoading) return <Skeleton className='h-48'></Skeleton>;
  return <></>;
}
