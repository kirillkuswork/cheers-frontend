import { IProductsContainerProps } from '@/widgets/Products/ProductsContainer/types';

export interface IProductsSortingProps
  extends Pick<
  IProductsContainerProps,
  'isLoading' | 'handleOpenModal' | 'selectedCategoriesCount'
  > {}
