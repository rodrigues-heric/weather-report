import { Button } from './ui/button';
import { useTheme } from '@/components/theme-provider';
import { useTranslation } from 'react-i18next';

type Mode = { value: 'light' | 'dark' | 'system'; label: string };

const modes: Mode[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
];

export function MobileModeToggle({ onClose }: { onClose?: () => void }) {
  const { setTheme, theme } = useTheme();
  const { t } = useTranslation();

  const current = theme || 'system';

  return (
    <div className='flex flex-col'>
      <p className='text-muted-foreground text-sm'>{t('mode.theme')}</p>
      <div className='mt-2 grid grid-cols-3 gap-2'>
        {modes.map(m => (
          <Button
            key={m.value}
            variant={current === m.value ? 'default' : 'outline'}
            className='w-full justify-center'
            onClick={() => {
              setTheme(m.value);
              onClose?.();
            }}
            aria-pressed={current === m.value}
          >
            {t(`mode.${m.value}`)}
          </Button>
        ))}
      </div>
    </div>
  );
}
