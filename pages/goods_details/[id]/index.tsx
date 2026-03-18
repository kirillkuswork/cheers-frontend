import { PageWrapper } from '@/shareds';
import { Layout } from '@/layouts';
import { ICrumbProps } from '@/shareds/ui/BreadCrumbs/types';
import { ProductSection } from '@/sections/Product';

const crumbs: ICrumbProps[] = [
  {
    title: 'Каталог',
    href: '/',
  },
  {
    title: 'Вино',
  },
];

const ProductPage = () => (
  <Layout>
    <PageWrapper crumbs={crumbs}>
      <ProductSection />
    </PageWrapper>
  </Layout>
);

export default ProductPage;
