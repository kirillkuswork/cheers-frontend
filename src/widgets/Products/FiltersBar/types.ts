import { IFiltersResponse } from '@/redux/services/types/filters';
import { IGetProductsRequest } from '@/redux/services/types/products';

export interface IFilterBarProps {
  isLoading: boolean;
  isLoadingOffice: boolean,
  handleCloseModal: () => void;
  onGetNewOffices: () => void,
  isModalOpen: boolean;
  filters?: IFiltersResponse;
  getProducts?: (params: IGetProductsRequest) => void;
  handleSubmit: () => void;
  resetFilters: () => void;
}
