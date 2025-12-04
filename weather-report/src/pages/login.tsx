import { Label } from '@radix-ui/react-label';
import { Button } from '../components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = () => {
    navigate('/');
  };

  return (
    <Card className='w-full max-w-sm'>
      <CardHeader>
        <CardTitle>{t('login.title')}</CardTitle>
        <CardDescription>{t('login.description')}</CardDescription>
        <CardAction>
          <Button variant='link'>{t('login.register')}</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className='flex flex-col gap-6'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>{t('login.email')}</Label>
              <Input
                id='email'
                type='email'
                placeholder={t('login.emailPlaceholder')}
                required
              ></Input>
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>{t('login.password')}</Label>
                <a
                  href='#'
                  className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                >
                  {t('login.forgotPassword')}
                </a>
              </div>
              <Input
                id='password'
                type='password'
                placeholder='*******'
                required
              ></Input>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className='flex-col gap-2'>
        <Button onClick={handleLogin} className='w-full'>
          {t('login.loginButton')}
        </Button>
      </CardFooter>
    </Card>
  );
}
