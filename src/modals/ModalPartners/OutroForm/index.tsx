/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import debounce from '@/helpres/debounce';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useFormspark } from '@formspark/use-formspark';
import Link from 'next/link';
import { message } from 'antd/lib';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { MainInput } from '@/shareds/ui/MainInput';
import { Button, IconButton } from '@/shareds/ui';
import { CrossIcn } from '@/shareds/assets/icons';
import { useActions } from '@/shareds/hooks/useActions';
import { partnersActions } from '@/redux/actions/partnersActions';
import styles from './styles.module.scss';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const russianPhonePattern = /^(\+7|8|7)\d{10}$/;

function OutroForm({ onClose }: { onClose?: () => void }) {
  // submitting
  const [messageApi, contextHolder] = message.useMessage();
  const [submit, submitting] = useFormspark({
    formId: 'IHmRKQtyI',
  });
  const [isLoad, setIsLoad] = useState<'isload' | 'init' | 'complete'>('init');
  const [isPD, setIsPD] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isValidPhone, setIsValidPhone] = useState<boolean>(true);
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);

  const { setIsPartnersSubmitModalOpen } = useActions(partnersActions);

  const clear = () => {
    setIsPD(false);
    setName('');
    setCompanyName('');
    setPhone('');
    setEmail('');
    setIsValidPhone(true);
    setIsValidEmail(true);
  };
  const handleUpdateValidPhone = useCallback(debounce((phoneNumber: string) => {
    setIsValidPhone(russianPhonePattern.test(phoneNumber));
  }, 350), []);
  const handleUpdateValidEmail = useCallback(debounce((newEmail: string) => {
    setIsValidEmail(emailPattern.test(newEmail));
  }, 350), []);
  const handleChangePhone = (newPhone: string) => {
    setIsValidPhone(true);
    let value = newPhone.replace(/[^\d]/g, '');
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    handleUpdateValidPhone(value);
    setPhone(value);
  };
  const handleChangeEmail = (newEmail: string) => {
    setIsValidEmail(true);
    const value = newEmail.replace(/[\sА-Яа-яЁё]/g, '');
    handleUpdateValidEmail(value);
    setEmail(value);
  };
  const getIsDisabledForm = useMemo(() => {
    if (
      !name || !companyName || !phone || !email || !isValidPhone || !isValidEmail || !isPD
    ) return true;
    return false;
  }, [name, companyName, phone, email, isPD, isValidPhone, isValidEmail]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    if (getIsDisabledForm) return;
    e.preventDefault();
    setIsLoad('isload');
    await submit({
      name, companyName, phone, email,
    });
    setIsPartnersSubmitModalOpen(true);
    onClose?.();
  };
  const handleChangePD = () => {
    setIsPD((prev) => !prev);
  };
  useEffect(() => {
    if (!submitting && isLoad !== 'complete' && isLoad !== 'init') {
      setIsLoad('complete');
      clear();
    }
  }, [submitting, isLoad]);
  useEffect(() => {
    if (isLoad === 'complete') messageApi.success('Данные успешно отправленны');
  }, [isLoad]);
  return (
    <div className={styles.wrapper}>
      <IconButton
        icon={<CrossIcn />}
        className={styles.closeBtn}
        onClick={onClose}
      />
      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        {contextHolder}
        <div className={styles.title}>Заполните форму заявки</div>
        <div className={styles.fields}>
          <div>
            <MainInput
              label="Ваше имя"
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.form_container}>
            <MainInput
              label="Название компании"
              placeholder=" "
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className={styles.form_container}>
            <MainInput
              label="Номер телефона"
              value={phone}
              onChange={(e) => handleChangePhone(e.target.value)}
              placeholder=" "
              error={!isValidPhone}
              errorMsg="Неверный формат телефона"
            />
          </div>
          <div className={styles.form_container}>
            <MainInput
              label="Email"
              placeholder=" "
              value={email}
              onChange={(e) => handleChangeEmail(e.target.value)}
              error={!isValidEmail}
              errorMsg="Неверный формат электронной почты"
            />
          </div>
        </div>
        <div
          onClick={handleChangePD}
          className={styles.checkboxArea}
        >
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={isPD}
          />
          <label
            className={styles.fakeCheckbox}
          >
            <Link className={styles.link} target="_blank" href="view/user_agreement_on_handle_pd">
              Даю согласие на обработку
              персональных данных
            </Link>
          </label>
        </div>
        <div className={styles.buttons}>
          <Button
            type="submit"
            label={isLoad === 'isload' ? 'Отправка' : 'Оставить заявку'}
            disabled={getIsDisabledForm || isLoad === 'isload'}
            size="large"
          />
          <Button
            label="Отмена"
            size="large"
            variant="tertiary"
            onClick={onClose}
          />
        </div>
      </form>
    </div>
  );
}

export default OutroForm;
