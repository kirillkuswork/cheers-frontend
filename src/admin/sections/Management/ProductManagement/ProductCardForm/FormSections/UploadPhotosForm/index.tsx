/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import { IImageForm, IProductCardFormProps } from '@/admin/sections/Management/ProductManagement/ProductCardForm/types';
import { FormSectionWrapper } from '@/admin/components/FormSectionWrapper';
import { UploadImage } from '@/admin/components/UploadImage';
import { IUploadedFile } from '@/admin/components/UploadImage/types';
import { IMAGES_FORM } from '@/admin/sections/Management/ProductManagement/ProductCardForm/consts';
import { useLazyDeleteProductImageQuery, useLazySetProductImageQuery } from '@/redux/services/adminApi';
import { IImages } from '@/redux/services/types/admin';
import ArrayRender from '@/shareds/utils/components/ArrayRender';
import { QueryActionCreatorResult } from '@reduxjs/toolkit/query';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { QueryDefinition } from '@reduxjs/toolkit/src/query/endpointDefinitions';
import styles from './styles.module.scss';

export const UploadPhotosForm: FC<IProductCardFormProps & { images: IImages[] }> = ({
  product_id,
  values,
  images,
}) => {
  const [imagesForm, setImagesForm] = useState<IImageForm[]>(IMAGES_FORM); // Локальный стейт для обновления изображений

  const [setProductImages] = useLazySetProductImageQuery();
  const [deleteProductImages] = useLazyDeleteProductImageQuery();

  const handleFileRemove = useCallback(
    (id: number): QueryActionCreatorResult<QueryDefinition> => deleteProductImages({ product_id, imageId: id }),
    [product_id, deleteProductImages],
  );

  const handleFileUpload = useCallback(
    ({ image, type }: IUploadedFile): QueryActionCreatorResult<QueryDefinition> => {
      const formData = new FormData();
      formData.append('image', image!);
      return setProductImages({ type: type!, image: formData, product_id });
    },
    [product_id, setProductImages],
  );

  // Когда приходят данные с сервера, обновляем стейт с изображениями
  useEffect(() => {
    if (images?.length) {
      let newType = 3;

      const updatedImages = images.map((image) => {
        if (image.type === 3) {
          const updatedImage = {
            ...image,
            type: newType,
          };
          newType += 1;
          return updatedImage;
        }
        return image;
      });

      const updatedImagesForm = imagesForm.map((imageItem) => {
        const serverImage = updatedImages.find(
          (img) => img.type === imageItem.connectId,
        );

        if (serverImage) {
          return {
            ...imageItem,
            url: serverImage.url,
            id: serverImage.id,
          };
        }
        return imageItem;
      });

      setImagesForm(updatedImagesForm);
    }
  }, [values?.images]);

  return (
    <FormSectionWrapper
      title="Загрузите фотографии"
      description="Выберите фото или перетащите изображение (Поддерживаемые форматы PNG, JPEG, JPG, макс. 10 мб )"
      childrenClassName={styles.wrapper}
    >
      <div className={styles.imagesWrapper}>
        <ArrayRender
          items={imagesForm}
          renderItem={(item) => (
            <UploadImage
              {...item}
              product_id={product_id}
              onFileUpload={handleFileUpload}
              handleFileRemove={handleFileRemove}
            />
          )}
        />
      </div>

      {!values?.images?.length && (
        <span className={styles.error}>Загрузите минимум 1 фото</span>
      )}
    </FormSectionWrapper>
  );
};
