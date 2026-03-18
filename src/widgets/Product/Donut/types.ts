import { ITasteNote } from '@/redux/services/types/products';

export interface IDonutItemInfoProps {
  name: string;
  percent: number;
  color?: string;
}

export interface IDonutSectionProps {
  tasteNotes: ITasteNote[] | null | undefined;
  addProps: Record<string, unknown> | undefined;
}
