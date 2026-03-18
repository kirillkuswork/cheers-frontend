/* eslint-disable no-irregular-whitespace */
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ModalWrapper from '@/shareds/ui/ModalWrapper';
import styles from './styles.module.scss';
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/quotes
const TEXT_ONE = `Информация, представленная на сайте, предназначена для пользователей, достигших совершеннолетия. Пожалуйста, подтвердите свой возраст, чтобы начать пользоваться сайтом`;
const TEXT_SECOND = (
  <span>
    Обращаем ваше внимание на то, что для полноценной работы сайт использует
    <Link
      href="/view/security_policy"
      className={styles.modal_additional}
      style={{ marginLeft: '4px' }}
      target="_blank"
      aria-label="Политика безопасности"
    >
      файлы cookie
    </Link>
    . Начиная работу с сайтом, вы соглашаетесь с их использованием.;
  </span>
);
function ModalAcceptAge() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const checkHasAccept = (): string | null => {
    if (localStorage) return localStorage.getItem('hasAcceptAge');
    return null;
  };
  useEffect(() => {
    if (!checkHasAccept()) setIsModalOpen(true);
  }, []);
  const handleOk = () => {
    setIsModalOpen(false);
    localStorage.setItem('hasAcceptAge', 'accept');
  };
  return (
    <ModalWrapper isVisible={isModalOpen} className={styles.wrapper}>
      <div className={styles.modal_title}>Добро пожаловать в Cheers!</div>
      <div className={styles.modal_info}>{TEXT_ONE}</div>
      <div className={styles.modal_additional}>{TEXT_SECOND}</div>
      <div className={styles.modal_footer}>
        <button
          type="button"
          className={styles.modal_btn}
          onClick={handleOk}
        >
          Мне исполнилось 18
        </button>
      </div>
    </ModalWrapper>
  );
}

export default ModalAcceptAge;
