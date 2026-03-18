/* eslint-disable import/no-cycle */
import productsSlice from '@/redux/slices/productsSlice';
import authReducer from '@/redux/slices/authSlice';
import adminSlice from '@/redux/slices/adminSlice';
import enumSlice from '@/redux/slices/enumSlice';
import filtersSlice from '@/redux/slices/filtersSlice';
import productSlice from '@/redux/slices/productSlice';
import locationSlice from '@/redux/slices/locationSlice';
import partnersSlice from '@/redux/slices/partnersSlice';
import presetSlice from '@/redux/slices/presetSlice';
import officeSlice from '@/redux/slices/officeSlice';
import {
  filtersApi, productsApi, enumApi, catalogApi, authApi, userApi, searchApi,
  adminApi, bannerApi, favoriteApi, quizApi, officeApi,
} from '../services';
import baseFiltersSlice from '../slices/baseFiltersSlice';

export const reducersList = {
  auth: authReducer,
  products: productsSlice,
  admin: adminSlice,
  enum: enumSlice,
  product: productSlice,
  filters: filtersSlice,
  location: locationSlice,
  partners: partnersSlice,
  preset: presetSlice,
  office: officeSlice,
  baseFilters: baseFiltersSlice,
  [filtersApi.reducerPath]: filtersApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [enumApi.reducerPath]: enumApi.reducer,
  [catalogApi.reducerPath]: catalogApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [searchApi.reducerPath]: searchApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
  [bannerApi.reducerPath]: bannerApi.reducer,
  [favoriteApi.reducerPath]: favoriteApi.reducer,
  [quizApi.reducerPath]: quizApi.reducer,
  [officeApi.reducerPath]: officeApi.reducer,
};
