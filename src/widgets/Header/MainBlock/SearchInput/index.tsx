import clsx from 'clsx';
import {
  ChangeEvent,
  KeyboardEvent,
  useEffect, useRef, useState,
} from 'react';
import { DropdownSearch } from '@/shareds/ui/DropdownSearch';
import { useOutsideClick } from '@/shareds/hooks/useOutsideClick';
import { Button, ButtonIcon, Input } from '@/shareds/ui';
import useBreakpoint from '@/shareds/hooks/useBreakpoint';
import { CrossIcn } from '@/shareds/assets/icons';
import { useLazyGetSearchQuery } from '@/redux/services/searchApi';
import { useDebounce } from '@/shareds/hooks/useDebounce';
import { useRouter } from 'next/router';
import { createSearchLink } from '@/shareds/helpres/createSearchLink';
import styles from './styles.module.scss';
import { SearchIcon } from './icons';

interface IProps {
  className?: string;
}

const SearchInput = ({
  className,
}: IProps) => {
  const [focus, setFocus] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const breakpoint = useBreakpoint();
  const router = useRouter();
  const ref = useRef(null);
  const { searchText } = router.query;

  const isMobile = breakpoint === 'xs';
  const isSmallTablet = breakpoint === 'sm';

  const isDevice = isMobile || isSmallTablet;
  const showDesktop = focus && !isDevice;
  const showDevice = focus && isDevice;

  const handleOnFocus = () => setFocus(true);
  const handleClose = () => {
    if (ref?.current) {
      (ref.current as HTMLElement).blur();
    }
    setFocus(false);
  };
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value);

  const handleSaveHistory = (value: string) => {
    if (value) {
      const historyLocal = localStorage.getItem('searchHistory');
      const historyParse = historyLocal ? JSON.parse(historyLocal) : [];
      const newHistory = [value, ...historyParse.filter((item: string) => item !== value)];
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      handleClose();
      router.push(createSearchLink(value));

      if (router.route.includes('/search')) {
        setTimeout(() => {
          window.location.reload();
        }, 10);
      }
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveHistory(searchValue);
    }
  };

  const [getSearchSuggestions, { data, isFetching, isError }] = useLazyGetSearchQuery();
  const debounceSearch = useDebounce(searchValue, 350);

  useEffect(() => {
    if (debounceSearch && searchValue.length >= 3) {
      getSearchSuggestions({ query: debounceSearch });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch]);

  useOutsideClick(wrapperRef, handleClose, isDevice ? !focus : focus);

  // Функция для скрытия скролла
  useEffect(() => {
    document.body.style.overflow = focus ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [focus]);

  useEffect(() => {
    if (searchText) {
      setSearchValue(String(searchText));
    }
  }, [searchText]);

  return (
    <>
      <div
        className={clsx(
          styles.wrapper,
          className,
          focus && styles.wrapperFocus,
        )}
        ref={wrapperRef}
      >
        <Input.Container className={styles.container}>
          <SearchIcon className={styles.icon} />
          <Input.Inner className={styles.inner}>
            <Input.BaseInput
              className={styles.input}
              value={searchValue}
              placeholder="Поиск по каталогу"
              onFocus={handleOnFocus}
              onChange={(e) => handleOnChange(e)}
              onKeyDown={(e) => handleKeyPress(e)}
              inputRef={ref}
            />
          </Input.Inner>

          {showDesktop && (
            <Button
              label="Найти"
              className={styles.button}
              onClick={() => handleSaveHistory(searchValue)}
              variant="secondary"
              size="small"
            />
          )}

          {focus && (
            <DropdownSearch
              searchValue={searchValue}
              onClose={handleClose}
              data={data!}
              isLoading={isFetching}
              isError={isError}
            />
          )}
        </Input.Container>

        {showDevice && (
          <ButtonIcon
            icon={<CrossIcn />}
            onClick={handleClose}
            className={styles.closeButton}
          />
        )}

      </div>

      {showDesktop && (
        <div className={styles.overlay} />
      )}
    </>
  );
};

export default SearchInput;
