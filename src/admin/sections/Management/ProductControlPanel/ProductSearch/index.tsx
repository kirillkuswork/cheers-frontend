/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  ChangeEvent, FC, HTMLAttributes, useEffect, useRef, useState,
} from 'react';
import clsx from 'clsx';
import { SearchIcon } from '@/widgets/Header/MainBlock/SearchInput/icons';
import { Input } from '@/shareds';
import { useOutsideClick } from '@/shareds/hooks/useOutsideClick';
import { useDebounce } from '@/shareds/hooks/useDebounce';
import styles from './styles.module.scss';

interface IProductSearchProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  showResult?: boolean;
  onSearch?: (query: string) => void;
  isLoading?: boolean;
  placeholder?: string
  onChange?: (param: string) => void;
}

export const ProductSearch: FC<IProductSearchProps> = ({
  className,
  showResult,
  onSearch,
  children,
  isLoading,
  placeholder = 'Поиск по каталогу',
  onChange,
}) => {
  const [focus, setFocus] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleOnFocus = () => setFocus(true);
  const handleClose = () => setFocus(false);
  useOutsideClick(wrapperRef, handleClose, focus);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onChange?.(e.target.value);
  };
  const handleClear = () => {
    handleInputChange?.({ target: { value: '' } } as ChangeEvent<HTMLInputElement>);
  };

  const debounceSearch = useDebounce(searchTerm || null, 350);

  useEffect(() => {
    if ((debounceSearch && debounceSearch?.length >= 3) || searchTerm === '') {
      onSearch?.(debounceSearch!);
    }
  }, [debounceSearch]);

  const isValidationError = searchTerm.length !== 0 && searchTerm.length < 3;

  return (
    <div ref={wrapperRef} className={clsx(styles.search, className)}>
      <Input.Container error={isValidationError} className={styles.container}>
        <SearchIcon className={styles.icon} />
        <Input.Inner className={styles.inner}>
          <Input.BaseInput
            className={styles.input}
            value={searchTerm}
            placeholder={placeholder}
            onFocus={handleOnFocus}
            onChange={handleInputChange}
            onKeyDown={() => {}}
          />
        </Input.Inner>
        {isLoading && <Input.Loader />}
        {searchTerm && (
        <Input.ClearButton
          handleClear={handleClear}
        />
        )}
      </Input.Container>
      {isValidationError && <Input.ErrorLabel className={styles.errorLabel}>Слишком короткое название. Минимум 3 символа</Input.ErrorLabel>}
      {showResult && focus && children}
    </div>
  );
};
