import { ContentWrapper, Skeletons } from '@/shareds/ui';
import Link from 'next/link';
import React, { useCallback, useEffect } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { enumSelector } from '@/redux/selectors/enumSelectors';
import { useLazyGetBannerQuery } from '@/redux/services/bannerApi';
import ArrayRender from '@/shareds/utils/components/ArrayRender';
import { IBanner } from '@/redux/services/types/banners';
import styles from './styles.module.scss';

const skeletons = Array.from({ length: 2 }, (_, index) => (
  <Skeletons.BannerSkeleton key={index} />
));

const BannerSection = () => {
  const { enumData: { PageLocationEnum } } = useSelector(enumSelector);
  const [getBanner, { data, isFetching }] = useLazyGetBannerQuery();

  useEffect(() => {
    if (PageLocationEnum) {
      getBanner({
        location: PageLocationEnum?.second_level_catalog,
        pagination: { cursor: null, limit: 2 },
      });
    }
  }, [PageLocationEnum, getBanner]);
  const renderContent = useCallback((props: IBanner) => {
    const { link, image_url: imageUrl, id } = props;
    return (
      <Link key={id} href={link} className={styles.imgWrapper}>
        <Image fill alt="баннер" src={imageUrl} />
      </Link>
    );
  }, []);

  if (isFetching) {
    return <ContentWrapper className={styles.wrapper}>{skeletons}</ContentWrapper>;
  }

  if (!data) {
    return null;
  }

  return (
    <ContentWrapper className={styles.wrapper}>
      <ArrayRender items={data?.banners} renderItem={renderContent} />
    </ContentWrapper>
  );
};

export default BannerSection;
