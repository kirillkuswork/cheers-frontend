import { enumSelector } from '@/redux/selectors/enumSelectors';
import { adminSelector } from '@/redux/selectors/adminSelectors';
import { productsSelectors } from '@/redux/selectors/productsSelectors';
import { authSelectors } from '@/redux/selectors/authSelectors';
import { productSelector } from '@/redux/selectors/productSelector';
import { filtersSelector } from '@/redux/selectors/filtersSelector';
import { locationSelector } from '@/redux/selectors/locationSelectors';
import { partnersSelector } from '@/redux/selectors/partnersSelectors';
import { presetSelector } from '@/redux/selectors/presetSelectors';
import { officeSelector } from '@/redux/selectors/officeSelectors';
import { baseFiltersSelectors } from './baseFiltersSelectors';

export const selectors = {
  enumSelector,
  productsSelectors,
  authSelectors,
  adminSelector,
  productSelector,
  filtersSelector,
  locationSelector,
  partnersSelector,
  presetSelector,
  officeSelector,
  baseFiltersSelectors,
};
