import {
  GaugeIcon,
  SunIcon,
  SunriseIcon,
  SunsetIcon,
  TriangleAlertIcon,
  WavesIcon,
  WindIcon,
} from 'lucide-react';
import { TitleH2 } from './title-h2';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { useTranslation } from 'react-i18next';

export function TodayWeather() {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <TitleH2 title='27 °C' />
        </CardTitle>
        <CardDescription>
          {t('weather.feelsLike')}: <span className='font-bold'>29 °C</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-row items-center justify-between'>
          <div className='basis-1/3'>
            <div className='mb-4 flex flex-col items-center justify-center'>
              <SunIcon className='h-16 w-16 text-yellow-400' />
              <div className='text-muted-foreground'>Ensolarado</div>
            </div>
            <div className='flex flex-row'>
              <div className='basis-1/2'>
                <div className='flex flex-col items-center justify-center'>
                  <SunriseIcon className='mt-4 h-8 w-8 text-orange-400' />
                  <div className='text-muted-foreground text-sm font-bold'>
                    06:12
                  </div>
                  <div className='text-muted-foreground text-sm'>
                    {t('weather.sunrise')}
                  </div>
                </div>
              </div>
              <div className='basis-1/2'>
                <div className='flex flex-col items-center justify-center'>
                  <SunsetIcon className='mt-4 h-8 w-8 text-red-400' />
                  <div className='text-muted-foreground text-sm font-bold'>
                    19:45
                  </div>
                  <div className='text-muted-foreground text-sm'>
                    {t('weather.sunset')}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='basis-2/3'>
            <div className='flex flex-row'>
              <div className='basis-1/2'>
                <div className='mb-4 flex flex-col items-center justify-center'>
                  <WavesIcon className='h-12 w-12 text-blue-400' />
                  <div className='text-muted-foreground text-sm font-bold'>
                    41%
                  </div>
                  <div className='text-muted-foreground text-sm'>
                    {t('weather.humidity')}
                  </div>
                </div>

                <div className='flex flex-col items-center justify-center'>
                  <WindIcon className='h-12 w-12 text-gray-400' />
                  <div className='text-muted-foreground text-sm font-bold'>
                    2km/h
                  </div>
                  <div className='text-muted-foreground text-sm'>
                    {t('weather.wind')}
                  </div>
                </div>
              </div>
              <div className='basis-1/2'>
                <div className='mb-4 flex flex-col items-center justify-center'>
                  <GaugeIcon className='h-12 w-12 text-green-400' />
                  <div className='text-muted-foreground text-sm font-bold'>
                    997hPa
                  </div>
                  <div className='text-muted-foreground text-sm'>
                    {t('weather.pressure')}
                  </div>
                </div>
                <div className='flex flex-col items-center justify-center'>
                  <TriangleAlertIcon className='h-12 w-12 text-red-400' />
                  <div className='text-muted-foreground text-sm font-bold'>
                    7
                  </div>
                  <div className='text-muted-foreground text-sm'>
                    {t('weather.uvIndex')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
