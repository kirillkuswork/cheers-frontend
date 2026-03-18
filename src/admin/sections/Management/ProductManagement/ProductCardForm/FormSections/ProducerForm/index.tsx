/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useCallback } from 'react';
import { Controller } from 'react-hook-form';
import { IProductCardFormProps } from '@/admin/sections/Management/ProductManagement/ProductCardForm/types';
import { FormSectionWrapper } from '@/admin/components/FormSectionWrapper';
import { UploadImage } from '@/admin/components/UploadImage';
import { useAddNewProductFormContext } from '@/providers/AddNewProductFormProvider';
import { IUploadedFile } from '@/admin/components/UploadImage/types';
import { MainTextArea } from '@/shareds';
import { useLazyDeleteProducerImageQuery, useLazySetProducerImageQuery } from '@/redux/services/adminApi';
import { QueryActionCreatorResult } from '@reduxjs/toolkit/query';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { QueryDefinition } from '@reduxjs/toolkit/src/query/endpointDefinitions';
import { SearchInput } from '@/admin/components/SearchInput';
import { ISelectOption } from '@/admin/components/SearchInput/types';
import { useProducerList } from '@/shareds/hooks/useProducerList';
import styles from './styles.module.scss';

interface IProducerForm {
  producer_id?: number;
  imageUrl?: string;
}

export const ProducerForm: FC<IProductCardFormProps & IProducerForm> = ({
  control,
  errors,
  producer_id,
  setValue,
  editMode,
  imageUrl,
  product_id,
  baseCard,
}) => {
  const { removeProducerImage } = useAddNewProductFormContext();
  const [setProducerImage] = useLazySetProducerImageQuery();
  const [deleteProducerImage] = useLazyDeleteProducerImageQuery();

  const {
    producerList,
    isFetching,
    handleSearch,
    loadMoreProducers,
  } = useProducerList({
    query: null,
    pagination: { cursor: null, limit: 100 },
  });

  const handleFileUpload = useCallback(
    ({ image }: IUploadedFile): QueryActionCreatorResult<QueryDefinition> => {
      const formData = new FormData();
      formData.append('image', image!);
      return setProducerImage({ producer_id: producer_id!, image: formData });
    },
    [producer_id, setProducerImage],
  );

  const handleFileRemove = useCallback((): QueryActionCreatorResult<QueryDefinition> => {
    removeProducerImage();
    setValue?.('image_url', '');

    return deleteProducerImage(producer_id!);
  }, [deleteProducerImage, producer_id, removeProducerImage, setValue]);

  return (
    <FormSectionWrapper
      title="Производитель"
      childrenClassName={styles.wrapper}
    >
      <UploadImage
        isProducer
        product_id={product_id}
        url={imageUrl}
        onFileUpload={handleFileUpload}
        handleFileRemove={handleFileRemove}
        className={styles.dropzone}
        title="Выберите фото, перетащите изображение (Поддерживаемые форматы PNG, JPEG, JPG, макс. 10 мб )"
      />

      {/* {!uploadedProducerImage && <span className={styles.between}>Или</span>} */}
      <div className={styles.column}>
        {/* {!uploadedProducerImage && ( */}
        {/*   <Controller */}
        {/*     name="image_url" */}
        {/*     control={control} */}
        {/*     rules={{ */}
        {/*       required: false, */}
        {/*     }} */}
        {/*     render={({ field }) => ( */}
        {/*       <MainInput {...field} showClearButton label="Вставьте URL" /> */}
        {/*     )} */}
        {/*   /> */}
        {/* )} */}
        <Controller
          name="name"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <SearchInput
              disabled={editMode || baseCard}
              {...field}
              isFetching={isFetching}
              onSearch={handleSearch}
              fetchMoreData={loadMoreProducers}
              onChange={(item) => {
                field.onChange(item?.value);
                if (item?.id !== null) {
                  setValue?.('producerId', item?.id);
                } else {
                  setValue?.('producerId', null);
                }
              }}
              options={producerList?.producers as ISelectOption[]}
              cursor={producerList?.pagination?.cursor}
              value={field?.value}
              label="Наименование производителя"
              error={!!errors.name}
              errorMsg="Обязательно к заполнению"
            />
          )}
        />
        <Controller
          name="producerId"
          control={control}
          render={({ field }) => (
            <input type="hidden" {...field} />
          )}
        />
        <Controller
          name="description"
          control={control}
          rules={{
            required: false,
          }}
          render={({ field }) => (
            <MainTextArea {...field} showClearButton label="Описание" />
          )}
        />
      </div>
    </FormSectionWrapper>
  );
};
