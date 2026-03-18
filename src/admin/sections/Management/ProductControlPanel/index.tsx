/* eslint-disable react-hooks/exhaustive-deps */
import { FiltersBar } from '@/admin/sections/Management/ProductControlPanel/FiltersBar';
import { Container } from '@/admin/components/Container';
import { useLazyGetAdminProductsQuery } from '@/redux/services/adminApi';
import React, { useCallback, useEffect } from 'react';
import { Paper } from '@/admin/components/Paper';
import { ProductSearch } from '@/admin/sections/Management/ProductControlPanel/ProductSearch';
import { ProductSorting } from '@/admin/sections/Management/ProductControlPanel/ProductSorting';
import { ProductList } from '@/admin/sections/Management/ProductControlPanel/ProductList';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useActions } from '@/shareds/hooks/useActions';
import { adminActions } from '@/redux/actions/adminActions';
import styles from './styles.module.scss';

export const ProductControlPanel = () => {
  const [getProducts] = useLazyGetAdminProductsQuery();
  const { productsData, filters } = useSelector(selectors.adminSelector);
  const { setProductsData, setFilters } = useActions(adminActions);
  useEffect(() => {
    getProducts(filters);
  }, [filters]);

  const handleSearch = useCallback(
    (query: string | null) => {
      setProductsData(null);
      setFilters({
        ...filters,
        query,
      });
    },
    [filters, setFilters],
  );

  const loadMoreProducts = useCallback(() => {
    getProducts({
      ...filters,
      pagination: { cursor: productsData?.pagination?.cursor || null, limit: 20 },
    }).then((res) => {
      if (res.data) {
        setProductsData({
          ...productsData,
          products: [
            ...(productsData?.products || []),
            ...(res.data.products || []),
          ],
          pagination: res.data.pagination,
        });
      }
    });
  }, [productsData, getProducts, setProductsData, filters]);

  return (
    <Container>
      <FiltersBar />
      <Paper className={styles.content}>
        <ProductSearch onSearch={handleSearch} />
        <ProductSorting />
        <ProductList
          productsData={productsData!}
          loadMoreProducts={loadMoreProducts}
        />
      </Paper>
    </Container>
  );
};
