/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { IOfficeItem } from '../services/types/office';
import { officeApi } from '../services';

interface IOfficeState {
  officeData: IOfficeItem[];
  activeOffice: number | null;
}

const initialState: IOfficeState = {
  officeData: [],
  activeOffice: null,
};

const officeSlice = createSlice({
  name: 'office',
  initialState,
  reducers: {
    setActiveOffice: (state, action) => {
      state.activeOffice = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      officeApi.endpoints.getOffices.matchFulfilled,
      (state, { payload }) => {
        state.officeData = [...state.officeData, ...payload.offices];
      },
    );
  },
});

export const {
  setActiveOffice,
} = officeSlice.actions;

export default officeSlice.reducer;
