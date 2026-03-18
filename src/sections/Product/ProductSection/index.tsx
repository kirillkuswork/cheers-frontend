/* eslint-disable react/jsx-no-useless-fragment */
import { useLazyGetProductByIdQuery } from '@/redux/services/productsApi';
import { useActions } from '@/shareds/hooks/useActions';
import { productActions } from '@/redux/actions/productActions';
import { useEffect } from 'react';
import { useAuth } from '@/shareds/providers/AuthProvider';
import { useDynamicId } from '@/temporal/useGetId';
import { COORDINATES } from '@/shareds/consts/baseConts';
import { AboutProductSection } from './AboutProductSection';
import { PropertiesSection } from './PropertiesSection';
import { ProducerSection } from './ProducerSection';
import { MainSection } from './MainSection';
import { RatingSection } from './RatingSection';
import { PartnersSection } from './PartnersSection';
import { AnalogSection } from './AnalogSection';

export const ProductSection = () => {
  const productId = useDynamicId();
  const { isAuthenticated } = useAuth();
  const { setActiveProduct } = useActions(productActions);

  const getProductProps = { id: productId, coordinates: COORDINATES };

  const [getProduct, { data, isFetching }] = useLazyGetProductByIdQuery();

  const props = {
    isLoading: isFetching,
    data,
  };

  useEffect(() => {
    if (data) {
      setActiveProduct(data);
    }
  }, [data, setActiveProduct]);

  useEffect(() => {
    if (productId) {
      getProduct(getProductProps);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, isAuthenticated]);

  if (!data && !isFetching) {
    return null;
  }

  return (
    <>
      <MainSection {...props} />
      <AnalogSection />
      <AboutProductSection {...props} />
      <PropertiesSection {...props} />
      <ProducerSection {...props} />
      <RatingSection />
      <PartnersSection />
    </>
  );
};

export default ProductSection;
