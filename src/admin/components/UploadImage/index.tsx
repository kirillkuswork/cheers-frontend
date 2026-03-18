/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState, useRef, useEffect, useCallback, useMemo, FC,
} from 'react';
import clsx from 'clsx';
import { ArrowClockWise, UploadIcon } from '@/admin/assets/icons';
import {
  Alert, Approve, Trash,
} from '@/assets/icons';
import { CustomTooltip } from '@/shareds/ui/CustomTooltip';
import { IUploadImageProps } from '@/admin/components/UploadImage/types';
import Image from 'next/image';
import { useAddNewProductFormContext } from '@/providers/AddNewProductFormProvider';
import { success } from '@/helpres/AlertHelpers';
import styles from './styles.module.scss';

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const UploadImage: FC<IUploadImageProps> = ({
  title,
  className,
  type,
  onFileUpload,
  handleFileRemove,
  hasError,
  id,
  url,
  product_id,
  isProducer,
  connectId,
}) => {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [isDragActive, setIsDragActive] = useState(false);
  const [isDragReject, setIsDragReject] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(url || null);
  const { addProductImage, addProducerImage, removeProductImage } = useAddNewProductFormContext();

  useEffect(() => {
    if (url) {
      setImageUrl(`${url}?cacheBuster=${Math.random()}`);
    }
  }, [url]);

  const statuses = (status: string) => {
    if (status === 'fulfilled') {
      setUploadStatus('success');
    } else {
      setUploadStatus('error');
      setErrorMessage('Ошибка загрузки');
    }
  };

  const handleFile = useCallback((file: File | null) => {
    if (file && file.size > MAX_FILE_SIZE) {
      setUploadStatus('error');
      setErrorMessage('Файл более 10 Мб');
      onFileUpload({ type, image: null, id: id! });
    } else if (file) {
      setImageUrl(null);
      setErrorMessage(null);
      setIsDragReject(false);
      setUploadedFile(file);
      if (product_id) {
        setUploadStatus('uploading');
        if (url) {
          handleFileRemove?.(id!).then(() => {
            onFileUpload({ type, image: file, id: id! })?.then((res) => {
              statuses(res.status);
            });
          });
        } else {
          onFileUpload({ type, image: file, id: id! })?.then((res) => {
            statuses(res.status);
            if (res.status === 'fulfilled') {
              success('Изображение добавлено');
            }
          });
        }
      } else {
        if (isProducer) {
          addProducerImage({ type, image: file, id: connectId! });
        }
        addProductImage({ type, image: file, id: connectId! });
      }
    }
  }, [id, onFileUpload, type]);

  const handleDragEvents = (e: React.DragEvent, isActive: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(isActive);
    setIsDragReject(false);
    setErrorMessage(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    handleDragEvents(e, false);
    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith('image/'));
    if (droppedFiles.length > 0) {
      handleFile(droppedFiles[0]);
    } else {
      setIsDragReject(true);
    }
  };

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    handleFile(selectedFile);
  }, [handleFile]);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleRemove = useCallback(() => {
    if (product_id) {
      handleFileRemove?.(id!).then((res) => {
        if (res.status === 'fulfilled') {
          success('Изображение удалено');
        }
      });
    }
    removeProductImage(connectId!);
    setUploadedFile(null);
    setImageUrl(null);
    setErrorMessage(null);
  }, [handleFileRemove, id]);

  const isEmpty = !uploadedFile && !imageUrl;

  const input = useMemo(() => (
    <input
      ref={inputRef}
      type="file"
      accept="image/*"
      className={styles.input}
      onChange={handleFileChange}
    />
  ), [handleFileChange]);

  const renderImage = useCallback(
    (imageSrc: string) => (
      <div className={styles.preview}>
        <Image
          fill
          className={styles.img}
          src={imageSrc}
          alt="Загрузить изображение"
        />
        {(uploadStatus === 'success' || uploadStatus === 'idle') && (
        <div className={styles.done}>
          <Approve className={styles.statusIcon} />

          <CustomTooltip isInverted title="Загрузить заново">
            <div
              onClick={handleClick}
              className={clsx(styles.iconButton, styles.reloadButton)}
            >
              <ArrowClockWise />
              {input}
            </div>
          </CustomTooltip>
          <CustomTooltip isInverted title="Удалить">
            <div
              className={clsx(styles.iconButton, styles.removeButton)}
              onClick={handleRemove}
            >
              <Trash />
            </div>
          </CustomTooltip>
        </div>
        )}
        {uploadStatus === 'uploading' && (
        <div className={styles.errorWrapper}>
          <div className={styles.progressBar}>
            <div className={styles.progress} />
          </div>
        </div>
        )}

        {(uploadStatus === 'error' || isDragReject) && (
        <div className={styles.errorWrapper}>
          <CustomTooltip isInverted title="Загрузить заново">
            <div
              onClick={handleClick}
              className={clsx(styles.iconButton, styles.reloadButton)}
            >
              <ArrowClockWise />
              {input}
            </div>
          </CustomTooltip>
          <Alert className={styles.errorIcon} />
          <span className={styles.errorMessage}>{errorMessage}</span>
        </div>
        )}
      </div>
    ),
    [errorMessage, handleClick, handleRemove, input, isDragReject, uploadStatus],
  );

  return (
    <div
      className={clsx(
        styles.uploadContainer,
        isDragActive && styles.dragActive,
        (isDragReject || errorMessage || (hasError && isEmpty))
              && styles.dragReject,
        className,
        !isEmpty && styles.notEmpty,
      )}
      onDragEnter={(e) => handleDragEvents(e, true)}
      onDragLeave={(e) => handleDragEvents(e, false)}
      onDragOver={(e) => handleDragEvents(e, true)}
      onDrop={handleDrop}
    >
      {!isEmpty && (imageUrl ? renderImage(imageUrl) : renderImage(URL.createObjectURL(uploadedFile!)))}

      {isEmpty && (
        <div className={styles.inner}>
          <div className={styles.uploadContent} onClick={handleClick}>
            {input}
            {(uploadStatus === 'error' || isDragReject || errorMessage) ? (
              <div className={clsx(styles.errorWrapper, styles.emptyError)}>
                <CustomTooltip isInverted title="Загрузить заново">
                  <div className={clsx(styles.iconButton, styles.reloadButton)}>
                    <ArrowClockWise />
                    {input}
                  </div>
                </CustomTooltip>
                <Alert className={styles.errorIcon} />
                <span className={styles.errorMessage}>{errorMessage}</span>
              </div>
            ) : (
              <>
                <UploadIcon className={styles.uploadIcon} />
                <span className={styles.title}>{title}</span>
              </>
            )}

          </div>
        </div>
      )}
    </div>
  );
};
