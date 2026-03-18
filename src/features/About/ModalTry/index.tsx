/* eslint-disable no-irregular-whitespace */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from 'react';
import ModalWrapper from '@/shareds/ui/ModalWrapper';
import { CrossIcn } from '@/shareds/assets/icons';
import styles from './styles.module.scss';

interface IPropsModalTry {
  isOpen: boolean,
  onClose: () => void,
}
function ModalTry({ isOpen, onClose }: IPropsModalTry) {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const handleOk = () => {
    onClose();
  };
  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);
  return (
    <ModalWrapper isVisible={isVisible}>
      <div className={styles.modal_heading}>
        <div className={styles.modal_title}>
          Получите доступ к приложению в числе первых
        </div>
        <button
          type="button"
          className={styles.modal_close}
          onClick={handleOk}
        >
          <CrossIcn />
        </button>
      </div>
      <input className={styles.modal_input} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше имя" />
      <input className={styles.modal_input} type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Номер телефона" />
      <div className={styles.checkboxArea}>
        <input
          className={styles.checkbox}
          id="checkbox"
          name="checkbox"
          type="checkbox"
          required
        />
        <label className={styles.fakeCheckbox} htmlFor="checkbox">
          <div>
            Даю согласие на обработку
            <div>персональных данных</div>
          </div>
        </label>
      </div>
      <button
        type="button"
        className={styles.modal_btn}
        onClick={handleOk}
      >
        Оставить заявку
      </button>
    </ModalWrapper>
  );
}

export default ModalTry;
