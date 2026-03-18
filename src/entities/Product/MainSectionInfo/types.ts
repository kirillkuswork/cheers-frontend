import { IPropertiesCurrent, IVintage, IVolume } from '@/redux/services/types/products';

export interface IOption {
  label: number | null | undefined,
  value: number | null | undefined,
  ratingCustomer: number | null | undefined,
  ratingExpert: number | null | undefined,
  selected: boolean,
  volumes: IVolume[],
}

export interface IMainSectionInfoProps {
  shortDescription: string[] | undefined,
  vintages: IVintage[] | undefined,
  productId: number | undefined;
  className?: string;
  properties: IPropertiesCurrent | undefined;
}
