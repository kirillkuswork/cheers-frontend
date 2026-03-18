/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  FC, HTMLAttributes, useCallback, useState,
} from 'react';
import clsx from 'clsx';
import { LinkIcon, Trash } from '@/assets/icons';
import Image from 'next/image';
import { IOffer } from '@/redux/services/types/admin';
import { DeletePartnerOfferModal } from '@/admin/components/Modals/DeletePartnerOfferModal';
import { success } from '@/helpres/AlertHelpers';
import { formatToDDMMYY } from '@/helpres/formatTime';
import { useDeleteOfferByIdMutation } from '@/redux/services/adminApi';
import styles from './styles.module.scss';

interface IPartnerOffersCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'id'>, IOffer {}

export const PartnerOffersCard: FC<IPartnerOffersCardProps> = ({
  className, price, office, id, start_at, end_at, link,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [deleteOffer, { isLoading }] = useDeleteOfferByIdMutation();
  const onCloseModalHandler = () => {
    setOpenModal(false);
  };
  const onDeleteModalHandler = () => {
    setOpenModal((prevState) => !prevState);
  };

  const handleDeleteOffer = useCallback(() => {
    deleteOffer(String(id)).then(() => {
      setOpenModal(false);
    });
  }, [setOpenModal]);

  const handleCopyToClipBoard = (text: string) => {
    navigator.clipboard.writeText(text);
    success('Ссылка скопирована');
  };

  return (
    <>
      <div className={clsx(styles.listItem, className)}>
        <div className={styles.imgWrapper}>
          <Image
            fill
            src={office?.partner.image_url}
            alt="вино"
            className={styles.img}
          />
        </div>
        <span className={styles.price}>{`${price} ₽`}</span>
        <div className={styles.text}>
          {office?.metro?.name && <span className={styles.name}>{office.metro.name}</span>}
          {office?.address && <span className={styles.address}>{office.address}</span>}
          <div className={styles.other}>
            {office?.work_hour_from && <span>{`Пн-вс: ${office.work_hour_from.slice(0, -3)} - ${office.work_hour_to.slice(0, -3)}`}</span>}
            {office?.phone && <span>{`Телефон: ${office.phone}`}</span>}
          </div>
        </div>
        <span className={styles.idNumber}>{`ID ${id}`}</span>

        <div className={styles.buttons}>

          <div>
            {link && (<LinkIcon className={styles.icon} onClick={() => handleCopyToClipBoard(link)} />)}
          </div>

          <div>
            <Trash className={styles.icon} onClick={onDeleteModalHandler} />
          </div>
        </div>
        <div className={styles.changes}>
          {start_at && <span className={styles.from}>{`от ${formatToDDMMYY(start_at)} г.`}</span>}
          {end_at && <span className={styles.to}>{`до ${formatToDDMMYY(end_at)} г.`}</span>}
        </div>
      </div>

      <DeletePartnerOfferModal
        isLoading={isLoading}
        isOpen={openModal}
        onClose={onCloseModalHandler}
        onDelete={handleDeleteOffer}
      />
    </>
  );
};
