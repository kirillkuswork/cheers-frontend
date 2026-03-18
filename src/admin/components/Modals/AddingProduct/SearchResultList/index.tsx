import React, { FC, useCallback } from 'react';
import { SearchResultItem } from '@/admin/components/Modals/AddingProduct/SearchResultItem';
import { SearchWrapper } from '@/shareds/ui/DropdownSearch/SearchWrapper';
import { ISelectedBaseCard } from '@/redux/services/types/admin';
import ArrayRender from '@/shareds/utils/components/ArrayRender';
import { Button } from '@/shareds';
import styles from './styles.module.scss';

interface ISearchResultList {
  results: ISelectedBaseCard[];
  cursor?: string;
  loadMoreCardsHandler?: () => void;
  isLoading?: boolean;
}

export const SearchResultList: FC<ISearchResultList> = ({
  results,
  cursor,
  loadMoreCardsHandler,
  isLoading,
}) => {
  const renderItem = useCallback(
    (item: ISelectedBaseCard) => <SearchResultItem key={item.id} {...item} />,
    [],
  );
  return (
    <SearchWrapper className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.results}>
          <ArrayRender items={results} renderItem={renderItem} />
        </div>
        {!!cursor && (
          <Button
            disabled={isLoading}
            isLoading={isLoading}
            onClick={loadMoreCardsHandler}
            label="Загрузить еще"
            variant="secondary"
          />
        )}
      </div>
    </SearchWrapper>
  );
};
