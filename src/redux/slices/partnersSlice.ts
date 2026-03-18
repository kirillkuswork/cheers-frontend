/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface IPartnersState {
  isPartnersSubmitModalOpen: boolean;
}

const initialState: IPartnersState = {
  isPartnersSubmitModalOpen: false,
};

const partnersSlice = createSlice({
  name: 'partners',
  initialState,
  reducers: {
    setIsPartnersSubmitModalOpen: (state, action) => {
      state.isPartnersSubmitModalOpen = action.payload;
    },
  },
});

export const {
  setIsPartnersSubmitModalOpen,
} = partnersSlice.actions;

export default partnersSlice.reducer;
