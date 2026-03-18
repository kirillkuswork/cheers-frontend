/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { adminApi } from '@/redux/services';
import {
  IGetAdminProductsResponse,
  IGetAdminProductsRequest,
  ISort,
  IGetAdminBaseCardResponse,
  IGetAdminProductAttributesResponse,
  ISelectedProductValues,
  ISelectedBaseCard,
  IAdminBaseCardByIdResponse, IGetAdminOffersResponse, IVivinoSyncResponse,
} from '@/redux/services/types/admin';
import { FieldValues } from 'react-hook-form';

interface IAdminState {
  isAddingModalOpen: boolean;
  isCreatProductModalOpen: boolean;
  isAddPartnerOfferModalOpen: boolean;
  isSynchronizationModalOpen: boolean;
  productsData: IGetAdminProductsResponse | null;
  isProductsLoading: boolean;
  isProductsError: boolean;
  filters: IGetAdminProductsRequest;
  baseCardsData: IGetAdminBaseCardResponse | null;
  selectedBaseCard: ISelectedBaseCard | null;
  productAttributes: IGetAdminProductAttributesResponse | null;
  selectedProductType: string;
  selectedProductValues: ISelectedProductValues | null
  baseCardById: IAdminBaseCardByIdResponse
  offersData: IGetAdminOffersResponse | null;
  isOffersError: boolean;

  // vivino synchronization
  vivinoData: IVivinoSyncResponse
  vivinoId: number | null
  isSyncError: boolean
  isVivinoIdError: boolean
  synchronizedData: FieldValues | null
}

const initialState: IAdminState = {
  isAddingModalOpen: false,
  isCreatProductModalOpen: false,
  isAddPartnerOfferModalOpen: false,
  isSynchronizationModalOpen: false,
  productsData: null,
  isProductsLoading: false,
  isProductsError: false,
  filters: {
    is_hidden: null,
    is_syncronized: null,
    query: null,
    pagination: {
      cursor: null,
      limit: 20,
    },
    sort: {
      field: 'updated_at',
      order_direction: 'ASC',
    },
  },
  baseCardsData: null,
  selectedBaseCard: {} as ISelectedBaseCard,
  productAttributes: null,
  selectedProductType: '',
  selectedProductValues: {} as ISelectedProductValues,
  baseCardById: {} as IAdminBaseCardByIdResponse,
  offersData: null,
  isOffersError: false,

  // vivino synchronization
  vivinoData: {} as IVivinoSyncResponse,
  vivinoId: null,
  isSyncError: false,
  isVivinoIdError: false,
  synchronizedData: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAddingModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isAddingModalOpen = action.payload;
    },
    setCreatProductModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isCreatProductModalOpen = action.payload;
    },
    setAddPartnerOfferModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isAddPartnerOfferModalOpen = action.payload;
    },
    setSynchronizationModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isSynchronizationModalOpen = action.payload;
    },
    setProductsData: (state, action: PayloadAction<IGetAdminProductsResponse | null>) => {
      state.productsData = action.payload;
    },
    setFilters: (state, action: PayloadAction<IGetAdminProductsRequest>) => {
      state.filters = action.payload;
    },
    updateFilters: (state, action: PayloadAction<Partial<IGetAdminProductsRequest>>) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    updateSort: (state, action: PayloadAction<ISort>) => {
      state.filters.sort = action.payload;
    },
    clearBaseCardsData: (state) => {
      state.baseCardsData = null;
    },
    setBaseCardsData: (state, action: PayloadAction<IGetAdminBaseCardResponse>) => {
      state.baseCardsData = action.payload;
    },
    updateBaseCardsData: (state, action: PayloadAction<IGetAdminBaseCardResponse>) => {
      if (state.baseCardsData) {
        state.baseCardsData.cards = [
          ...state.baseCardsData.cards,
          ...action.payload.cards,
        ];
        state.baseCardsData.pagination = action.payload.pagination;
      }
    },
    setSelectedBaseCard: (state, action: PayloadAction<ISelectedBaseCard | null>) => {
      state.selectedBaseCard = action.payload;
    },
    setSelectedProductType: (state, action: PayloadAction<string>) => {
      state.selectedProductType = action.payload;
    },
    setSelectedProductValues: (state, action: PayloadAction<Partial<ISelectedProductValues> | null>) => {
      state.selectedProductValues = {
        ...state.selectedProductValues,
        ...action.payload,
      };
    },
    setOffersData: (state, action: PayloadAction<IGetAdminOffersResponse | null>) => {
      state.offersData = action.payload;
    },

    // vivino synchronization
    setVivinoId: (state, action: PayloadAction<number | null>) => {
      state.vivinoId = action.payload;
    },
    setIsSyncError: (state, action: PayloadAction<boolean>) => {
      state.isSyncError = action.payload;
    },
    setIsVivinoIdError: (state, action: PayloadAction<boolean>) => {
      state.isVivinoIdError = action.payload;
    },
    setSynchronizedData: (state, action: PayloadAction<FieldValues | null>) => {
      state.synchronizedData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      adminApi.endpoints.getAdminProducts.matchFulfilled,
      (state, { payload }) => {
        state.isProductsLoading = false;
        state.productsData = payload;
      },
    );
    builder.addMatcher(
      adminApi.endpoints.getAdminProducts.matchPending,
      (state) => {
        state.isProductsLoading = true;
      },
    );
    builder.addMatcher(
      adminApi.endpoints.getAdminProducts.matchRejected,
      (state) => {
        state.isProductsLoading = false;
        state.isProductsError = true;
      },
    );
    builder.addMatcher(
      adminApi.endpoints.getAdminProductAttributes.matchFulfilled,
      (state, { payload }) => {
        state.productAttributes = payload;
      },
    );
    builder.addMatcher(
      adminApi.endpoints.getAdminBaseCardById.matchFulfilled,
      (state, { payload }) => {
        state.baseCardById = payload;
        state.selectedProductValues = null;
      },
    );
    builder.addMatcher(
      adminApi.endpoints.getAdminOffers.matchFulfilled,
      (state, { payload }) => {
        state.offersData = payload;
      },
    );
    builder.addMatcher(
      adminApi.endpoints.getAdminOffers.matchRejected,
      (state) => {
        state.isOffersError = true;
      },
    );
    builder.addMatcher(
      adminApi.endpoints.getSyncWithVivino.matchFulfilled,
      (state, { payload }) => {
        state.vivinoData = payload;
      },
    );
  },
});

export const {
  setAddingModalOpen,
  setCreatProductModalOpen,
  setAddPartnerOfferModalOpen,
  setSynchronizationModalOpen,
  setProductsData,
  setFilters,
  updateFilters,
  updateSort,
  clearBaseCardsData,
  updateBaseCardsData,
  setBaseCardsData,
  setSelectedBaseCard,
  setSelectedProductType,
  setSelectedProductValues,
  setOffersData,

  // vivino synchronization
  setVivinoId,
  setIsSyncError,
  setIsVivinoIdError,
  setSynchronizedData,
} = adminSlice.actions;

export default adminSlice.reducer;
