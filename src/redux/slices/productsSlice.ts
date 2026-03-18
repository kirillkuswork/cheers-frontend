/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProductsState, ISortRequest } from '@/redux/services/types/products';
import { IQuizHeaderInfo } from '@/redux/services/types/quiz';

const initialState: IProductsState = {
  sort: { field: 'rating_customer', order_direction: 'DESC' },
  quizHeaderInfo: {} as IQuizHeaderInfo,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<ISortRequest>) => {
      state.sort = action.payload;
    },
    setQuizHeaderInfo: (state, action: PayloadAction<IQuizHeaderInfo | null>) => {
      state.quizHeaderInfo = action.payload;
    },
  },
});

export const { setSort, setQuizHeaderInfo } = productsSlice.actions;

export default productsSlice.reducer;
