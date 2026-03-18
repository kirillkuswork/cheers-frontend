import React, { useEffect, useRef, useState } from 'react';
import { ProductSectionWrapper, Skeletons } from '@/shareds';
import {
  GridWrapper,
  InfoList,
  SectionContent,
  SectionTitle,
} from '@/entities/Product';
import { ProducerItem } from '@/entities/Product/ProducerItem';
import Image from 'next/image';
import { ShowMoreButton } from '@/shareds/ui/ShowMoreButton';
import { IProductCurrent } from '@/redux/services/types/products';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface IProps {
  isLoading: boolean;
  data: IProductCurrent | undefined;
}

export const ProducerSection = ({ isLoading, data }: IProps) => {
  const [showMore, setShowMore] = useState(true);
  const [descHeight, setDescHeight] = useState<number>(0);
  const descValue = data?.producer.description;
  const description = useRef(null);

  const fourRowsMinHeight = 61;

  useEffect(() => {
    if (descValue) {
      // вычисляем высоту описания, если больше 3х строк,
      // то обрезаем до 3х и показываем кнопку ShowMoreButton
      // @ts-expect-error не видит свойство
      const descHeightValue = description?.current.offsetHeight;
      if (descHeightValue >= fourRowsMinHeight) {
        setDescHeight(descHeightValue);
        setShowMore(false);
      }
    }
  }, [descValue]);
  return (
    <ProductSectionWrapper className={styles.wrapper}>
      {isLoading
        ? <Skeletons.ProductSkeleton.ProducerSectionSkeleton />
        : (
          <GridWrapper className={styles.grid}>
            <SectionTitle className={styles.title}>Производитель</SectionTitle>
            <SectionContent className={styles.content}>
              <InfoList className={styles.list}>
                <ProducerItem showMore={showMore} ref={description} data={data} />
              </InfoList>
              {/* если описание 4 и больше строк, то показываем кнопку */}
              {descHeight >= fourRowsMinHeight && (
                <ShowMoreButton
                  size="small"
                  showMore={showMore}
                  onClick={() => setShowMore(!showMore)}
                  label="Раскрыть"
                  variant="tertiary"
                />
              )}
            </SectionContent>
            <Image
              className={clsx(styles.img, descHeight < fourRowsMinHeight && styles.shortContent)}
              src="/images/product/producer_icon.png"
              alt="wine"
              width={384}
              height={252}
            />
          </GridWrapper>
        )}
    </ProductSectionWrapper>
  );
};
