/* eslint-disable no-empty-pattern */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { IEnumResponse, IEnumState } from '@/redux/services/types/enum';
import { enumApi } from '@/redux/services';

const initialState: IEnumState = {
  enumData: {} as IEnumResponse,
  isEnumLoading: false,
};

const enumSlice = createSlice({
  name: 'enum',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      enumApi.endpoints.getEnum.matchPending,
      (state) => {
        state.isEnumLoading = true;
      },
    );
    builder.addMatcher(
      enumApi.endpoints.getEnum.matchFulfilled,
      (state, { payload }) => {
        state.enumData = payload;
        state.isEnumLoading = false;
      },
    );
  },
});

export const {} = enumSlice.actions;

export default enumSlice.reducer;
