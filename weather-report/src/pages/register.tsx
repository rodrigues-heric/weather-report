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

const PATH_LOGIN = '/login';

export function Register() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { register, error, user } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    if (user) {
      navigate(PATH_LOGIN, { replace: true });
    }
  }, [user, navigate]);

  const handleRegister = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLocalError('');

    if (!username || !password || !confirmPassword) {
      setLocalError(t('register.requiredFields'));
      return;
    }

    if (password !== confirmPassword) {
      setLocalError(t('register.passwordsNotMatch'));
      return;
    }

    if (password.length < 6) {
      setLocalError(t('register.passwordMinLength'));
      return;
    }

    try {
      setIsLoading(true);
      await register(username, password);
      navigate(PATH_LOGIN);
    } catch (err) {
      setLocalError(error || t('register.errorMessage'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = () => {
    navigate(PATH_LOGIN);
  };

  return (
    <div className='flex min-h-screen w-full items-center justify-center p-4'>
      <Card className='w-full max-w-sm py-6'>
        <CardHeader>
          <CardTitle>{t('register.title')}</CardTitle>
          <CardDescription>{t('register.description')}</CardDescription>
          <CardAction>
            <Button
              variant='link'
              onClick={handleSignIn}
              className='cursor-pointer'
            >
              {t('register.alreadyHaveAccount')}
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='username'>{t('register.username')}</Label>
                <Input
                  id='username'
                  type='text'
                  placeholder={t('register.usernamePlaceholder')}
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='password'>{t('register.password')}</Label>
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
              <div className='grid gap-2'>
                <Label htmlFor='confirmPassword'>
                  {t('register.confirmPassword')}
                </Label>
                <Input
                  id='confirmPassword'
                  type='password'
                  placeholder='*******'
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
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
          <Button
            onClick={handleRegister}
            className={`w-full ${!isLoading ? 'cursor-pointer' : 'cursor-progress'}`}
            disabled={isLoading}
          >
            {isLoading ? '...' : t('register.registerButton')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
