/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  FC, useState,
} from 'react';
import { useActions } from '@/shareds/hooks/useActions';
import { locationActions } from '@/redux/actions/locationActions';
import { Button, MobileModal } from '@/shareds/ui';
import { selectors } from '@/redux/selectors';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';

export const PopupHeaderLocationMobile: FC = () => {
  const [location, setLocation] = useState(false);
  const { setIsLocationPopupOpen } = useActions(locationActions);
  const { isLocationPopupOpen } = useSelector(selectors.locationSelector);

  const handleModalClose = () => setIsLocationPopupOpen(false);
  const handleAddLocation = () => setLocation(true);
  const handleChangeLocation = () => setLocation(false);

  return (
    <MobileModal
      isOpen={isLocationPopupOpen}
      onClose={handleModalClose}
    >
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <div className={styles.info_title}>
            {location ? 'Адрес' : 'Ваш регион'}
          </div>
          <div className={styles.info_location}>
            Москва
          </div>
        </div>
        {location ? (
          <Button
            label="Изменить"
            className={styles.button}
            variant="secondary"
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
              onClick={handleAddLocation}
            />
          </div>
        )}
      </div>
    </MobileModal>
  );
};
