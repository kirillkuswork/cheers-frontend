/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button } from '@/shareds/ui';
import { SectionTitle } from '@/entities/Product';
import { PartnersList } from '@/features/Partners';
import { useEffect, useState } from 'react';
import { ModalPartners } from '@/modals';
import { selectors } from '@/redux/selectors';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';

export const PartnersSection = () => {
  const [isOpenModal, setIsOpen] = useState(false);
  const router = useRouter();
  const { activeProduct } = useSelector(selectors.productSelector);

  // Нужно чтобы после загрузки данных скроллило к блоку с партнерами
  useEffect(() => {
    if (activeProduct.offer && router.asPath.includes('#partners')) {
      router.push('#partners');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProduct]);

  if (!activeProduct.offer) return null;

  return (
    <div id="partners" className={styles.wrapper}>
      <div className={styles.heading}>
        <SectionTitle className={styles.title}>
          Наличие у партнёров
        </SectionTitle>
        <Button
          label="Стать партнером"
          variant="secondary"
          size="large"
          className={styles.button}
          onClick={() => setIsOpen(true)}
        />
        <div className={styles.modal} onClick={(e) => e.preventDefault()}>
          <ModalPartners isOpen={isOpenModal} onClose={() => setIsOpen(false)} />
        </div>
      </div>

      <PartnersList />
    </div>
  );
};

export default PartnersSection;
