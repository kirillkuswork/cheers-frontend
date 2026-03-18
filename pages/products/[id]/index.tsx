import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATHS } from '@/shareds/consts/baseConts';

function GoodsDetailsId() {
  const router = useRouter();
  useEffect(() => {
    if (router.pathname.startsWith('/products') && router?.query?.id) {
      router.replace(`${PATHS.products}/${router?.query?.id}`);
    }
  }, [router, router?.query, router?.query?.id]);
}

export default GoodsDetailsId;
