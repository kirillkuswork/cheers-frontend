import React, { useState } from 'react';
import { ProductSectionWrapper, Skeletons } from '@/shareds';
import {
  AboutProductListItem,
  Box,
  GridWrapper,
  SectionContent,
  SectionTitle,
} from '@/entities/Product';
import { ArrayRender } from '@/shareds/utils/components';
import { DonutSection } from '@/features/Products';
import { ShowMoreButton } from '@/shareds/ui/ShowMoreButton';
import { IDescriptionCurrent, IProductCurrent } from '@/redux/services/types/products';
import removeEmptyFields from '@/shareds/helpres/removeEmptyFields';
import styles from './styles.module.scss';
import { DESCRIPTION_KEYS } from '../constants';

interface IProps {
  isLoading: boolean;
  data: IProductCurrent | undefined;
}

export const AboutProductSection = ({ isLoading, data }: IProps) => {
  const [showMore, setShowMore] = useState(false);

  const {
    taste_notes: tasteNotes,
    additional_properties: addProps,
    description,
  } = data || {};

  const finalProps = removeEmptyFields(description || {});
  const descKeys = Object.keys(finalProps);
  if (!description || !descKeys?.length) return null;
  return (
    <ProductSectionWrapper>
      {isLoading
        ? <Skeletons.ProductSkeleton.AboutProductSectionSkeleton />
        : (
          <GridWrapper className={styles.gidWrapper}>
            <SectionTitle className={styles.title}>О продукте</SectionTitle>
            <SectionContent className={styles.content}>
              {description && (
                <Box className={styles.list}>
                  <ArrayRender
                    items={descKeys.slice(
                      0,
                      showMore ? descKeys.length : 6,
                    )}
                    renderItem={(item) => (
                      description[item as keyof IDescriptionCurrent]
                        ? (
                          <AboutProductListItem
                            key={item}
                            title={DESCRIPTION_KEYS[item as keyof IDescriptionCurrent]}
                            description={description[item as keyof IDescriptionCurrent]}
                          />
                        ) : null
                    )}
                  />
                </Box>
              )}
              {descKeys.length > 6 && (
                <ShowMoreButton
                  size="small"
                  showMore={showMore}
                  onClick={() => setShowMore(!showMore)}
                  label="Раскрыть"
                  variant="tertiary"
                />
              )}
            </SectionContent>
            <DonutSection
              tasteNotes={tasteNotes}
              addProps={addProps}
            />
          </GridWrapper>
        )}
    </ProductSectionWrapper>
  );
};
