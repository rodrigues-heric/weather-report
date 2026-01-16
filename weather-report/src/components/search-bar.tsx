import { SearchIcon } from 'lucide-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from './ui/input-group';
import { useTranslation } from 'react-i18next';

export function SearchBar() {
  const { t } = useTranslation();

  return (
    <InputGroup>
      <InputGroupInput placeholder={t('search.placeholder')} />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupAddon align='inline-end'>
        <InputGroupButton>{t('search.buttonSearch')}</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
