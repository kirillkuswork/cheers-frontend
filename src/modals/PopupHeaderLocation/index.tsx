/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  FC, useState,
} from 'react';
import { useActions } from '@/shareds/hooks/useActions';
import { locationActions } from '@/redux/actions/locationActions';
import { Button, IconButton } from '@/shareds/ui';
import { CrossIcn } from '@/shareds/assets/icons';
import useBreakpoint from '@/shareds/hooks/useBreakpoint';
import styles from './styles.module.scss';
import { PopupHeaderLocationMobile } from './PopupHeaderLocationMobile';

export const PopupHeaderLocation: FC = () => {
  const [location, setLocation] = useState(false);
  const { setIsLocationPopupOpen } = useActions(locationActions);
  const breakpoint = useBreakpoint();

  const isMobile = breakpoint === 'xs';
  const isSmallTablet = breakpoint === 'sm';
  const isDevice = isMobile || isSmallTablet;

  const handleModalClose = () => setIsLocationPopupOpen(false);
  const handleAddLocation = () => setLocation(true);
  const handleChangeLocation = () => setLocation(false);

  if (isDevice) {
    return <PopupHeaderLocationMobile />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div className={styles.info__inner}>
          <div className={styles.info__inner_title}>
            {location ? 'Адрес' : 'Ваш регион'}
          </div>
          <div className={styles.info__inner_location}>
            Москва
          </div>
        </div>
        <IconButton
          icon={<CrossIcn />}
          onClick={handleModalClose}
          size="small"
        />
      </div>
      {location ? (
        <Button
          label="Изменить"
          className={styles.button}
          variant="secondary"
          size="large"
          onClick={handleChangeLocation}
        />
      ) : (
        <div className={styles.action}>
          <div className={styles.action__text}>
            Укажите ваш адрес — покажем актуальный ассортимент и расстояние до ближайшего магазина
          </div>
          <Button
            label="Указать адрес"
            className={styles.button}
            variant="secondary"
            size="large"
            onClick={handleAddLocation}
          />
        </div>
      )}
    </div>
  );
};
