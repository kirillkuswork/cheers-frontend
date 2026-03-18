import { useState } from 'react';
import { ProductSectionWrapper, Skeletons } from '@/shareds';
import {
  GridWrapper,
  InfoList,
  InfoListItem,
  SectionContent,
  SectionTitle,
} from '@/entities/Product';
import { ArrayRender } from '@/shareds/utils/components';
import { ShowMoreButton } from '@/shareds/ui/ShowMoreButton';
import { IProductCurrent } from '@/redux/services/types/products';
import removeEmptyFields from '@/shareds/helpres/removeEmptyFields';
import getVolumeUnit from '@/shareds/helpres/getVolumeUnit';
import styles from './styles.module.scss';
import { PROPERTIES_KEYS } from '../constants';
import { INeededProps } from './types';

interface IProps {
  isLoading: boolean;
  data: IProductCurrent | undefined;
}
export const PropertiesSection = ({ isLoading, data }: IProps) => {
  const [showMore, setShowMore] = useState(false);

  const {
    properties, producer, year, description,
  } = data || {};

  const neededProps: INeededProps = {
    name: producer?.name,
    country: properties?.country,
    region: properties?.region,
    grapes: properties?.grapes,
    materials: properties?.materials,
    color: properties?.color,
    sweetness: properties?.sweetness,
    year,
    volume: `${properties?.volume}${getVolumeUnit(properties?.volume)}`,
    temperature: description?.temperature,
    abv: `${data?.additional_properties?.abv}%` as string,
  };

  const finalProps = removeEmptyFields(neededProps);
  const propKeys = Object.keys(finalProps);
  if (!properties || !propKeys?.length) return null;
  return (
    <ProductSectionWrapper>
      {isLoading
        ? <Skeletons.ProductSkeleton.PropertiesSectionSkeleton />
        : (
          <GridWrapper>
            <SectionTitle>Характеристики</SectionTitle>
            <SectionContent className={styles.content}>
              <InfoList>
                {properties && (
                  <ArrayRender
                    items={propKeys.slice(0, showMore ? propKeys.length : 6)}
                    renderItem={(item) => (
                      neededProps[item as keyof INeededProps]
                        ? (
                          <InfoListItem
                            key={item}
                            title={PROPERTIES_KEYS[item as keyof INeededProps]}
                            description={neededProps[item as keyof INeededProps]}
                          />
                        ) : null
                    )}
                  />
                )}
              </InfoList>
              {propKeys.length > 6 && (
                <ShowMoreButton
                  size="small"
                  showMore={showMore}
                  onClick={() => setShowMore(!showMore)}
                  label="Раскрыть"
                  variant="tertiary"
                />
              )}
            </SectionContent>
          </GridWrapper>
        )}
    </ProductSectionWrapper>
  );
};
