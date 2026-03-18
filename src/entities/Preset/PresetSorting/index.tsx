import { FC, useEffect, useState } from 'react';
import { Dropdown, Skeletons } from '@/shareds/ui';
import { DropDownItem } from '@/shareds/ui/Dropdown/types';
import { ISortRequest } from '@/redux/services/types/products';
import { useActions } from '@/shareds/hooks/useActions';
import { presetActions } from '@/redux/actions/presetActions';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';

interface IPresetSortingProps {
  isLoading: boolean;
}

export const PresetSorting: FC<IPresetSortingProps> = ({
  isLoading,
}) => {
  const [filterOptions, setFilterOptions] = useState<DropDownItem[]>([]);
  const [filter, setFilter] = useState<DropDownItem | null>(null);
  const { setSort } = useActions(presetActions);
  const { enumData } = useSelector(selectors.enumSelector);

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

  if (isLoading) {
    return <Skeletons.SortingSkeleton />;
  }

  return (
    <Dropdown
      setSelectedOption={handleFilterChange}
      selectedOption={filter!}
      options={filterOptions}
    />
  );
};
