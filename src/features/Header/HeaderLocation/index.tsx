/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  FC,
  useRef,
} from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useActions } from '@/shareds/hooks/useActions';
import { locationActions } from '@/redux/actions/locationActions';
import { ArrowDown } from '@/shareds/assets/icons';
import clsx from 'clsx';
import { PopupHeaderLocation } from '@/modals';
import { useOutsideClick } from '@/shareds/hooks/useOutsideClick';
import useBreakpoint from '@/shareds/hooks/useBreakpoint';
import styles from './styles.module.scss';

export const HeaderLocation: FC = () => {
  const { isLocationPopupOpen } = useSelector(selectors.locationSelector);
  const { setIsLocationPopupOpen } = useActions(locationActions);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const breakpoint = useBreakpoint();

  const isMobile = breakpoint === 'xs';
  const isSmallTablet = breakpoint === 'sm';
  const isDevice = isMobile || isSmallTablet;
  // Todo Потом вернуть
  const handleModalToggle = () => setIsLocationPopupOpen(isLocationPopupOpen);
  const handleOutsideClick = () => {
    if (isDevice) return;
    setIsLocationPopupOpen(false);
  };

  useOutsideClick(wrapperRef, handleOutsideClick, isLocationPopupOpen);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div
        className={styles.heading}
        onClick={handleModalToggle}
      >
        <span className={styles.heading_text}>
          Москва
        </span>
        <span className={clsx({
          [styles.heading_icon]: true,
          [styles.heading_iconUp]: isLocationPopupOpen,
        })}
        >
          <ArrowDown />
        </span>
      </div>

      {isLocationPopupOpen && <PopupHeaderLocation />}
    </div>
  );
};
