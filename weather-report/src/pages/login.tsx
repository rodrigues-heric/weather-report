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
import { useAuth } from '../contexts/auth-context';
import { useEffect, useState } from 'react';

const HOME_PATH = '/';
const REGISTER_PATH = '/register';

export function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login, error, user } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    if (user) {
      navigate(HOME_PATH, { replace: true });
    }
  }, [user, navigate]);

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLocalError('');

    if (!username || !password) {
      setLocalError(t('login.requiredFields'));
      return;
    }

    try {
      setIsLoading(true);
      await login(username, password);
    } catch (err) {
      setLocalError(t('login.errorMessage'));
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    navigate(REGISTER_PATH);
  };

  return (
    <div className='flex min-h-screen w-full items-center justify-center p-4'>
      <Card className='w-full max-w-sm py-6'>
        <CardHeader>
          <CardTitle>{t('login.title')}</CardTitle>
          <CardDescription>{t('login.description')}</CardDescription>
          <CardAction>
            <Button variant='link' onClick={handleRegister}>
              {t('login.register')}
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='username'>{t('login.email')}</Label>
                <Input
                  id='username'
                  type='text'
                  placeholder={t('login.emailPlaceholder')}
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  disabled={isLoading}
                  required
                />
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
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              {(localError || error) && (
                <div className='text-sm text-red-500'>
                  {localError || error}
                </div>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex-col gap-2'>
          <Button onClick={handleLogin} className='w-full' disabled={isLoading}>
            {isLoading ? '...' : t('login.loginButton')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
