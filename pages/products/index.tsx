import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATHS } from '@/shareds/consts/baseConts';

function GoodsDetails() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname.startsWith('/products')) {
      router.replace(`${PATHS.products}`);
    }
  }, [router]);
}

export default GoodsDetails;
