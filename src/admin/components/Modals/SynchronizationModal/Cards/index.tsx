import React, { FC } from 'react';
import { Button, ButtonStack } from '@/shareds';
import { CheersIcon, ViVinoIcon } from '@/admin/assets/icons';
import { Warning } from '@/shareds/ui/Warning';
import { IProductCardFormProps } from '@/admin/sections/Management/ProductManagement/ProductCardForm/types';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import styles from './styles.module.scss';

export interface ICardsProps extends Pick<IProductCardFormProps, 'values'> {
  onClose?: () => void;
  nextStepHandler?: () => void;
}

export const Cards: FC<ICardsProps> = ({
  onClose,
  nextStepHandler,
  values,
}) => {
  const { vivinoData } = useSelector(selectors.adminSelector);

  const {
    prefix, name, suffix, productName, year,
  } = values!;

  const cheersName = [
    prefix,
    name,
    productName,
    year,
    suffix,
  ].filter(Boolean).join(', ');

  const isSameName = vivinoData?.producer?.name?.trim().toLowerCase()
      === cheersName.trim().toLowerCase();

  return (
    <div className={styles.wrapper}>
      {!isSameName && (
      <Warning status="warning">
        Внимание!  Не совпадают наименования Cheers и Vivino
      </Warning>
      )}
      <div className={styles.cards}>
        <div className={styles.item}>
          <span className={styles.label}>Наименование в Cheers</span>
          <div className={styles.card}>
            <div className={styles.logo}>
              <CheersIcon />
            </div>
            <span className={styles.title}>
              {cheersName}
            </span>
          </div>
        </div>

        <div className={styles.item}>
          <span className={styles.label}>Наименование в Vivino</span>
          <div className={styles.card}>
            <div className={styles.logo}>
              <ViVinoIcon />
            </div>
            <span className={styles.title}>{vivinoData?.producer?.name}</span>
          </div>
        </div>
      </div>

      <ButtonStack>
        <Button
          onClick={onClose}
          className={styles.button}
          label="Отмена"
          variant="tertiary"
          size="large"
        />
        <Button
          onClick={nextStepHandler}
          className={styles.button}
          label="Далее"
          size="large"
          variant="secondary"
        />
      </ButtonStack>
    </div>
  );
};
