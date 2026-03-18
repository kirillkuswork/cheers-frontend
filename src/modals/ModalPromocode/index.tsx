/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-irregular-whitespace */
import { IPromocodeButtonProps } from '@/temporal/PromocodeButton/types';
import { Button } from '@/shareds/ui';
import Link from 'next/link';
import { Check, Copy } from '@/shareds/assets/icons';
import { useEffect, useState } from 'react';
import { ModalAdaptiveWrapper } from '@/temporal/ModalAdaptiveWrapper';
import styles from './styles.module.scss';

interface IModalPromocodeProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalPromocode = ({
  isOpen,
  onClose,
  imgUrl,
  promocode,
  description,
  discount,
  partnerLink,
}: IModalPromocodeProps & IPromocodeButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipBoard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
  };

  useEffect(() => {
    setIsCopied(false);
  }, [isOpen]);

  return (
    <ModalAdaptiveWrapper
      isOpen={isOpen}
      className={styles.wrapper}
      onClose={onClose}
    >
      <div className={styles.inner}>
        <div className={styles.top}>
          {Boolean(discount) && (
            <div className={styles.title}>
              {`Скидка ${discount}% по промокоду`}
            </div>
          )}
          <div className={styles.imgWrapper}>
            <img
              src={imgUrl}
              alt="Promocode"
              className={styles.img}
            />
          </div>
        </div>
        <div className={styles.mid}>
          {Boolean(description) && (
            <div className={styles.description}>
              {description}
            </div>
          )}
          <div className={styles.input}>
            <div className={styles.promo}>
              {promocode}
            </div>
            {isCopied ? (
              <div className={styles.iconCheck}>
                <Check />
              </div>
            ) : (
              <div
                className={styles.icon}
                onClick={() => handleCopyToClipBoard(promocode)}
              >
                <Copy />
              </div>
            )}
          </div>
        </div>
        <div className={styles.buttons}>
          <Link
            href={partnerLink}
            target="_blank"
            className={styles.link}
          >
            <Button
              label="На сайт магазина"
              className={styles.button}
              size="large"
            />
          </Link>
          <Button
            label="Построить маршрут"
            variant="tertiary"
            className={styles.button}
            size="large"
            disabled
          />
        </div>
      </div>
    </ModalAdaptiveWrapper>
  );
};
