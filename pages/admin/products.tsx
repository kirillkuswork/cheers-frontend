import { PageWrapper } from '@/admin/wrapper';
import { AdminLayout } from '@/admin/layouts/AdminLayout';
import { ProductControlPanel } from '@/admin/sections/Management/ProductControlPanel';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/shareds/providers/AuthProvider';
import { PATHS } from '@/shareds/consts/baseConts';

const ManagementPage = () => {
  const router = useRouter();
  const {
    isAuthenticated, isFetching, isInitial, user,
  } = useAuth();
  useEffect(() => {
    if (!isInitial && !isFetching && (!isAuthenticated || user?.role_id !== 3)) {
      router.replace(PATHS.products);
    }
  }, [router, user, isAuthenticated, isFetching, isInitial]);
  return (
    <AdminLayout>
      <PageWrapper title="Управление товарами">
        <ProductControlPanel />
      </PageWrapper>
    </AdminLayout>
  );
};

export default ManagementPage;
