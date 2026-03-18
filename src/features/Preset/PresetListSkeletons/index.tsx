import { Skeletons } from '@/shareds';

export const PresetListSkeletons = () => {
  const skeletons = Array.from({ length: 24 }, (_, index) => (
    <Skeletons.ProductCardSkeleton key={index} />
  ));

  return { skeletons };
};
