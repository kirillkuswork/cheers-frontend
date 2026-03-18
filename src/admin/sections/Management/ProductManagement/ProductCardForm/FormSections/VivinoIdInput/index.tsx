import { IProductCardFormProps } from '@/admin/sections/Management/ProductManagement/ProductCardForm/types';
import React, { FC } from 'react';
import { useActions } from '@/shareds/hooks/useActions';
import { adminActions } from '@/redux/actions/adminActions';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { Controller } from 'react-hook-form';
import { MainInput } from '@/shareds/ui/MainInput';

export interface IVivinoIdInput extends Omit<IProductCardFormProps, 'errors'> {
  setLocalVivinoId?: (param: number) => void
}

export const VivinoIdInput:FC<IVivinoIdInput> = ({ control, setLocalVivinoId }) => {
  const { setVivinoId, setIsVivinoIdError } = useActions(adminActions);
  const { isVivinoIdError } = useSelector(selectors.adminSelector);

  return (
    <Controller
      name="vivino_id"
      control={control}
      rules={{
        required: false,
      }}
      render={({ field }) => (
        <MainInput
          {...field}
          showClearButton
          type="number"
          label="Vivino_id"
          error={isVivinoIdError}
          onChange={(e) => {
            const { value } = e.target;
            field.onChange(value);
            if (setLocalVivinoId) {
              setLocalVivinoId(Number(value));
            } else {
              setVivinoId(Number(value));
            }
            setIsVivinoIdError(false);
          }}
          errorMsg="Поле не должно оставаться пустым"
        />
      )}
    />
  );
};
