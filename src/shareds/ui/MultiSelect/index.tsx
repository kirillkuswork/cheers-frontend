/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  ChangeEvent, forwardRef, MouseEvent, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { ArrayRender } from '@/shareds/utils/components';
import clsx from 'clsx';
import { useOutsideClick } from '@/shareds/hooks/useOutsideClick';
import { ArrowDown } from '@/assets/icons';
import { Tag } from '@/shareds/ui/Tag';
import { IAdminProductAttribute } from '@/redux/services/types/admin';
import { useDebounce } from '@/shareds/hooks/useDebounce';
import {
  BlockingMessage, CheckBox, Input, Skeletons,
} from '@/shareds';
import { IMultiSelectInputProps } from '@/shareds/ui/MultiSelect/types';
import image from '@/assets/images/wineGlass.png';
import styles from './styles.module.scss';

export const MultiSelect = forwardRef<HTMLInputElement, IMultiSelectInputProps>(
  (
    {
      placeholder = 'Поиск',
      options = [],
      label,
      outerLabel,
      onChange,
      value = [],
      fetchMoreData,
      selectRef,
      cursor,
      handleScroll,
      isLoading,
      inputRef,
      onSearch,
      isSearch,
      isFetching,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const localSelectRef = useRef<HTMLDivElement>(null);
    const [selectedItems, setSelectedItems] = useState<
    IAdminProductAttribute[]
    >(value || []);
    const [searchTerm, setSearchTerm] = useState('');
    const [focused, setFocused] = useState(false);

    const debounceSearch = useDebounce(searchTerm || null, 350);

    const isEmpty = !options.length;
    const isSelected = !!selectedItems?.length;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    };

    const handleOpenDropdown = useCallback(() => {
      if (!props.disabled) {
        setFocused(true);
        setIsOpen(true);
      }
    }, [props.disabled]);

    const handleCloseDropdown = useCallback(() => {
      setFocused(false);
      setIsOpen(false);
    }, []);

    const handleFocus = useCallback(() => {
      setFocused(true);
      setIsOpen(true);
    }, []);

    const handleClear = useCallback(() => {
      handleInputChange?.({ target: { value: '' } } as ChangeEvent<HTMLInputElement>);
    }, []);

    const handleItemChange = useCallback((item: IAdminProductAttribute) => {
      if (!props.disabled) {
        const updatedItems = selectedItems.some(
          (selected) => selected.value === item.value,
        )
          ? selectedItems?.filter((selected) => selected.value !== item.value)
          : [...selectedItems, item];

        setSelectedItems(updatedItems);
        if (onChange) {
          onChange(updatedItems);
        }
      }
    }, [onChange, props.disabled, selectedItems]);

    const handleItemRemove = useCallback(
      (item: IAdminProductAttribute) => {
        const updatedItems = selectedItems.filter(
          (selected) => selected.value !== item.value,
        );
        setSelectedItems(updatedItems);
        if (onChange) {
          onChange(updatedItems);
        }
      },
      [onChange, selectedItems],
    );

    const defaultHandleScroll = () => {
      if (localSelectRef?.current && fetchMoreData && cursor !== null) {
        const { scrollTop, scrollHeight, clientHeight } = localSelectRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 10) {
          fetchMoreData();
        }
      }
    };

    useEffect(() => {
      if ((debounceSearch && debounceSearch?.length >= 3) || searchTerm === '') {
        onSearch?.(debounceSearch!);
      }
    }, [debounceSearch]);

    useOutsideClick(dropdownRef, handleCloseDropdown, isOpen);

    const withValueClass = (searchTerm || focused || isSelected || isOpen) && styles.withValue;
    const withoutFocusClass = !searchTerm && isSelected && !isOpen && styles.withoutFocus;
    const withTagsClass = isSelected && styles.withTags;
    const innerWithTagsClass = ((!isOpen && isSelected && !searchTerm) || !isSearch) && styles.innerWithTags;
    const withLabelClass = (isSelected || searchTerm || focused) && styles.withLabel;
    const selectedItemsContainerClass = isSelected && styles.selectedItemsContainer;

    const renderSelectedItems = useMemo(
      () => selectedItems?.map((item) => (
        <Tag
          key={item.id}
          label={item.value!}
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            handleItemRemove(item);
          }}
        />
      )),
      [handleItemRemove, selectedItems],
    );

    return (
      <div ref={dropdownRef} className={styles.wrapper}>
        {isLoading ? (
          <Skeletons.SelectInputSkeleton />
        ) : (
          <div>
            <Input.Container
              onClick={handleOpenDropdown}
              className={clsx(styles.container, styles.input)}
              disabled={props.disabled}
              focused={isOpen}
              error={props.error}
            >
              <Input.Inner className={clsx(styles.inner, innerWithTagsClass)}>
                {isSearch && (
                <div className={clsx(styles.input, withValueClass, withTagsClass, withoutFocusClass)}>
                  <Input.BaseInput
                    autoFocus={isOpen}
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    ref={ref}
                    inputRef={inputRef}
                    placeholder={isOpen ? placeholder : ''}
                    {...props}
                  />
                </div>
                )}
                <div className={clsx(withLabelClass, selectedItemsContainerClass)}>
                  {renderSelectedItems}
                </div>
                <Input.Label className={styles.label} disabled={props.disabled}>
                  {label}
                </Input.Label>
              </Input.Inner>
              <div className={styles.controls}>
                {searchTerm && (
                <Input.ClearButton
                  handleClear={handleClear}
                />
                )}
                <Input.Icon disabled={props.disabled} className={clsx(isOpen && styles.icon)}>
                  <ArrowDown />
                </Input.Icon>
              </div>

            </Input.Container>
            {props.error && (
            <Input.ErrorLabel className={styles.error}>
              {props.errorMsg}
            </Input.ErrorLabel>
            )}
          </div>
        )}

        {isOpen && (
          <div
            onScroll={handleScroll || defaultHandleScroll}
            ref={selectRef || localSelectRef}
            className={clsx(styles.dropdownList, props.error && styles.dropdownListWithError)}
          >
            {isEmpty ? (
              <BlockingMessage
                image={image}
                className={styles.blockingMessage}
                title="Ничего не найдено"
                subtitle=""
              />
            ) : (
              <ArrayRender
                items={options}
                renderItem={(item) => {
                  const checked = selectedItems.some(
                    ({ value: currentValue }) => currentValue === item.value,
                  );
                  return (
                    <CheckBox
                      className={clsx(styles.listItem, isFetching && !isEmpty && styles.fetching)}
                      labelClassName={styles.checkbox}
                      key={item.id}
                      value={item.value!}
                      checked={checked}
                      onChange={() => handleItemChange(item)}
                      label={item.value!}
                    />
                  );
                }}
              />
            )}
          </div>
        )}
      </div>
    );
  },
);

MultiSelect.displayName = 'MultiSelect';
