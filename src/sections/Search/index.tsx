import {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { FilterValues, IFiltersResponse } from '@/redux/services/types/filters';
import { useGetFiltersQuery } from '@/redux/services/filtersApi';
import { useLazyGetProductsQuery } from '@/redux/services/productsApi';
import { IGetProductsRequest, IProduct } from '@/redux/services/types/products';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { FiltersBar, ProductsContainer } from '@/widgets/Products';
import clsx from 'clsx';
import { selectors } from '@/redux/selectors';
import { useAuth } from '@/shareds/providers/AuthProvider';
import { COORDINATES } from '@/shareds/consts/baseConts';
import { InfinityScroll } from '@/shareds/ui';
import { useActions } from '@/shareds/hooks/useActions';
import { officeActions } from '@/redux/actions/officeActions';
import { useLazyGetOfficesQuery } from '@/redux/services/officeApi';
import styles from './styles.module.scss';
import SearchBlockingMessage from './SearchBlockingMessage';

const Search = () => {
  const { isAuthenticated } = useAuth();

  // Состояние для открытия/закрытия модального окна фильтров
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Состояние для хранения курсора пагинации
  const [cursor, setCursor] = useState<string | null>(null);

  // Состояние для хранения списка продуктов
  const [products, setProducts] = useState<IProduct[]>([]);

  // Состояние для хранения фильтров по умолчанию
  const [defaultFilters, setDefaultFilters] = useState<IFiltersResponse>({
    boolean: [],
    string: [],
    number: [],
  });

  // Состояние для хранения количества выбранных категорий
  const [selectedCategoriesCount, setSelectedCategoriesCount] = useState<number>(0);

  // Состояние для временного хранения значений фильтров при открытии модального окна
  const [tempFilters, setTempFilters] = useState<FilterValues | null>(null);

  // Селектор для получения текущего значения сортировки из Redux
  const { sort } = useSelector(selectors.productsSelectors);

  // Инициализация роутера для работы с URL параметрами
  const router = useRouter();
  const searchText = router.query.searchText ? String(router.query.searchText) : undefined;
  const filtersRequestBody = searchText ? { query: searchText } : { filters: {} };
  const { activeOffice } = useSelector(selectors.officeSelector);
  const { setActiveOffice } = useActions(officeActions);

  // Хук для выполнения запроса на получение фильтров
  const {
    data: filtersData,
    isFetching: isFiltersLoading,
    isError: isFiltersError,
  } = useGetFiltersQuery(filtersRequestBody);

  // Хук для выполнения ленивого запроса на получение продуктов
  const [loadProducts, { data: productsData, isFetching: isProductsLoading, isError: isProductsError }] = useLazyGetProductsQuery();
  const [officeCursor, setOfficeCursor] = useState<string | null | undefined>(null);

  // Хук для выполнения запроса на получение оффисов
  const [getOffices, { isFetching: isLoadingOffice }] = useLazyGetOfficesQuery();

  useEffect(() => {
    getOffices({ coordinates: COORDINATES }).then((res) => {
      if (res?.data) {
        setOfficeCursor(res?.data?.pagination?.cursor);
      }
    });
  }, []);
  const handleGetNewOffices = () => {
    if (!officeCursor) return;
    getOffices({
      coordinates: COORDINATES,
      pagination: {
        cursor: officeCursor,
        limit: 80,
      },
    }).then((res) => {
      if (res?.data) {
        setOfficeCursor(res?.data?.pagination?.cursor);
      }
    });
  };

  const isContentHidden = useMemo(
    () => isProductsError || isFiltersError || productsData?.products.length === 0 || !searchText,
    [isProductsError, isFiltersError, productsData, searchText],
  );

  // Ссылка на количество загружаемых продуктов за один запрос
  const limitRef = useRef<number>(20);

  // Функция для получения значений фильтров по умолчанию
  const getDefaultValues = ({
    string,
    boolean,
    number,
  }: IFiltersResponse) => ({
    string: string?.reduce(
      (acc, filter) => {
        acc[filter.attribute] = Object.fromEntries(
          filter.value.map((value) => [value, false]),
        );
        return acc;
      },
      {} as FilterValues['string'],
    ),
    boolean: boolean?.reduce(
      (acc, filter) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        acc[filter.attribute] = undefined;
        return acc;
      },
      {} as FilterValues['boolean'],
    ),
    number: number?.reduce(
      (acc, filter) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        acc[filter.attribute] = undefined;
        return acc;
      },
      {} as FilterValues['number'],
    ),
  });

  // Инициализация формы с фильтрами с помощью react-hook-form
  const methods = useForm<FilterValues>({
    defaultValues: useMemo(() => getDefaultValues(defaultFilters), [defaultFilters]),
  });

  // Получение текущих значений формы
  const data = methods.getValues();

  // Функция для создания payload для запроса продуктов
  const getFilterRequestPayload = useCallback(
    (
      // eslint-disable-next-line @typescript-eslint/no-shadow
      data: FilterValues,
      // eslint-disable-next-line @typescript-eslint/no-shadow
      cursor: string | null,
      query: string | undefined,
      isLimit: boolean = false,
      office_id?: number | null,
    ): IGetProductsRequest => {
      const selectedCategories = new Set<string>();

      const filters = {
        string: defaultFilters?.string
          ?.map((filter) => {
            const selectedValues = Object.keys(
              data.string?.[filter.attribute] || {},
            ).filter((key) => data.string[filter.attribute][key]);
            if (selectedValues.length > 0) selectedCategories.add(filter.attribute);
            return { attribute: filter.attribute, value: selectedValues };
          })
          .filter((f) => f.value.length > 0),
        boolean: defaultFilters?.boolean
          ?.filter((filter) => data.boolean[filter.attribute] !== undefined)
          .map((filter) => {
            if (data.boolean[filter.attribute]) selectedCategories.add(filter.attribute);
            return {
              attribute: filter.attribute,
              value: data.boolean[filter.attribute],
            };
          }),
        number: defaultFilters?.number
          ?.filter((filter) => data.number[filter.attribute] !== undefined)
          .map((filter) => {
            if (data.number[filter.attribute] !== undefined) selectedCategories.add(filter.attribute);
            return {
              attribute: filter.attribute,
              from_: data.number[filter.attribute][0],
              to: data.number[filter.attribute][1],
            };
          }),
      };

      setSelectedCategoriesCount(selectedCategories.size);

      return {
        office_id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        filters: filters as any || {},
        query,
        coordinates: COORDINATES,
        sort,
        pagination: {
          cursor,
          ...(isLimit ? { limit: limitRef.current } : {}),
        },
      };
    },
    [defaultFilters, sort, activeOffice],
  );

  // Функция для отправки фильтров и загрузки продуктов
  const submitFilters = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (data: FilterValues) => {
      if (searchText) {
        const requestPayload = getFilterRequestPayload(data, null, searchText, false, activeOffice);
        loadProducts(requestPayload).then(((res) => {
          setProducts(res?.data?.products || []);
          setCursor(res?.data?.pagination?.cursor || null);
        }));
      }
      setIsModalOpen(false);
    },
    [getFilterRequestPayload, loadProducts],
  );

  // Функция для сброса фильтров к значениям по умолчанию
  const resetFilters = useCallback(() => {
    methods.reset(getDefaultValues(defaultFilters));
    setActiveOffice(null);
  }, [methods, getDefaultValues, defaultFilters]);

  // Функция для открытия модального окна и сохранения текущих значений фильтров
  const handleOpenModal = useCallback(() => {
    setTempFilters(methods.getValues());
    setIsModalOpen(true);
  }, [methods]);

  // Функция для закрытия модального окна и восстановления значений фильтров
  const handleCloseModal = useCallback(() => {
    if (tempFilters) {
      methods.reset(tempFilters);
    }
    setIsModalOpen(false);
  }, [methods, tempFilters]);

  // Функция для загрузки дополнительных продуктов при скролле или нажатии на кнопку "Загрузить еще"
  const loadMoreProducts = useCallback(() => {
    const requestPayload = getFilterRequestPayload(data, cursor, searchText, true, activeOffice);
    if (searchText) {
      loadProducts(requestPayload).then(((res) => {
        setProducts((prevState) => [...prevState, ...res?.data?.products || []]);
        setCursor(res?.data?.pagination?.cursor || null);
      }));
    }
  }, [cursor, getFilterRequestPayload, loadProducts, methods]);

  const blockingMessageProps = {
    dataLength: productsData?.products.length,
    searchText,
    isFiltersError,
    isProductsError,
    isFiltersLoading,
    isProductsLoading,
  };

  // Обновление фильтров по умолчанию при изменении данных фильтров
  useEffect(() => {
    if (filtersData) {
      setDefaultFilters(filtersData?.filters);
    }
  }, [filtersData]);

  // Обновление списка продуктов при изменении параметров сортировки
  useEffect(() => {
    const requestPayload = getFilterRequestPayload(data, null, searchText, false, activeOffice);
    setProducts([]);
    if (searchText) {
      loadProducts(requestPayload).then((res) => {
        setProducts(res?.data?.products || []);
      });
    }
  }, [sort, activeOffice]);

  // Обновление данных фильтров и выполнение запроса продуктов при изменении query параметров или данных фильтров
  useEffect(() => {
    const requestPayload = getFilterRequestPayload(data, null, searchText, false, activeOffice);
    if (searchText) {
      loadProducts(requestPayload).then((res) => {
        setProducts(res?.data?.products || []);
        setCursor(res?.data?.pagination?.cursor || null);
      });
    }
  }, [filtersData, defaultFilters, isAuthenticated]);

  return (
    <>
      <div className={clsx(
        styles.productsPageWrapper,
        isContentHidden && styles.productsPageWrapperHidden,
      )}
      >
        <FormProvider {...methods}>
          <FiltersBar
            isLoadingOffice={isLoadingOffice}
            onGetNewOffices={handleGetNewOffices}
            isLoading={isFiltersLoading}
            handleSubmit={methods.handleSubmit(submitFilters)}
            handleCloseModal={handleCloseModal}
            isModalOpen={isModalOpen}
            filters={defaultFilters}
            resetFilters={resetFilters}
          />
        </FormProvider>
        <InfinityScroll
          isLoading={isProductsLoading}
          handleOnFetch={loadMoreProducts}
          hasNextPage={productsData?.pagination.cursor !== null}
        >
          <ProductsContainer
            isLoading={isProductsLoading}
            loadMoreProducts={loadMoreProducts}
            handleOpenModal={handleOpenModal}
            selectedCategoriesCount={selectedCategoriesCount}
            products={products}
            hasMore={productsData?.pagination.cursor !== null}
          />
        </InfinityScroll>
      </div>

      <SearchBlockingMessage {...blockingMessageProps} />
    </>
  );
};

export default Search;
