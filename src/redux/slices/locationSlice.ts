/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface ILocationState {
  isLocationPopupOpen: boolean;
}

const initialState: ILocationState = {
  isLocationPopupOpen: false,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setIsLocationPopupOpen: (state, action) => {
      state.isLocationPopupOpen = action.payload;
    },
  },
});

export const {
  setIsLocationPopupOpen,
} = locationSlice.actions;

export default locationSlice.reducer;
