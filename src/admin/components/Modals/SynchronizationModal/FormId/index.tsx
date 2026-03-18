import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, ButtonStack } from '@/shareds';
import { Warning } from '@/shareds/ui/Warning';
import { IProductCardFormProps } from '@/admin/sections/Management/ProductManagement/ProductCardForm/types';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { VivinoIdInput } from '@/admin/sections/Management/ProductManagement/ProductCardForm/FormSections/VivinoIdInput';
import { IVivinoSyncRequest } from '@/redux/services/types/admin';
import styles from './styles.module.scss';

interface IFormIdProps extends Pick<IProductCardFormProps, 'values'> {
  onClose?: () => void;
  syncWithVivinoHandler: (params: IVivinoSyncRequest) => void;
  isFetching?: boolean;
  year?: number;
}

export const FormId: FC<IFormIdProps> = ({
  onClose,
  syncWithVivinoHandler,
  isFetching,
  year,
}) => {
  const { control } = useForm();
  const { vivinoId } = useSelector(selectors.adminSelector);
  const [localVivinoId, setLocalVivinoId] = useState<number | null>(null);

  return (
    <form className={styles.form}>
      <Warning status="error">
        {`Не удалось получить информацию о vivino_id ${vivinoId}. Проверьте id и попробуйте еще раз`}
      </Warning>
      <VivinoIdInput setLocalVivinoId={setLocalVivinoId} control={control} />

      <ButtonStack>
        <Button
          onClick={onClose}
          className={styles.button}
          label="Отмена"
          variant="tertiary"
          size="large"
        />
        <Button
          disabled={isFetching}
          isLoading={isFetching}
          onClick={() => syncWithVivinoHandler({ vivino_id: localVivinoId!, year })}
          className={styles.button}
          label="Синхронизировать"
          size="large"
        />
      </ButtonStack>
    </form>
  );
};
