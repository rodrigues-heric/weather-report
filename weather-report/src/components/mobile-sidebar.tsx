import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { MobileLanguageSelector } from './mobile-language-selector';
import { MobileModeToggle } from './mobile-mode-toggle';
import { useAuth } from '@/contexts/auth-context';
import { useTranslation } from 'react-i18next';

export function MobileSidebar() {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div className='flex w-full justify-start md:hidden'>
      <Sheet open={open} onOpenChange={setOpen}>
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
          <div className='flex flex-col gap-6 px-4'>
            <div className='flex flex-col gap-4'>
              <MobileLanguageSelector onClose={() => setOpen(false)} />
              <MobileModeToggle onClose={() => setOpen(false)} />
            </div>
          </div>
          {user && (
            <SheetFooter>
              <Button
                variant='destructive'
                onClick={logout}
                className='w-full gap-2 justify-self-center'
              >
                {t('header.logout')}
              </Button>
              <SheetClose asChild>
                <Button variant='outline'>{t('actions.close')}</Button>
              </SheetClose>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
