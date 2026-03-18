/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  forwardRef, useCallback, useEffect, useRef, useState,
} from 'react';
import { MainInput } from '@/shareds/ui/MainInput';
import { ArrayRender } from '@/shareds/utils/components';
import clsx from 'clsx';
import { useOutsideClick } from '@/shareds/hooks/useOutsideClick';
import { ArrowDown } from '@/assets/icons';
import { ISelectInputProps, ISelectOption } from '@/shareds/ui/SelectInput/types';
import { BlockingMessage } from '@/shareds';
import image from '@/assets/images/wineGlass.png';
import { useDebounce } from '@/shareds/hooks/useDebounce';
import styles from './styles.module.scss';

export const SelectInput = forwardRef<HTMLInputElement, ISelectInputProps>(({
  options = [],
  label,
  onChange,
  className,
  isLoading,
  isFetching,
  fetchMoreData,
  selectRef,
  cursor,
  handleScroll,
  onSearch,
  isSearch,
  value,
  placeholder = 'Поиск',
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const localSelectRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>(value);
  const [itemState, setItemState] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleItemClick = useCallback((item: ISelectOption) => {
    setItemState(item.value);
    setSearchTerm(item.value);
    if (onChange) {
      onChange(item);
    }
    setIsOpen(false);
  }, [onChange]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    if (!props.disabled) {
      setIsOpen(true);
    }
  }, [props.disabled]);

  const defaultHandleScroll = async () => {
    if (localSelectRef?.current && fetchMoreData && cursor !== null) {
      const { scrollTop, scrollHeight, clientHeight } = localSelectRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        fetchMoreData();
      }
    }
  };

  const handleFocused = useCallback((param: boolean) => {
    setFocused(param);
  }, []);

  const debounceSearch = useDebounce(searchTerm || null, 350);

  useEffect(() => {
    if (((debounceSearch && debounceSearch?.length >= 3) || searchTerm === '') && isSearch) {
      onSearch?.(debounceSearch!);
    }
  }, [debounceSearch]);

  useOutsideClick(dropdownRef, handleClose, isOpen);

  return (
    <div ref={dropdownRef} className={clsx(styles.wrapper, className)}>
      <MainInput
        isLoading={isLoading}
        readOnly={!isSearch}
        containerClassName={styles.input}
        icon={<ArrowDown className={clsx(isOpen && styles.icon)} />}
        onContainerClick={handleOpen}
        label={label}
        ref={ref}
        error={props.error}
        {...props}
        value={searchTerm!}
        placeholder={isOpen && isSearch && focused ? placeholder : ''}
        onChange={handleInputChange}
        showClearButton={isSearch && !!searchTerm}
        setFocused={handleFocused}
      />

      {isOpen && (
        <div
          onScroll={handleScroll || defaultHandleScroll}
          ref={selectRef || localSelectRef}
          className={styles.dropdownList}
        >
          {!options.length ? (
            <BlockingMessage
              image={image}
              className={styles.blockingMessage}
              title="Ничего не найдено"
              subtitle=""
            />
          ) : (
            <ArrayRender
              items={options}
              renderItem={(item) => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={clsx(
                    isFetching && styles.fetching,
                    styles.listItem,
                    itemState === item.value && styles.active,
                  )}
                >
                  {item.value}
                </div>
              )}
            />
          )}
        </div>
      )}
    </div>
  );
});

SelectInput.displayName = 'SelectInput';
