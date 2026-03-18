import React, { FC, useMemo } from 'react';
import { Controller } from 'react-hook-form';
import {
  Button, CheckBox, InfinityScroll, Radio, RangeSlider,
} from '@/shareds';
import { Filter } from '@/entities/Products';
import { attributeMapping } from '@/consts/filtersData';
import { ArrayRender } from '@/shareds/utils/components';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useActions } from '@/shareds/hooks/useActions';
import { BaseSkeleton } from '@/shareds/ui/Skeletons/BaseSkeleton';
import { officeActions } from '@/redux/actions/officeActions';
import { IFiltersListProps } from './types';
import styles from './styles.module.scss';

const BUTTON_CLEAR_FILTERS_SHOPS = {
  color: '#9499A2', fontSize: '10px', fontWeight: 400, borderColor: 'red', boxShadow: 'none',
};
const FiltersList: FC<IFiltersListProps> = ({
  filters, onGetNewOffices, control, isLoadingOffice, initialOpenState,
}) => {
  const { officeData, activeOffice } = useSelector(selectors.officeSelector);
  const { setActiveOffice } = useActions(officeActions);

  const getFiltersString = useMemo(() => filters?.string?.filter(
    (filter) => !!attributeMapping[filter.attribute],
    [],
  ), [filters]);
  const getFiltersNumber = useMemo(() => filters?.number?.filter(
    (filter) => !!attributeMapping[filter.attribute],
    [],
  ), [filters]);

  const handleClickOnClearShops = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setActiveOffice(null);
  };
  const loadMoreProducts = () => {
    onGetNewOffices?.();
  };
  return (
    <form>
      {/* БУДЕТ В НОВЫХ РЕЛИЗАХ */}
      {/* <ArrayRender
          items={filters?.boolean}
          renderItem={(filter) => (
            <Controller
              key={filter.attribute}
              control={control}
              name={`boolean.${filter.attribute}` as const}
              render={({ field: { onChange, value: isChecked } }: any) => (
                <Filter.ToggleItem
                  key={filter.attribute}
                  title={attributeMapping[filter.attribute] || filter.attribute}
                  isChecked={isChecked}
                  onChange={onChange}
                />
              )}
            />
          )}
        /> */}
      {!!officeData.length && (
      <Filter.Item
        title="Магазины"
        filterTitleSubElement={(
          <Button
            size="small"
            variant="tertiary"
            label="Очистить"
            style={BUTTON_CLEAR_FILTERS_SHOPS}
            onClick={handleClickOnClearShops}
          />
            )}
      >
        <Filter.Box>
          <InfinityScroll
            isLoading={isLoadingOffice}
            handleOnFetch={loadMoreProducts}
            hasNextPage
          >
            {officeData?.map((office) => (
              <Radio
                key={office.id}
                value=""
                label={`${office?.partner?.name}, ${office.address}`}
                onChange={() => setActiveOffice(office.id)}
                checked={office.id === activeOffice}
                isLeftRadio
                className={styles.radio}
                labelClassName={styles.radioLabel}
              />
            ))}
            {isLoadingOffice ? (
              <>
                <BaseSkeleton isAnimation className={styles.laodingOffices} />
                <BaseSkeleton isAnimation className={styles.laodingOffices} />
                <BaseSkeleton isAnimation className={styles.laodingOffices} />
                <BaseSkeleton isAnimation className={styles.laodingOffices} />
                <BaseSkeleton isAnimation className={styles.laodingOffices} />
                <BaseSkeleton isAnimation className={styles.laodingOffices} />
                <BaseSkeleton isAnimation className={styles.laodingOffices} />
                <BaseSkeleton isAnimation className={styles.laodingOffices} />
              </>
            ) : ''}
          </InfinityScroll>
        </Filter.Box>
      </Filter.Item>
      )}

      <ArrayRender
        items={getFiltersString}
        renderItem={(filter) => (
          <Filter.Item
            key={filter.attribute}
            title={attributeMapping[filter.attribute] || filter.attribute}
            initialIsOpen={initialOpenState[filter.attribute]}
          >
            <Filter.Box>
              {filter.value.map((value) => (
                <Controller
                  key={value}
                  control={control}
                  name={`string.${filter.attribute}.${value}` as const}
                  render={({ field: { onChange, value: checked } }) => (
                    <CheckBox
                      value={value}
                      label={value}
                      checked={checked}
                      onChange={(val, isChecked) => onChange(isChecked)}
                    />
                  )}
                />
              ))}
            </Filter.Box>
          </Filter.Item>
        )}
      />

      <ArrayRender
        items={getFiltersNumber}
        renderItem={(filter) => (
          filter.from_ === filter.to ? null
            : (
              <Filter.Item
                key={filter.attribute}
                title={attributeMapping[filter.attribute] || filter.attribute}
                initialIsOpen={initialOpenState[filter.attribute]}
              >
                <Controller
                  control={control}
                  name={`number.${filter.attribute}` as const}
                  render={({ field: { onChange, value } }) => (
                    <RangeSlider
                      minValue={filter.from_}
                      maxValue={filter.to}
                      valueArr={value || [filter.from_, filter.to]}
                      onChange={onChange}
                      currency={filter.attribute === 'min_price' ? '₽' : null}
                    />
                  )}
                />
              </Filter.Item>
            )
        )}
      />
    </form>
  );
};

export default React.memo(FiltersList);
