import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/auth-context';
import { LanguageSelector } from './language-selector';
import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import { MobileSidebar } from './mobile-sidebar';

export function AppHeader() {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  return (
    <header className='mb-4 flex items-center justify-between'>
      <div className='hidden items-center gap-2 md:flex'>
        <LanguageSelector />
        <ModeToggle />
      </div>

      {user && (
        <div className='hidden items-center gap-4 md:flex'>
          <span className='text-muted-foreground text-sm'>
            {t('header.hello')}, <strong>{user.username}</strong>
          </span>

          <Button
            variant='outline'
            size='sm'
            onClick={logout}
            className='cursor-pointer gap-2'
          >
            <LogOut className='h-4 w-4' />
            {t('header.logout')}
          </Button>
        </div>
      )}

      <MobileSidebar />
    </header>
  );
}
