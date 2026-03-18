import {
  GridWrapper,
  ImageItem,
  MainSectionInfo,
  MainSectionPartners,
  MainSectionTitle,
} from '@/entities/Product';
import { ProductSectionWrapper, Skeletons } from '@/shareds/ui';
import { IProductCurrent } from '@/redux/services/types/products';
import styles from './styles.module.scss';

interface IProps {
  isLoading: boolean;
  data: IProductCurrent | undefined;
}

export const MainSection = ({ isLoading, data }: IProps) => {
  const {
    id,
    image_url: imageUrl,
    world_place: worldPlace,
    region_place: regionPlace,
    vineyard_place: vineyardPlace,
    name,
    rating_customer: ratingCustomer,
    rating_expert: ratingExpert,
    short_description: shortDescription,
    vintages,
    properties,
    is_liked: isLiked,
    offer,
  } = data || {};

  return (
    <ProductSectionWrapper>
      {isLoading
        ? <Skeletons.ProductSkeleton.MainSectionSkeleton />
        : (
          <GridWrapper className={styles.gridWrapper}>
            <ImageItem
              className={styles.img}
              imageUrl={imageUrl}
              worldPlace={worldPlace}
              regionPlace={regionPlace}
              vineyardPlace={vineyardPlace}
            />
            <MainSectionTitle
              className={styles.title}
              title={name}
              ratingCustomer={ratingCustomer}
              ratingExpert={ratingExpert}
            />
            <MainSectionInfo
              className={styles.info}
              shortDescription={shortDescription}
              vintages={vintages}
              productId={id}
              properties={properties}
            />
            <MainSectionPartners
              className={styles.partners}
              isLiked={isLiked}
              productId={id}
              properties={properties}
              offer={offer}
            />
          </GridWrapper>
        )}
    </ProductSectionWrapper>
  );
};
