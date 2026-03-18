import { ProductSectionWrapper } from '@/shareds';
import {
  GridWrapper, SectionTitle,
} from '@/entities/Product';
import { AnalogSlider } from '@/features/Products';
import { useGetSuggestsQuery } from '@/redux/services/productsApi';
import { useDynamicId } from '@/temporal/useGetId';
import { AnalogSectionSkeleton } from '@/shareds/ui/Skeletons/ProductSkeleton/AnalogSectionSkeleton';
import { COORDINATES } from '@/shareds/consts/baseConts';
import styles from './styles.module.scss';

export const AnalogSection = () => {
  const id = useDynamicId();

  const { data, isFetching } = useGetSuggestsQuery({ id, coordinates: COORDINATES });

  if (isFetching) {
    return (
      <ProductSectionWrapper className={styles.wrapper}>
        <GridWrapper className={styles.grid}>
          <SectionTitle className={styles.title}>Похожие российские вина</SectionTitle>
          <AnalogSectionSkeleton />
        </GridWrapper>
      </ProductSectionWrapper>
    );
  }

  if (!data || data?.length === 0) return null;

  return (
    <ProductSectionWrapper className={styles.wrapper}>
      <GridWrapper className={styles.grid}>
        <SectionTitle className={styles.title}>Похожие российские вина</SectionTitle>
        <AnalogSlider data={data} />
      </GridWrapper>
    </ProductSectionWrapper>
  );
};
