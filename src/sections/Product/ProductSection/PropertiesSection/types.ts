import { IPropertiesCurrent } from '@/redux/services/types/products';

export interface INeededProps extends IPropertiesCurrent {
  name?: string | undefined;
  year?: number | null | undefined;
  temperature?: string | null | undefined;
  abv?: number | undefined | null | string,
}
