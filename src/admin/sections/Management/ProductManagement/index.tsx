import { Container } from '@/admin/components/Container';
import { Paper } from '@/admin/components/Paper';
import { TabsMenu } from '@/admin/sections/Management/ProductManagement/TabsMenu';
import { useState } from 'react';
import { PartnerOffers } from '@/admin/sections/Management/ProductManagement/PartnerOffers';
import { ProductCardForm } from '@/admin/sections/Management/ProductManagement/ProductCardForm';
import { AddPartnerOfferModal } from '@/admin/components/Modals/AddPartnerOfferModal';
import { useActions } from '@/shareds/hooks/useActions';
import { adminActions } from '@/redux/actions/adminActions';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { AddNewProductFormProvider } from '@/providers/AddNewProductFormProvider';
import styles from './styles.module.scss';

export const ProductManagement = () => {
  const [value, setValue] = useState<number | null>(1);
  const { setAddPartnerOfferModalOpen } = useActions(adminActions);
  const { isAddPartnerOfferModalOpen } = useSelector(selectors.adminSelector);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  const content = value === 1 ? <ProductCardForm /> : <PartnerOffers />;

  return (
    <AddNewProductFormProvider>
      <Container className={styles.container}>
        <Paper className={styles.wrapper}>
          <TabsMenu value={value} onTabChange={handleChange} />
          {content}
        </Paper>

        {isAddPartnerOfferModalOpen && (
          <AddPartnerOfferModal
            isOpen={isAddPartnerOfferModalOpen}
            onClose={() => setAddPartnerOfferModalOpen(false)}
          />
        )}
      </Container>
    </AddNewProductFormProvider>
  );
};
