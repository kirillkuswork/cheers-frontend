import React, { FC, useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { IProductCardFormProps } from '@/admin/sections/Management/ProductManagement/ProductCardForm/types';
import { FormSectionWrapper } from '@/admin/components/FormSectionWrapper';
import { Filter } from '@/entities/Products';
import styles from './styles.module.scss';

export const VisibilityForm: FC<IProductCardFormProps> = ({
  control,
  values,
}) => {
  const [checked, setChecked] = useState<boolean>(!values?.is_hidden);

  useEffect(() => {
    setChecked(!values?.is_hidden);
  }, [values?.is_hidden]);

  return (
    <FormSectionWrapper childrenClassName={styles.wrapper}>
      <Controller
        control={control}
        name="is_hidden"
        rules={{
          required: false,
        }}
        render={({
          field: { onChange },
        }) => (
          <Filter.ToggleItem
            className={styles.toggle}
            key="key"
            title="Видимость товара в каталоге"
            isChecked={checked}
            onChange={() => {
              const newChecked = !checked;
              setChecked(newChecked);
              onChange(!newChecked);
            }}
          />
        )}
      />
    </FormSectionWrapper>
  );
};
