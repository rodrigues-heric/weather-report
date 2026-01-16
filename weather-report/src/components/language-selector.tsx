('use client');

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useTranslation } from 'react-i18next';

type Status = {
  value: string;
  label: string;
};

const statuses: Status[] = [
  {
    value: 'en',
    label: 'English',
  },
  {
    value: 'pt-BR',
    label: 'Português',
  },
];

export function LanguageSelector() {
  const [open, setOpen] = useState(false);

  const { i18n, t } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language;
  const currentStatus = statuses.find(
    status => status.value === currentLanguage
  );
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(
    currentStatus || null
  );

  return (
    <div className='flex items-center space-x-4'>
      <p className='text-muted-foreground text-sm'>{t('language.language')}</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className='w-[150px] cursor-pointer justify-start'
          >
            {selectedStatus?.label || currentStatus?.label || currentLanguage}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='p-0' side='bottom' align='start'>
          <Command>
            <CommandInput placeholder={t('language.selectLanguage')} />
            <CommandList>
              <CommandEmpty>{t('language.noResults')}</CommandEmpty>
              <CommandGroup>
                {statuses.map(status => (
                  <CommandItem
                    className='cursor-pointer'
                    key={status.value}
                    value={status.label}
                    onSelect={selectedLabel => {
                      const selectedStatus = statuses.find(
                        s => s.label === selectedLabel
                      );
                      if (selectedStatus) {
                        setSelectedStatus(selectedStatus);
                        setOpen(false);
                        changeLanguage(selectedStatus.value);
                      }
                    }}
                  >
                    {status.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
