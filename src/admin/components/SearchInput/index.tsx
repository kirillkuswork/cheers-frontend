/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  forwardRef,
  useCallback, useEffect,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';
import { useOutsideClick } from '@/shareds/hooks/useOutsideClick';
import { MainInput } from '@/shareds/ui/MainInput';
import { ArrowDown } from '@/assets/icons';
import { Button } from '@/shareds';
import { ArrayRender } from '@/shareds/utils/components';
import { ISearchInputProps, ISelectOption } from '@/admin/components/SearchInput/types';
import { ProductSearch } from '@/admin/sections/Management/ProductControlPanel/ProductSearch';
import styles from './styles.module.scss';

export const SearchInput = forwardRef<HTMLInputElement, ISearchInputProps>(
  (
    {
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
      value,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const localSelectRef = useRef<HTMLDivElement>(null);
    const [searchTerm, setSearchTerm] = useState<string>(value);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [itemState, setItemState] = useState<string | null>(null);

    useEffect(() => {
      setSearchTerm(value);
    }, [value]);

    const handleMainInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    }, []);

    const handleInputChange = useCallback((query: string) => {
      setSearchQuery(query);
    }, []);

    const handleAddName = useCallback(() => {
      setSearchTerm(searchQuery);
      if (onChange) {
        onChange({ id: null, value: searchQuery });
      }
      setIsOpen(false);
    }, [searchQuery, onChange]);

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
        setIsOpen((prevState) => !prevState);
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

    useOutsideClick(dropdownRef, handleClose, isOpen);

    return (
      <div ref={dropdownRef} className={clsx(styles.wrapper, className)}>
        <MainInput
          isLoading={isLoading}
          readOnly
          containerClassName={styles.input}
          icon={<ArrowDown className={clsx(isOpen && styles.icon, props.disabled && styles.disabledArrow)} />}
          onContainerClick={handleOpen}
          label={label}
          ref={ref}
          disabled={props.disabled}
          error={props.error}
          {...props}
          onChange={handleMainInputChange}
          value={searchTerm!}
        />

        {isOpen && (
          <div
            onScroll={handleScroll || defaultHandleScroll}
            ref={selectRef || localSelectRef}
            className={styles.dropdownList}
          >
            <ProductSearch
              className={styles.productSearch}
              placeholder="Поиск по наименованию производителя"
              onChange={handleInputChange}
              onSearch={onSearch}
            />
            {!options.length ? (
              <div className={styles.empty}>
                <div className={styles.title}>По вашему запросу ничего не найдено</div>
                <div className={styles.subtitle}>Попробуйте поискать по другим ключевым словам или добавьте нового</div>
                <Button
                  onClick={handleAddName}
                  className={styles.button}
                  label="Добавить производителя"
                  variant="secondary"
                  size="small"
                />
              </div>
            ) : (
              <div className={styles.list}>
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
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);

SearchInput.displayName = 'SearchInput';
