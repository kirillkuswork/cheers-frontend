import React, {
  FC, HTMLAttributes, useMemo, useState,
} from 'react';
import clsx from 'clsx';
import { Dropdown, Skeletons } from '@/shareds';
import { DropDownItem } from '@/shareds/ui/Dropdown/types';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useActions } from '@/shareds/hooks/useActions';
import { adminActions } from '@/redux/actions/adminActions';
import styles from './styles.module.scss';

interface IProductSortingProps extends HTMLAttributes<HTMLDivElement> {}

export const ProductSorting: FC<IProductSortingProps> = ({ className }) => {
  const { isEnumLoading, enumData } = useSelector(selectors.enumSelector);
  const { updateSort, setProductsData } = useActions(adminActions);

  const filterOptions = useMemo<DropDownItem[]>(() => {
    if (!enumData) return [];
    return [
      { label: 'По возрастанию', value: enumData?.OrderDirectionEnum?.ASC },
      { label: 'По убыванию', value: enumData?.OrderDirectionEnum?.DESC },
    ];
  }, [enumData]);

  const [filter, setFilter] = useState<DropDownItem | null>(filterOptions[0]);

  const handleFilterChange = (selectedOption: DropDownItem) => {
    if (filter?.value !== selectedOption.value) {
      setFilter(selectedOption);
      updateSort({
        field: 'updated_at',
        order_direction: selectedOption.value,
      });
      setProductsData(null);
    }
  };

  return (
    <div className={clsx(styles.sorting, className)}>
      {isEnumLoading ? (
        <Skeletons.SortingSkeleton />
      ) : (
        <Dropdown
          setSelectedOption={handleFilterChange}
          selectedOption={filter!}
          options={filterOptions}
        />
      )}
    </div>
  );
};
