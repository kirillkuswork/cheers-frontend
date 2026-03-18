import { FC } from 'react';
import useBreakpoint from '@/shareds/hooks/useBreakpoint';
import { SlidersHorizontal } from '@/assets/icons';
import { IProductsSortingProps } from '@/entities/Products/ProductsSorting/types';
import { Skeletons } from '@/shareds';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import styles from './styles.module.scss';

interface IMobileFilterControl
  extends Pick<
  IProductsSortingProps,
  'handleOpenModal' | 'selectedCategoriesCount' | 'isLoading'
  > {}

export const MobileFilterControl: FC<IMobileFilterControl> = ({
  handleOpenModal,
  selectedCategoriesCount,
  isLoading,
}) => {
  const breakpoint = useBreakpoint();
  const { activeOffice } = useSelector(selectors.officeSelector);
  const finalCategoriesCount = activeOffice ? selectedCategoriesCount + 1 : selectedCategoriesCount;

  const isMobile = breakpoint === 'xs';
  const isSmallTablet = breakpoint === 'sm';
  const isDevice = isMobile || isSmallTablet;
  if (isDevice && isLoading) {
    return <Skeletons.MobileFilterControlSkeleton />;
  }

  return (
    isDevice && (
      <div className={styles.filtersWrapper}>
        <div
          onClick={handleOpenModal}
          className={styles.clickArea}
        >
          <span className={styles.title}>Фильтры</span>
          <SlidersHorizontal />
        </div>
        <div className={styles.counter}>{finalCategoriesCount}</div>
      </div>
    )
  );
};
