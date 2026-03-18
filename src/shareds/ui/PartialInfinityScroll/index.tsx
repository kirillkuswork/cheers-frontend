import { ReactNode } from 'react';

interface IPartialInfinityScrollProps {
  isLoading: boolean;
  skeleton: ReactNode;
  itemsLength: number;
  limit: number;
  children: ReactNode;
}

export const PartialInfinityScroll = ({
  isLoading,
  skeleton,
  itemsLength,
  limit,
  children,
}: IPartialInfinityScrollProps) => {
  if (itemsLength < limit) {
    if (isLoading) return skeleton;
    return children;
  }

  if (itemsLength >= limit) {
    if (isLoading) {
      return (
        <>
          {children}
          {skeleton}
        </>
      );
    }
    return children;
  }

  return children;
};
