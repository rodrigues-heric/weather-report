import { TitleH2 } from '@/components/title-h2';
import { TitleH3 } from '@/components/title-h3';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import { monthToString, type TMonth } from '@/utils/month-to-string';
import { weekToString, type TWeek } from '@/utils/week-to-string';
import { updateClock } from '@/utils/clock';

import { SearchIcon } from 'lucide-react';

const TITLE = 'Porto Alegre';
const ONE_SECOND = 1000;

export function Home() {
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

  const [clock, setClock] = useState(updateClock());
  useEffect(() => {
    const interval = setInterval(() => {
      setClock(updateClock());
    }, ONE_SECOND);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='w-full mb-8'>
        <InputGroup>
          <InputGroupInput placeholder={t('search.placeholder')} />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupAddon align='inline-end'>
            <InputGroupButton>{t('search.buttonSearch')}</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className='w-full flex gap-x-4 items-center justify-start mb-4'>
        <Card className='w-1/3'>
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

        <Card className='w-2/3'>
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
      </div>

      <div className='w-full flex gap-x-4 items-center justify-start'>
        <Card className='w-2/3'>
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
        <Card className='w-1/3'>
          <CardHeader>
            <CardTitle>
              <TitleH3 title={TITLE} />
            </CardTitle>
            <CardDescription>{dateHTML}</CardDescription>
          </CardHeader>
          <CardContent>
            <TitleH2 title={clock} />
          </CardContent>
        </Card>{' '}
      </div>
    </div>
  );
}
