import { Paper } from '@/admin/components/Paper';
import { Filter } from '@/entities/Products';
import { Radio } from '@/shareds';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useActions } from '@/shareds/hooks/useActions';
import { adminActions } from '@/redux/actions/adminActions';
import styles from './styles.module.scss';

const FILTERS = [
  { attribute: 'Все', value: null },
  { attribute: 'Скрытые', value: true },
  { attribute: 'Опубликованные', value: false },
  { attribute: 'Все', value: null },
  { attribute: 'Не синхронизировано', value: false },
  { attribute: 'Синхронизировано', value: true },
];

export const FiltersBar: FC = () => {
  const { filters } = useSelector(selectors.adminSelector);
  const { updateFilters, setProductsData } = useActions(adminActions);

  const handleVisibilityChange = (value: boolean | null) => {
    updateFilters({ is_hidden: value });
    setProductsData(null);
  };

  const handleSyncChange = (value: boolean | null) => {
    updateFilters({ is_syncronized: value });
    setProductsData(null);
  };
  return (
    <Paper className={styles.wrapper}>
      <Filter.Item title="Видимость в Cheers" initialIsOpen>
        <Filter.Box>
          {FILTERS.slice(0, 3).map((filter) => (
            <Radio
              type="black"
              key={filter.attribute}
              isLeftRadio
              checked={filters.is_hidden === filter.value}
              value={String(filter.value)}
              label={filter.attribute}
              onChange={() => handleVisibilityChange(filter.value)}
            />
          ))}
        </Filter.Box>
      </Filter.Item>
      <Filter.Item title="Статус синхронизации" initialIsOpen>
        <Filter.Box>
          {FILTERS.slice(3, 6).map((filter) => (
            <Radio
              type="black"
              key={filter.attribute}
              isLeftRadio
              checked={filters.is_syncronized === filter.value}
              value={String(filter.value)}
              label={filter.attribute}
              onChange={() => handleSyncChange(filter.value)}
            />
          ))}
        </Filter.Box>
      </Filter.Item>
    </Paper>
  );
};
