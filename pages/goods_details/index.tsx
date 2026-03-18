import { PageWrapper } from '@/shareds';
import { Layout } from '@/layouts';
import { ICrumbProps } from '@/shareds/ui/BreadCrumbs/types';
import Products from '@/sections/Products';

const crumbs: ICrumbProps[] = [
  {
    title: 'Каталог',
    href: '/',
  },
  {
    title: 'Вино',
  },
];

function ProductsPage() {
  return (
    <Layout>
      <PageWrapper crumbs={crumbs} title="Вино">
        <Products />
      </PageWrapper>
    </Layout>
  );
}

export default ProductsPage;
