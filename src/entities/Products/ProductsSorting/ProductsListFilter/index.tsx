import React, { FC, useEffect, useState } from 'react';
import {
  Dropdown, MobileModal, Radio, Skeletons,
} from '@/shareds';
import { DropDownItem } from '@/shareds/ui/Dropdown/types';
import useBreakpoint from '@/shareds/hooks/useBreakpoint';
import { ArrowsDownUp } from '@/assets/icons';
import { ISortRequest } from '@/redux/services/types/products';
import clsx from 'clsx';
import { IProductsSortingProps } from '@/entities/Products/ProductsSorting/types';
import { useActions } from '@/shareds/hooks/useActions';
import { productsActions } from '@/redux/actions/productsActions';
import { IEnumResponse } from '@/redux/services/types/enum';
import styles from './styles.module.scss';
import { ArrayRender } from '../../../../shareds/utils/components';

interface IProductsListFilterProps
  extends Pick<IProductsSortingProps, 'isLoading'> {
  enumData: IEnumResponse;
}

export const ProductsListFilter: FC<IProductsListFilterProps> = ({
  enumData,
  isLoading,
}) => {
  const [filterOptions, setFilterOptions] = useState<DropDownItem[]>([]);
  const [filter, setFilter] = useState<DropDownItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'xs';
  const { setSort } = useActions(productsActions);

  useEffect(() => {
    if (enumData) {
      const options = [
        {
          label: 'Высокий рейтинг пользователей',
          value: enumData?.OrderDirectionEnum?.DESC,
          field: enumData?.FilterFieldEnum?.rating_customer,
        },
        {
          label: 'Высокий рейтинг экспертов',
          value: enumData?.OrderDirectionEnum?.ASC,
          field: enumData?.FilterFieldEnum?.rating_expert,
        },
        {
          label: 'Сначала дороже',
          value: enumData?.OrderDirectionEnum?.DESC,
          field: enumData?.FilterFieldEnum?.min_price,
        },
        {
          label: 'Сначала дешевле',
          value: enumData?.OrderDirectionEnum?.ASC,
          field: enumData?.FilterFieldEnum?.min_price,
        },
      ];
      setFilterOptions(options);
      setFilter(options[0]);
    }
  }, [enumData]);

  const handleFilterChange = (selectedOption: DropDownItem) => {
    if (filter?.label !== selectedOption.label) {
      setFilter(selectedOption);
      const sort: ISortRequest = {
        field: selectedOption.field,
        order_direction: selectedOption.value,
      };
      setSort(sort);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRadioChange = (label: string) => {
    const selectedOption = filterOptions.find(
      (option) => option.label === label,
    );
    if (selectedOption) {
      handleFilterChange(selectedOption);
      closeModal();
    }
  };

  if (isLoading) {
    return <Skeletons.SortingSkeleton />;
  }

  return isMobile ? (
    <>
      <ArrowsDownUp
        className={clsx(
          styles.downUpIcon,
          filter?.value === 'ASC' && styles.sorted,
        )}
        onClick={openModal}
      />
      <MobileModal title="Сортировка" isOpen={isModalOpen} onClose={closeModal}>
        <div className={styles.radioGroup}>
          <ArrayRender
            items={filterOptions}
            renderItem={(option) => (
              <Radio
                className={styles.radio}
                key={option.label}
                value={option.value}
                label={option.label}
                checked={filter?.label === option.label}
                onChange={() => handleRadioChange(option.label)}
              />
            )}
          />
        </div>
      </MobileModal>
    </>
  ) : (
    <Dropdown
      setSelectedOption={handleFilterChange}
      selectedOption={filter!}
      options={filterOptions}
    />
  );
};
