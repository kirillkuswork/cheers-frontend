export interface ISeacrhItemDescProps {
  country?: string | null;
  color?: string | null,
  sweetness?: string | null,
  volume?: string | null,
}

export interface ISearchItemProps {
  id: string | number;
  image_url: string | null;
  name: string;
  rating_customer?: number | null;
  rating_expert?: number | null;
  properties: ISeacrhItemDescProps;
}
