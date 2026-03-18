import { useRouter } from 'next/router';

export const useDynamicId = (): string | undefined => {
  const router = useRouter();
  const { id } = router.query;

  // Приводим id к типу string или возвращаем undefined
  return Array.isArray(id) ? id[0] : id;
};
