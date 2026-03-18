import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFiltersResponse } from '../services/types/filters';

interface FilterState {
  filters: IFiltersResponse;
  expandedFilters: Record<string, boolean>; // Следим за состоянием разворота фильтров
  selectedFilters: IFiltersResponse; // Выбранные пользователем фильтры
  pagination: Record<string, { cursor: string; limit: number }>; // Пагинация для каждого фильтра
}

const initialState: FilterState = {
  filters: { boolean: [], number: [], string: [] },
  expandedFilters: {},
  selectedFilters: { boolean: [], number: [], string: [] },
  pagination: {},
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<IFiltersResponse>) {
      state.filters = action.payload;
    },
    setSelectedFilters(state, action: PayloadAction<IFiltersResponse>) {
      state.selectedFilters = action.payload;
    },
    toggleFilterExpansion(state, action: PayloadAction<string>) {
      state.expandedFilters[action.payload] = !state.expandedFilters[action.payload];
    },
    setPagination(state, action: PayloadAction<{ filterName: string; cursor: string; limit: number }>) {
      state.pagination[action.payload.filterName] = {
        cursor: action.payload.cursor,
        limit: action.payload.limit,
      };
    },
    resetFilters(state) {
      state.filters = initialState.filters;
      state.selectedFilters = initialState.selectedFilters;
      state.expandedFilters = {};
      state.pagination = {};
    },
  },
});

export const {
  setFilters, setSelectedFilters, toggleFilterExpansion, setPagination, resetFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
