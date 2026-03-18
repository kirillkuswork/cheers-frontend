/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FiltersState } from '@/redux/services/types/filters';
import { IFilters } from '@/redux/services/types/quiz';

const initialState: FiltersState = {
  quizFilters: {} as IFilters,
  isQuizFiltersUpdated: false,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setQuizFilters: (state, action: PayloadAction<IFilters | null>) => {
      state.quizFilters = action.payload;
    },
    setQuizFiltersUpdated: (state, action: PayloadAction<boolean>) => {
      state.isQuizFiltersUpdated = action.payload;
    },
  },
});

export const { setQuizFilters, setQuizFiltersUpdated } = filtersSlice.actions;

export default filtersSlice.reducer;
