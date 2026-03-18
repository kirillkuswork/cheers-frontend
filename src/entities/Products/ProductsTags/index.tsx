/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { officeActions } from '@/redux/actions/officeActions';
import { useActions } from '@/shareds/hooks/useActions';
import { Close } from '@/shareds/assets/icons';
import useBreakpoint from '@/shareds/hooks/useBreakpoint';
import styles from './styles.module.scss';

export const ProductsTags = () => {
  const { activeOffice, officeData } = useSelector(selectors.officeSelector);
  const { setActiveOffice } = useActions(officeActions);
  const breakpoint = useBreakpoint();

  const isMobile = breakpoint === 'xs';
  const isSmallTablet = breakpoint === 'sm';
  const isDevice = isMobile || isSmallTablet;

  const handleDelete = () => setActiveOffice(null);
  const foundItem = officeData.filter((item) => item.id === activeOffice)[0];

  if (!foundItem || isDevice) return null;

  return (
    <div className={styles.tag}>
      <div className={styles.text}>
        {`${foundItem.partner.name}, ${foundItem.address}`}
      </div>
      <div
        className={styles.delete}
        onClick={handleDelete}
      >
        <Close />
      </div>
    </div>
  );
};
