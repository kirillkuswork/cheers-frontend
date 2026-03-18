import { AppStateType } from '@/redux/store/store';

export const filtersSelector = (state: AppStateType) => state.filters;
