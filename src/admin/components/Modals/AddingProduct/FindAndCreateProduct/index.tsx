/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import React, { FC, useCallback, useState } from 'react';
import { Plus } from '@/assets/icons';
import { Button } from '@/shareds';
import { ProductSearch } from '@/admin/sections/Management/ProductControlPanel/ProductSearch';
import { useActions } from '@/shareds/hooks/useActions';
import { adminActions } from '@/redux/actions/adminActions';
import { useLazyGetAdminBaseCardProductsQuery } from '@/redux/services/adminApi';
import { SearchResultList } from '@/admin/components/Modals/AddingProduct/SearchResultList';
import { useSelector } from 'react-redux';
import { adminSelector } from '@/redux/selectors/adminSelectors';
import styles from './styles.module.scss';

interface IFindAndCreateProduct {}

export const FindAndCreateProduct: FC<IFindAndCreateProduct> = () => {
  const [getBaseCards, { isFetching }] = useLazyGetAdminBaseCardProductsQuery();
  const [queryParam, setQueryParam] = useState<string | null>(null);
  const {
    setCreatProductModalOpen,
    clearBaseCardsData,
    updateBaseCardsData,
    setBaseCardsData,
    setSelectedBaseCard,
  } = useActions(adminActions);
  const { baseCardsData } = useSelector(adminSelector);

  const handleSearch = useCallback((query: string) => {
    if (query === '') {
      clearBaseCardsData();
    } else {
      setQueryParam(query);
      getBaseCards({
        query,
        pagination: {
          cursor: null,
          limit: 20,
        },
      }).then((res) => {
        setBaseCardsData(res.data!);
      });
    }
  }, []);

  const loadMoreCardsHandler = useCallback(() => {
    getBaseCards({
      query: queryParam,
      pagination: {
        cursor: baseCardsData?.pagination?.cursor!,
        limit: 20,
      },
    }).then((res) => {
      updateBaseCardsData(res.data!);
    });
  }, [baseCardsData]);

  const addNewProductHandler = () => {
    setSelectedBaseCard(null);
    setCreatProductModalOpen(true);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <span className={styles.title}>Найдите товар в каталоге</span>
        <span className={styles.description}>
          Если у нас продается такой же товар, вам останется заполнить всего
          несколько полей
        </span>
        <div className={styles.search}>
          <ProductSearch
            showResult={!!baseCardsData?.cards.length}
            onSearch={handleSearch}
            isLoading={isFetching}
          >
            <SearchResultList
              isLoading={isFetching}
              results={baseCardsData?.cards!}
              cursor={baseCardsData?.pagination.cursor!}
              loadMoreCardsHandler={loadMoreCardsHandler}
            />
          </ProductSearch>
        </div>
      </div>
      <div className={styles.container}>
        <span className={styles.title}>Новый товар</span>
        <span className={styles.description}>
          Если подходящий товар не нашелся, добавьте его сами
        </span>
        <Button
          className={styles.button}
          label="Добавить товар"
          variant="secondary"
          icon={<Plus className={styles.icon} />}
          onClick={addNewProductHandler}
        />
      </div>
    </div>
  );
};
