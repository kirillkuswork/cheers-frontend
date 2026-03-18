import { RefObject } from 'react';

export const linkContentPrefix = 'linkContentPrefix';
export type RefDiv = RefObject<HTMLDivElement>;

export const getScrollingProps = (index: number, refs: RefDiv[]) => ({
  id: `${linkContentPrefix}${index}`,
  ref: refs[index],
});
