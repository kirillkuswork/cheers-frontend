import { IProduct } from '@/redux/services/types/products';
import { IBanner } from '@/redux/services/types/banners';

export interface IProductsContainerProps {
  handleOpenModal: () => void;
  products: (IProduct | IBanner)[] ;
  selectedCategoriesCount: number;
  hasMore: boolean;
  loadMoreProducts: () => void;
  isLoading: boolean;
  isButton?: boolean;
}
