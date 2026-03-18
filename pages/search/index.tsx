import { PageWrapper } from '@/shareds';
import { Layout } from '@/layouts';
import { useRouter } from 'next/router';
import Search from '@/sections/Search';
import CRUMBS_PROPS from '../../src/sections/Search/constants';

function SearchPage() {
  const router = useRouter();
  const { searchText } = router.query;

  return (
    <Layout>
      <PageWrapper crumbs={CRUMBS_PROPS} title={searchText || 'Результаты поиска'}>
        <Search />
      </PageWrapper>
    </Layout>
  );
}

export default SearchPage;
