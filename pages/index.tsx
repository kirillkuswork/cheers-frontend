/* eslint-disable @typescript-eslint/no-unused-vars */
import Head from 'next/head';
import { Layout } from '@/layouts';
import { ICrumbProps } from '@/shareds/ui/BreadCrumbs/types';
import { PageWrapper } from '@/shareds/ui';
import { BannerSection, WineSection } from '@/sections/Home';
import { useGetCatalogByIdQuery, useGetCatalogQuery } from '@/redux/services/catalogApi';
import { useCallback, useMemo } from 'react';
import { generateCardHref, getTopLevelFilters } from '@/shareds/utils/filtersUtils';
import { FilterValues } from '@/redux/services/types/filters';

const crumbs: ICrumbProps[] = [
  {
    title: 'Каталог',
  },
];

function Home() {
  const { data } = useGetCatalogQuery();
  const { data: wineData, isFetching } = useGetCatalogByIdQuery('1');

  const topLevelFilters = useMemo(
    () => getTopLevelFilters(wineData?.filters),
    [wineData],
  );
  const getCardHref = useCallback(
    (cardFilters: FilterValues) => generateCardHref(cardFilters, topLevelFilters),
    [topLevelFilters],
  );

  return (
    <>
      <Head>
        <title>Cheers!</title>
      </Head>
      <Layout>
        <PageWrapper
          crumbs={crumbs}
          title="Каталог"
          subtitle="У нас представлены отборные вина Франции, Италии, Аргентины, Чили и других стран.
          Выбор проще начать с популярных разделов каталога."
        >
          <WineSection
            isLoading={isFetching}
            wineData={wineData!}
            generateCardHref={getCardHref}
          />
          <BannerSection />
        </PageWrapper>
      </Layout>
    </>
  );
}

export default Home;
