export type RangeValueType = [number, number];

export interface IRangeSliderProps {
  minValue: number;
  maxValue: number;
  valueArr: RangeValueType;
  onChange: (value: RangeValueType) => void;
  currency?: string | null;
}
