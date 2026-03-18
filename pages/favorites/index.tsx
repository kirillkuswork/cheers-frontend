import { PageWrapper } from '@/shareds';
import { Layout } from '@/layouts';
import { Favorites } from '@/sections/Favorites';

function FavoritesPage() {
  return (
    <Layout>
      <PageWrapper title="Избранное">
        <Favorites />
      </PageWrapper>
    </Layout>
  );
}

export default FavoritesPage;
