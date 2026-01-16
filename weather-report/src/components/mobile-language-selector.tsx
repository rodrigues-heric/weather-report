import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';

type Lang = { value: string; label: string };

const languages: Lang[] = [
  { value: 'en', label: 'English' },
  { value: 'pt-BR', label: 'Português' },
];

export function MobileLanguageSelector({ onClose }: { onClose?: () => void }) {
  const { i18n, t } = useTranslation();
  const current = i18n.language;

  const handleCloseSheet = (res: any) => {
    if (res && typeof (res as any).then === 'function') {
      (res as Promise<unknown>).then(() => onClose?.());
    } else {
      onClose?.();
    }
  };

  return (
    <div className='flex flex-col'>
      <p className='text-muted-foreground text-sm'>{t('language.language')}</p>
      <div className='mt-2 grid grid-cols-2 gap-2'>
        {languages.map(lang => (
          <Button
            key={lang.value}
            variant={current === lang.value ? 'default' : 'outline'}
            className='w-full justify-center'
            onClick={() => {
              const res = i18n.changeLanguage(lang.value);
              handleCloseSheet(res);
            }}
            aria-pressed={current === lang.value}
          >
            {lang.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
