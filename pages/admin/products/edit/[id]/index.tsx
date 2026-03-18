import { PageWrapper } from '@/admin/wrapper';
import { AdminLayout } from '@/admin/layouts/AdminLayout';
import { ProductManagement } from '@/admin/sections/Management/ProductManagement';

const NewProductManagementPage = () => (
  <AdminLayout>
    <PageWrapper title="Управление товарами">
      <ProductManagement />
    </PageWrapper>
  </AdminLayout>
);

export default NewProductManagementPage;
