import { StaticImageData } from 'next/image';

export interface IProductCardProps {
  id: number
  expertRate: string;
  starRate: string;
  img: string | StaticImageData;
  title: string;
  description: string;
  oldPrice: string;
  percent: string;
  currentPrice: string;
  stores: string;
}
