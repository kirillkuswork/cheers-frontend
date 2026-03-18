import { useState, useEffect, useCallback } from 'react';
import { IGetAdminProducerListRequest, IGetAdminProducerListResponse } from '@/redux/services/types/admin';
import { useLazyGetProducerListQuery } from '@/redux/services/adminApi';

export const useProducerList = (initialFilters: IGetAdminProducerListRequest) => {
  const [getProducerList, { data, isFetching }] = useLazyGetProducerListQuery();
  const [filters, setFilters] = useState<IGetAdminProducerListRequest>(initialFilters);
  const [producerList, setProducerList] = useState<IGetAdminProducerListResponse | null>(null);

  useEffect(() => {
    getProducerList(filters).then((res) => {
      if (res.data) {
        setProducerList(res.data);
      }
    });
  }, [filters, getProducerList]);

  const handleSearch = useCallback(
    (query: string | null) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        query,
        pagination: { cursor: null, limit: 100 },
      }));
    },
    [],
  );

  const loadMoreProducers = useCallback(() => {
    getProducerList({
      ...filters,
      pagination: { cursor: data?.pagination?.cursor || null, limit: 100 },
    }).then((res) => {
      if (res.data) {
        setProducerList((prevList) => ({
          ...prevList,
          producers: [
            ...(prevList?.producers || []),
            ...(res.data?.producers || []),
          ],
          pagination: res?.data?.pagination as IGetAdminProducerListResponse['pagination'],
        }));
      }
    });
  }, [filters, data, getProducerList]);

  return {
    producerList,
    isFetching,
    handleSearch,
    loadMoreProducers,
    setFilters,
  };
};
