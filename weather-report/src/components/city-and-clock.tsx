import { useEffect, useState } from 'react';
import { TitleH2 } from './title-h2';
import { TitleH3 } from './title-h3';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { updateClock } from '@/utils/clock';
import { monthToString, type TMonth } from '@/utils/month-to-string';
import { weekToString, type TWeek } from '@/utils/week-to-string';
import { useTranslation } from 'react-i18next';

const TITLE: string = 'Porto Alegre';
const ONE_SECOND: number = 1000;

export function CityAndClock() {
  const [clock, setClock] = useState(updateClock());
  useEffect(() => {
    const interval = setInterval(() => {
      setClock(updateClock());
    }, ONE_SECOND);

    return () => clearInterval(interval);
  }, []);

  const todayDate: Date = new Date();
  const currentMonth: string = monthToString(
    (todayDate.getMonth() + 1) as TMonth
  );
  const currentWeekDay: string = weekToString(
    (todayDate.getDay() + 1) as TWeek
  );
  const currentDay: number = todayDate.getDate();

  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;

  let dateHTML;
  if (currentLanguage === 'en') {
    dateHTML = (
      <p className='text-muted-foreground text-sm'>
        {t('week.' + currentWeekDay)}, {t('month.' + currentMonth)} {currentDay}
      </p>
    );
  } else {
    dateHTML = (
      <p className='text-muted-foreground text-sm'>
        {t('week.' + currentWeekDay)}, {currentDay} de{' '}
        {t('month.' + currentMonth)}
      </p>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <TitleH3 title={TITLE} />
        </CardTitle>
        <CardDescription>{dateHTML}</CardDescription>
      </CardHeader>
      <CardContent>
        <TitleH2 title={clock} />
      </CardContent>
    </Card>
  );
}
