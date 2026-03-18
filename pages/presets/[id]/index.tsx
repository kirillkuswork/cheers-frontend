import { BlockingMessage, PageWrapper } from '@/shareds';
import { Layout } from '@/layouts';
import { useLazyGetPresetQuery } from '@/redux/services/productsApi';
import { useDynamicId } from '@/temporal/useGetId';
import { useCallback, useEffect, useState } from 'react';
import { COORDINATES } from '@/shareds/consts/baseConts';
import { PresetSection } from '@/sections/Preset';
import { IProduct } from '@/redux/services/types/products';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';

const PresetPage = () => {
  const presetId = useDynamicId();
  const [cursor, setCursor] = useState<string | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [errorMessage, setErrorMesage] = useState(null);
  const { sort } = useSelector(selectors.presetSelector);
  const limit = 24;

  const getPresetProps = {
    coordinates: COORDINATES,
    id: presetId || '',
    sort,
    pagination: {
      limit,
      cursor,
    },
  };

  const [getPreset, { data, isFetching, isError }] = useLazyGetPresetQuery();

  const loadMoreProducts = useCallback(() => {
    getPreset(getPresetProps).then(((res) => {
      setProducts((prevState) => [...prevState as IProduct[], ...res?.data?.products || []]);
      setCursor(res?.data?.pagination?.cursor || null);
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor]);

  useEffect(() => {
    if (presetId) {
      getPreset(getPresetProps).then((res) => {
        if (res?.isError) {
          // @ts-expect-error Не типизирована ошибка
          setErrorMesage(res?.error?.data?.message);
        }
        setProducts(res.data?.products || []);
        setCursor(res?.data?.pagination?.cursor || null);
        setIsInitialized(true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetId, sort]);

  if (isError) {
    return (
      <Layout>
        <PageWrapper title={errorMessage || 'Ошибка'}>
          <BlockingMessage
            showButton
            buttonLabel="Обновить"
          />
        </PageWrapper>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageWrapper
        title={data?.title || ''}
        subtitle={data?.description || ''}
        imgUrl={data?.header_image_url || ''}
        isLoading={!isInitialized}
      >
        <PresetSection
          products={products}
          isLoading={isFetching || !isInitialized}
          hasMore={data?.pagination.cursor !== null}
          loadMoreProducts={loadMoreProducts}
          limit={limit}
        />
      </PageWrapper>
    </Layout>
  );
};

export default PresetPage;
