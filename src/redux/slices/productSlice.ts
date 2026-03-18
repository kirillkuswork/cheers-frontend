/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProductCurrent } from '../services/types/products';

interface IProductState {
  activeProduct: IProductCurrent;
}

const initialState: IProductState = {
  activeProduct: {} as IProductCurrent,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setActiveProduct: (state, action: PayloadAction<IProductCurrent>) => {
      state.activeProduct = { ...action.payload };
    },
  },
});

export const {
  setActiveProduct,
} = productSlice.actions;

export default productSlice.reducer;
