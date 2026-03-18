/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPresetState, ISortRequest } from '@/redux/services/types/products';

const initialState: IPresetState = {
  sort: { field: 'rating_customer', order_direction: 'DESC' },
};

const presetSlice = createSlice({
  name: 'preset',
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<ISortRequest>) => {
      state.sort = action.payload;
    },
  },
});

export const { setSort } = presetSlice.actions;

export default presetSlice.reducer;
