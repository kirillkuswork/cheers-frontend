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
import clsx from 'clsx';
import styles from './styles.module.scss';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const russianPhonePattern = /^(\+7|8|7)\d{10}$/;

function OutroForm({ onSubmit }: { onSubmit?: () => void }) {
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
    onSubmit?.();
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
    <form
      onSubmit={handleSubmit}
      // className={styles.form}
    >
      {contextHolder}
      <div>
        <input
          className={styles.form_input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ваше имя"
        />
      </div>
      <div className={styles.form_container}>
        <input
          className={styles.form_input}
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Название компании"
        />
      </div>
      <div className={styles.form_container}>
        <input
          className={styles.form_input}
          type="text"
          value={phone}
          onChange={(e) => handleChangePhone(e.target.value)}
          placeholder="Номер телефона"
        />
        {!isValidPhone && <div className={styles.invaludLabel}>Не верный формат телефона</div>}
      </div>
      <div className={styles.form_container}>
        <input
          className={styles.form_input}
          type=""
          value={email}
          onChange={(e) => handleChangeEmail(e.target.value)}
          placeholder="Email"
        />
        {
          !isValidEmail && (
            <div className={styles.invaludLabel}>Не верный формат электронной почты</div>
          )
            }
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
      <button
        type="submit"
        className={clsx(styles.form_btn, (getIsDisabledForm || isLoad === 'isload') && styles.disabled)}
      >
        {isLoad === 'isload' ? 'Отправка' : 'Оставить заявку'}
      </button>
    </form>
  );
}

export default OutroForm;
