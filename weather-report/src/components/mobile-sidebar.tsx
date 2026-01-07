import { LogOut, Menu } from 'lucide-react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { LanguageSelector } from './language-selector';
import { ModeToggle } from './mode-toggle';
import { useAuth } from '@/contexts/auth-context';
import { useTranslation } from 'react-i18next';

export function MobileSidebar() {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  return (
    <div className='flex w-full justify-end md:hidden'>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon'>
            <Menu className='h-5 w-5' />
          </Button>
        </SheetTrigger>

        <SheetContent side='left'>
          {' '}
          <SheetHeader>
            <SheetTitle className='text-left'>Menu</SheetTitle>
            {user && (
              <SheetDescription>
                {t('header.hello')}, {user.username}
              </SheetDescription>
            )}
          </SheetHeader>
          <div className='mt-8 flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
              <LanguageSelector />
              <ModeToggle />
            </div>
          </div>
          {user && (
            <SheetFooter>
              <Button
                variant='destructive'
                onClick={logout}
                className='w-full justify-start gap-2'
              >
                <LogOut className='h-4 w-4' />
                {t('header.logout')}
              </Button>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
