import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/auth-context';
import { LanguageSelector } from './language-selector';
import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';

export function AppHeader() {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  return (
    <header className='mb-4 flex items-center justify-between'>
      <div className='flex items-center gap-2'>
        <LanguageSelector />
        <ModeToggle />
      </div>

      {user && (
        <div className='flex items-center gap-4'>
          <span className='text-muted-foreground hidden text-sm md:block'>
            {t('header.hello')}, <strong>{user.username}</strong>
          </span>

          <Button
            variant='outline'
            size='sm'
            onClick={logout}
            className='gap-2'
          >
            <LogOut className='h-4 w-4' />
            {t('header.logout')}
          </Button>
        </div>
      )}
    </header>
  );
}
