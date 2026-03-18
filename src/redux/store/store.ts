/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-cycle */
import { configureStore, PayloadAction } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { reducersList } from '@/redux/store/reducers';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import {
  catalogApi,
  enumApi,
  filtersApi,
  productsApi,
  authApi,
  userApi,
  searchApi,
  adminApi,
  bannerApi,
  quizApi,
  favoriteApi,
  officeApi,
} from '../services';

const rootReducer = combineReducers(reducersList);

export type AppStateType = ReturnType<typeof rootReducer>;

const reducer = (
  state: AppStateType | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: PayloadAction<any>,
): AppStateType => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return rootReducer(state, action);
};

const initStore = () => {
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
      filtersApi.middleware,
      productsApi.middleware,
      enumApi.middleware,
      catalogApi.middleware,
      authApi?.middleware,
      userApi.middleware,
      searchApi?.middleware,
      adminApi?.middleware,
      bannerApi?.middleware,
      quizApi?.middleware,
      favoriteApi?.middleware,
      officeApi?.middleware,
    ),
  });

  setupListeners(store.dispatch);

  return store;
};

export type AppDispatchType = ReturnType<typeof initStore>['dispatch'];

export const store = initStore();

export const wrapper = createWrapper(initStore);
