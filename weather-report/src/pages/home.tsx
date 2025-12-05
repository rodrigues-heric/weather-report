import { TodayWeather } from '@/components/today-weather';
import { CityAndClock } from '@/components/city-and-clock';
import { SearchBar } from '@/components/search-bar';

export function Home() {
  return (
    <div className='flex w-full flex-col items-center'>
      <div className='mb-8 w-full'>
        <SearchBar />
      </div>

      <div className='mb-4 flex w-full items-center justify-start gap-x-4'>
        <div className='w-1/4'>
          <CityAndClock />
        </div>

        <div className='w-2/4'>
          <TodayWeather />
        </div>
      </div>
    </div>
  );
}
