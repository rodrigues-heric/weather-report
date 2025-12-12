import React, { useState } from 'react';
import { Search, Loader2, MapPin } from 'lucide-react';
import { useCitySearch, type City } from '@/components/hooks/use-city-search';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useTranslation } from 'react-i18next';
interface CitySearchProps {
  onCitySelect: (city: City) => void;
}

export function CitySearch({ onCitySelect }: CitySearchProps) {
  const { t } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const { query, setQuery, suggestions, isLoading, clearSuggestions } =
    useCitySearch();

  const showSuggestions = suggestions.length > 0;

  const handleSelectCity = (city: City) => {
    setQuery(`${city.name}, ${city.country}`);
    clearSuggestions();
    onCitySelect(city);
  };

  const handleValidation = () => {
    const exactMatch = suggestions.find(
      city => city.name.toLowerCase() === query.toLowerCase()
    );

    if (exactMatch) {
      clearSuggestions();
      onCitySelect(exactMatch);
    } else {
      setIsDialogOpen(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleValidation();
    }
  };

  return (
    <div className='relative mx-auto w-full max-w-md space-y-2'>
      <div className='relative'>
        <Search className='text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4' />
        <Input
          type='text'
          placeholder={t('search.placeholder')}
          className='pr-10 pl-9'
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {isLoading && (
          <div className='absolute top-3 right-3'>
            <Loader2 className='text-muted-foreground h-4 w-4 animate-spin' />
          </div>
        )}
      </div>

      {showSuggestions && (
        <Card className='animate-in fade-in-0 zoom-in-95 absolute top-full right-0 left-0 z-50 mt-1.5 max-h-60 overflow-y-auto shadow-lg'>
          <ul className='px-1'>
            {suggestions.map(city => (
              <li
                key={city.id}
                onClick={() => handleSelectCity(city)}
                className='hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors'
              >
                <MapPin className='text-muted-foreground h-4 w-4' />
                <div className='flex flex-col'>
                  <span className='font-medium'>{city.name}</span>
                  <span className='text-muted-foreground text-xs'>
                    {city.admin1 ? `${city.admin1}, ` : ''}
                    {city.country}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('search.notFoundTitle')}</DialogTitle>
            <DialogDescription>
              {t('search.notFoundDescription')} <strong>"{query}"</strong>.{' '}
              {t('search.checkSpelling')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='secondary' onClick={() => setIsDialogOpen(false)}>
              {t('search.ok')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
