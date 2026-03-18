import React, { FC, useMemo } from 'react';
import { FiltersList, FiltersListModal } from '@/features/Products';
import { useDebouncedWatch } from '@/shareds/hooks/useDebouncedWatch';
import { FilterValues } from '@/redux/services/types/filters';
import { Skeletons } from '@/shareds';
import { useFormContext } from 'react-hook-form';
import styles from './styles.module.scss';
import { IFilterBarProps } from './types';

// eslint-disable-next-line react/display-name
export const FiltersBar: FC<IFilterBarProps> = ({
  handleCloseModal,
  onGetNewOffices,
  isModalOpen,
  filters,
  handleSubmit,
  isLoadingOffice,
  resetFilters,
  isLoading,
}) => {
  const { control, watch } = useFormContext();
  const filterValues = watch();
  // Отслеживание изменений формы с задержкой
  useDebouncedWatch<FilterValues>({
    onSubmit: handleSubmit,
    isEnabled: !isModalOpen,
  });

  // Пересчет состояния открытия фильтров
  const computeOpenState = useMemo(() => {
    const openState: { [key: string]: boolean } = {};

    filters?.string?.forEach((filter) => {
      openState[filter.attribute] = filter.value.some(
        (value: string) => filterValues?.string?.[filter.attribute]?.[value],
      );
    });
    filters?.number?.forEach((filter) => {
      openState[filter.attribute] = !!filterValues?.number?.[filter.attribute];
    });

    return openState;
  }, [filters, filterValues]);

  const skeletons = Array.from({ length: 17 }, (_, index) => (
    <Skeletons.FilterItemSkeleton key={index} />
  ));

  const filtersList = isLoading ? (
    skeletons
  ) : (
    <FiltersList
      isLoadingOffice={isLoadingOffice}
      initialOpenState={computeOpenState}
      onGetNewOffices={onGetNewOffices}
      control={control}
      filters={filters!}
    />
  );

  return (
    <>
      {isModalOpen && (
      <FiltersListModal
        isModalOpen={isModalOpen}
        resetFilters={resetFilters}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
      >
        {filtersList}
      </FiltersListModal>
      )}

      <div className={styles.filtersBar}>{filtersList}</div>
    </>
  );
};

export default React.memo(FiltersBar);
