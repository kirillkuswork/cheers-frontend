/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  FC, HTMLAttributes, useMemo, useState, MouseEvent,
} from 'react';
import clsx from 'clsx';
import { ProductCardRate } from '@/shareds';
import {
  Copy,
  Expert,
  Eye,
  EyeSlash, Refresh,
  Star,
  Trash,
  UnRefresh,
} from '@/assets/icons';
import Image from 'next/image';
import { DeletePartnerOfferModal } from '@/admin/components/Modals/DeletePartnerOfferModal';
import { useDeleteProductByIdMutation, useUpdateProductVisibilityMutation } from '@/redux/services/adminApi';
import { IAdminProduct } from '@/redux/services/types/admin';
import { formatToDDMMYY } from '@/helpres/formatTime';
import { CustomTooltip } from '@/shareds/ui/CustomTooltip';
import image from '@/assets/images/vine.png';
import styles from './styles.module.scss';

interface IProductListCardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'id'>,
  IAdminProduct {}

export const ProductListCard: FC<IProductListCardProps> = (props) => {
  const {
    className,
    id,
    imageUrl,
    name,
    isHidden,
    syncronizedAt,
    ratingCustomer,
    ratingExpert,
    updatedAt,
    properties,
  } = props;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>(imageUrl! || image.src);

  const handleDeleteModalOpen = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDeleteModalOpen(true);
  };
  const handleDeleteModalClose = () => setIsDeleteModalOpen(false);

  const [deleteProduct, { isLoading }] = useDeleteProductByIdMutation();
  const [updateProductVisibility] = useUpdateProductVisibilityMutation();

  const handleDeleteProduct = () => {
    deleteProduct(id).then(() => {
      setIsDeleteModalOpen(false);
    });
  };

  const handleUpdateProductVisibility = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    updateProductVisibility({ id, is_hidden: !isHidden });
  };

  const handleImageError = () => {
    setImgSrc(image.src);
  };

  const { volume, ...otherProperties } = properties!;
  const propertyValues = [
    ...Object.values(otherProperties).filter(Boolean),
    volume ? `${volume} мл` : null,
  ]
    .filter(Boolean)
    .join(', ');

  const syncronizedDate = useMemo(() => (
    syncronizedAt ? `Синхронизировано ${formatToDDMMYY(syncronizedAt)}` : 'Не синхронизирован'
  ), [syncronizedAt]);

  const dateOfChange = useMemo(() => (
    `Изменена ${formatToDDMMYY(updatedAt)}`
  ), [updatedAt]);

  return (
    <>
      <div className={clsx(styles.listItem, className)}>
        <div className={styles.leftBlock}>
          <div className={styles.imgWrapper}>
            <Image fill src={imgSrc} onError={handleImageError} alt="вино" className={styles.img} />
          </div>
          <div className={styles.text}>
            <span className={styles.title}>{name}</span>
            <span className={styles.description}>{propertyValues}</span>
          </div>
          <div className={styles.ratings}>
            <ProductCardRate icon={<Expert />} value={ratingExpert} />
            <ProductCardRate icon={<Star />} value={ratingCustomer} />
          </div>
        </div>

        <div className={styles.rightBlock}>
          <div className={styles.buttons}>
            <div className={styles.icon} onClick={(event) => handleUpdateProductVisibility(event)}>
              <CustomTooltip title={isHidden ? 'Товар скрыт' : 'Опубликован'}>
                {isHidden ? <EyeSlash /> : <Eye />}
              </CustomTooltip>
            </div>
            <div className={styles.icon}>
              <CustomTooltip title={syncronizedDate}>
                {syncronizedAt ? <Refresh /> : <UnRefresh /> }
              </CustomTooltip>
            </div>
            <div className={styles.icon}>
              <CustomTooltip title="Дублировать товар">
                <Copy />
              </CustomTooltip>
            </div>
            <div className={styles.icon} onClick={(event) => handleDeleteModalOpen(event)}>
              <CustomTooltip title="Удалить товар">
                <Trash />
              </CustomTooltip>
            </div>
          </div>
          <span className={styles.changes}>
            {dateOfChange}
          </span>
        </div>
      </div>

      <DeletePartnerOfferModal
        isLoading={isLoading}
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onDelete={handleDeleteProduct}
        title="Вы действительно хотите удалить товар?"
      />
    </>
  );
};
