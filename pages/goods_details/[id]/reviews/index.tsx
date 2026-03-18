import { PageWrapper } from '@/shareds';
import { Layout } from '@/layouts';
import { ICrumbProps } from '@/shareds/ui/BreadCrumbs/types';
import { ReviewsSection } from '@/temporal/Reviews';
import { useEffect } from 'react';
import { useGetProductByIdQuery } from '@/redux/services/productsApi';
import { useActions } from '@/shareds/hooks/useActions';
import { productActions } from '@/redux/actions/productActions';
import { useRouter } from 'next/router';
import { COORDINATES, PATHS } from '@/shareds/consts/baseConts';

const ProductPage = () => {
  const router = useRouter();
  const id = router?.query?.id && String(router?.query?.id);

  const { setActiveProduct } = useActions(productActions);

  const { data } = useGetProductByIdQuery({
    id,
    coordinates: COORDINATES,
  }, { skip: !id });

  const title = data?.name || '';

  const crumbs: ICrumbProps[] = [
    {
      title: 'Каталог',
      href: '/',
    },
    {
      title: 'Вино',
      href: PATHS.products,
    },
    {
      title,
      href: `${PATHS.products}/${id}`,
    },
    {
      title: 'Оценки',
    },
  ];

  useEffect(() => {
    if (data) {
      setActiveProduct(data);
    }
  }, [data, setActiveProduct]);

  return (
    <Layout>
      <PageWrapper crumbs={crumbs}>
        <ReviewsSection />
      </PageWrapper>
    </Layout>
  );
};

export default ProductPage;
