/* eslint-disable import/no-cycle */
import { ContentWrapper, Skeletons } from '@/shareds/ui';
import { CatalogCard } from '@/entities/Home';
import {
  IGetCatalogSecondLevelResponse,
  IPresetResponse,
} from '@/redux/services/types/catalog';
import { useImageError } from '@/shareds/hooks/useImageError';
import { FilterValues } from '@/redux/services/types/filters';
import ArrayRender from '@/shareds/utils/components/ArrayRender';
import React from 'react';
import clsx from 'clsx';
import { WineSelectionSection } from '@/sections/Home/WineSelectionSection';
import styles from './styles.module.scss';

export interface WineSectionProps {
  generateCardHref: (filters: FilterValues) => string;
  wineData: IGetCatalogSecondLevelResponse;
  isLoading?: boolean;
}

function WineSection({
  generateCardHref,
  wineData,
  isLoading,
}: WineSectionProps) {
  const { handleError, errorImages } = useImageError();

  const skeletons = Array.from({ length: 12 }, (_, index) => (
    <Skeletons.CatalogSkeletons.CatalogCardSkeleton key={index} />
  ));

  if (isLoading) {
    return <ContentWrapper isLoading={isLoading}>{skeletons}</ContentWrapper>;
  }

  return (
    <ArrayRender
      items={wineData?.presets}
      renderItem={(
        { title, is_large, values }: IPresetResponse,
        index: number,
      ) => (
        <>
          <ContentWrapper className={clsx(is_large && styles.inner)} title={title}>
            <ArrayRender
              items={values}
              renderItem={({
                id,
                title: cardTitle,
                bg_color,
                sec_color,
                image_url,
                filters: cardFilters,
              }) => (
                <CatalogCard
                  className={clsx(id === 1 && styles.first)}
                  classNameForImage={clsx(id === 1 && styles.bigImage)}
                  key={id}
                  title={cardTitle}
                  href={generateCardHref(cardFilters)}
                  img={errorImages[id] ? '' : image_url}
                  size={is_large ? 'l' : 's'}
                  backgroundColor={bg_color}
                  secondaryColor={sec_color}
                  onError={() => handleError(id)}
                />
              )}
            />
          </ContentWrapper>

          {index === 0 && <WineSelectionSection />}
        </>
      )}
    />
  );
}

export default WineSection;
