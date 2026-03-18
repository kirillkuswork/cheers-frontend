/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable import/no-cycle */
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
import { enumSelector } from '@/redux/selectors/enumSelectors';
import { useLazyGetBannerQuery } from '@/redux/services/bannerApi';
import { IBanner } from '@/redux/services/types/banners';
import useApplyFilters from '@/shareds/hooks/useApplyFilters';
import { filtersActions } from '@/redux/actions/filtersActions';
import { selectors } from '@/redux/selectors';
import { useActions } from '@/shareds/hooks/useActions';
import { productsActions } from '@/redux/actions/productsActions';
import { COORDINATES } from '@/shareds/consts/baseConts';
import { useAuth } from '@/shareds/providers/AuthProvider';
import { InfinityScroll } from '@/shareds/ui';
import { useLazyGetOfficesQuery } from '@/redux/services/officeApi';
import { officeActions } from '@/redux/actions/officeActions';
import styles from './styles.module.scss';

const Products = () => {
  const { isAuthenticated } = useAuth();
  const [isInitial, setIsInitial] = useState(true);
  // Состояние для открытия/закрытия модального окна фильтров
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // ToDo Обновить до этого хука
  // const filtres = useFilterController();
  // Состояние для хранения курсора пагинации
  const [cursor, setCursor] = useState<string | null>(null);
  const [officeCursor, setOfficeCursor] = useState<string | null | undefined>(null);
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
  const { quizFilters } = useSelector(selectors.filtersSelector);
  const { setQuizFilters } = useActions(filtersActions);
  const { setQuizHeaderInfo } = useActions(productsActions);
  const { activeOffice } = useSelector(selectors.officeSelector);
  const { setActiveOffice } = useActions(officeActions);

  // Enum для определения страницы для загрузки баннера
  const { enumData: { PageLocationEnum } } = useSelector(enumSelector);

  // Инициализация роутера для работы с URL параметрами
  const router = useRouter();

  // Хук для выполнения запроса на получение фильтров
  const { data: filtersData, isFetching: isFiltersLoading } = useGetFiltersQuery({ filters: {} });

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
  // Хук для выполнения ленивого запроса на получение продуктов
  const [loadProducts, { data: productsData, isFetching: isProductsLoading }] = useLazyGetProductsQuery();

  // Хук для выполнения ленивого запроса на получение баннеров
  const [getBanner, { data: bannerData }] = useLazyGetBannerQuery();

  // Ссылка на количество загружаемых продуктов за один запрос
  const limitRef = useRef<number>(20);

  // Функция для получения значений фильтров по умолчанию
  const getDefaultValues = (filters: IFiltersResponse) => ({
    string: filters?.string?.reduce(
      (acc, filter) => {
        acc[filter.attribute] = Object.fromEntries(
          filter.value.map((value) => [value, false]),
        );
        return acc;
      },
      {} as FilterValues['string'],
    ),
    boolean: filters?.boolean?.reduce(
      (acc, filter) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        acc[filter.attribute] = undefined;
        return acc;
      },
      {} as FilterValues['boolean'],
    ),
    number: filters?.number?.reduce(
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
      data: FilterValues,
      cursor: string | null,
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
    (data: FilterValues) => {
      const requestPayload = getFilterRequestPayload(data, null, false, activeOffice);
      loadProducts(requestPayload).then(((res) => {
        setProducts(res?.data?.products || []);
        setCursor(res?.data?.pagination?.cursor || null);
      }));
      // setIsModalOpen(false);
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
    const requestPayload = getFilterRequestPayload(data, cursor, true, activeOffice);
    loadProducts(requestPayload).then(((res) => {
      setProducts((prevState) => [...prevState as IProduct[], ...res?.data?.products || []]);
      setCursor(res?.data?.pagination?.cursor || null);
    }));
  }, [cursor, getFilterRequestPayload, loadProducts, methods]);

  // Функция для загрузки дополнительных фильтров
  // Обновление фильтров по умолчанию при изменении данных фильтров
  useEffect(() => {
    if (filtersData) {
      setDefaultFilters(filtersData?.filters);
    }
  }, [filtersData]);

  // Обновление списка продуктов при изменении параметров сортировки
  useEffect(() => {
    const requestPayload = getFilterRequestPayload(data, null, false, activeOffice);
    setProducts([]);
    loadProducts(requestPayload).then((res) => {
      setProducts(res?.data?.products || []);
    });
  }, [sort, activeOffice]);

  // Преобразование query параметров в фильтры
  const queryFilters = useMemo(() => {
    const filters: { attribute: string; value: string }[] = [];

    Object.entries(router.query).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          filters.push({ attribute: key, value: v });
        });
      } else if (typeof value === 'string') {
        filters.push({ attribute: key, value });
      }
    });

    return filters;
  }, [router.query]);
  // Обновление данных фильтров и выполнение запроса продуктов при изменении query параметров или данных фильтров
  useEffect(() => {
    if (queryFilters) {
      queryFilters.forEach((filter) => {
        if (!data.string[filter.attribute]) {
          data.string[filter.attribute] = {};
        }
        data.string[filter.attribute][filter.value] = true;
      });
    }

    const requestPayload = getFilterRequestPayload(data, null, false, activeOffice);
    loadProducts(requestPayload).then((res) => {
      if (isInitial) {
        setIsInitial(false);
      }
      setProducts(res?.data?.products || []);
      setCursor(res?.data?.pagination?.cursor || null);
      if (PageLocationEnum) {
        getBanner({
          location: PageLocationEnum?.third_level_catalog,
          pagination: {
            cursor: null,
            limit: 20,
          },
        });
      }
    });
  }, [filtersData, isInitial, defaultFilters, isAuthenticated]);

  useApplyFilters(quizFilters!, methods);

  // Объединяем продукты и баннеры
  const combinedList = useMemo(() => {
    if (!products?.length) return [];

    return products?.reduce<(IProduct | IBanner)[]>((acc, product, index) => {
      acc.push(product);
      // Вставляем баннер после каждых 8 продуктов, если количество продуктов позволяет
      if ((index + 1) % 8 === 0) {
        const bannerIndex = Math.floor(index / 8);
        if (bannerData?.banners && bannerIndex < bannerData.banners.length) {
          acc.push(bannerData.banners[bannerIndex]);
        }
      }
      return acc;
    }, []);
  }, [products, bannerData]);

  useEffect(() => () => {
    setQuizFilters(null);
    setQuizHeaderInfo(null);
  }, []);

  return (
    <div className={styles.productsPageWrapper}>
      <FormProvider {...methods}>
        <FiltersBar
          isLoadingOffice={isLoadingOffice}
          isLoading={isFiltersLoading}
          handleSubmit={methods.handleSubmit(submitFilters)}
          onGetNewOffices={handleGetNewOffices}
          handleCloseModal={handleCloseModal}
          isModalOpen={isModalOpen}
          filters={defaultFilters}
          resetFilters={resetFilters}
        />
      </FormProvider>
      <InfinityScroll
        isLoading={isProductsLoading || isInitial}
        handleOnFetch={loadMoreProducts}
        hasNextPage={productsData?.pagination.cursor !== null}
      >
        <ProductsContainer
          isLoading={isProductsLoading || isInitial}
          loadMoreProducts={loadMoreProducts}
          handleOpenModal={handleOpenModal}
          selectedCategoriesCount={selectedCategoriesCount}
          products={combinedList}
          hasMore={productsData?.pagination.cursor !== null}
        />
      </InfinityScroll>
    </div>
  );
};

export default Products;
