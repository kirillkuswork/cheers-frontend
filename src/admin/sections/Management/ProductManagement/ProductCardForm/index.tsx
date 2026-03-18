/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-cycle */
import React, {
  FC, HTMLAttributes, useCallback, useEffect, useMemo, useState,
} from 'react';
import { Container } from '@/admin/components/Container';
import { useForm } from 'react-hook-form';
import { Button, ButtonStack, Skeletons } from '@/shareds';
import { useChaptersScroll } from '@/shareds/hooks/useChaptersScroll';
import { getScrollingProps } from '@/helpres/scrollSlider';
import { attributeEnumObject, LINKS } from '@/admin/sections/Management/ProductManagement/ProductCardForm/consts';
import {
  useLazyCreateAdminProductQuery,
  useLazyGetAdminBaseCardByIdQuery,
  useLazyGetAdminProductQuery,
  useLazySetProducerImageQuery,
  useLazySetProductImageQuery,
  useLazyUpdateAdminProductQuery,
} from '@/redux/services/adminApi';
import { useSelector } from 'react-redux';
import { adminSelector } from '@/redux/selectors/adminSelectors';
import { useRouter } from 'next/router';
import { mapEditProductToForm } from '@/admin/sections/Management/ProductManagement/ProductCardForm/helpers/mapEditProductToForm';
import { enumSelector } from '@/redux/selectors/enumSelectors';
import { IMapAttributes, IProductAttributesResult } from '@/admin/sections/Management/ProductManagement/ProductCardForm/types';
import { mapBaseProductToForm } from '@/admin/sections/Management/ProductManagement/ProductCardForm/helpers/productsBaseForm';
import { transformProductData } from '@/admin/sections/Management/ProductManagement/ProductCardForm/helpers/transformedProductData';
import { useActions } from '@/shareds/hooks/useActions';
import { adminActions } from '@/redux/actions/adminActions';
import { IAdminProductAttribute, IAttribute, IImages } from '@/redux/services/types/admin';
import { useAddNewProductFormContext } from '@/providers/AddNewProductFormProvider';
import { UploadingModal } from '@/admin/components/Modals/UploadingModal';
import { useAttributeSelects } from '@/shareds/hooks/useAttributeSelect';
import { error as errorFn, success } from '@/helpres/AlertHelpers';
import { Title } from './Title';
import { SectionIndicators } from './SectionIndicators';
import {
  AboutProductForm,
  MainInformationForm,
  ProducerForm,
  ProductNameForm, SynchronizationForm,
  TasteCharacteristicsForm,
  TasteNotesForm,
  UploadPhotosForm,
  VisibilityForm,
} from './FormSections';
import styles from './styles.module.scss';

interface IProps extends HTMLAttributes<HTMLDivElement> {}

export const ProductCardForm: FC<IProps> = () => {
  const router = useRouter();
  const editMode = router?.query?.id;
  const isBaseCard = !!router?.query?.type;

  const [isLoadingProduct, setIsLoadingProduct] = useState<boolean>(true);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    reset,
  } = useForm({ mode: 'onChange' });

  // Получение текущих значений формы
  const data = getValues();
  const { type } = data;

  // логика для меню/скролла
  const { activeChapter, refs, setMainRef } = useChaptersScroll(LINKS);
  const getScrollingPropsByIndex = (index: number) => getScrollingProps(index, refs);
  const links = useMemo(
    () => (type?.value === 'Вино' ? LINKS : LINKS.filter((_, index) => index !== 2)),
    [type],
  );
  const [attributeResults] = useState<IProductAttributesResult>({});
  const [uploadingStatus, setUploadingStatus] = useState<boolean>();

  const [getBaseCardById, { isFetching: isBaseCardLoading }] = useLazyGetAdminBaseCardByIdQuery();
  const [
    getAdminProduct,
    { data: adminProduct, isFetching: isAdminProductLoading },
  ] = useLazyGetAdminProductQuery();
  const [createProduct, { isFetching: isCreatingProduct }] = useLazyCreateAdminProductQuery();
  const [updateProduct, { isFetching: isUpdatingProduct }] = useLazyUpdateAdminProductQuery();
  const [setProductImages, { isFetching: isProductFetching }] = useLazySetProductImageQuery();
  const [setProducerImage] = useLazySetProducerImageQuery();

  const { enumData } = useSelector(enumSelector);
  const { selectedBaseCard, selectedProductValues, synchronizedData } = useSelector(adminSelector);

  const { setSelectedProductValues, setSelectedBaseCard, setSynchronizedData } = useActions(adminActions);
  const { uploadedImages, uploadedProducerImage } = useAddNewProductFormContext();
  const {
    selectStates, handleSearch, loadMoreAttributes, isAttributesFetching,
  } = useAttributeSelects();

  useEffect(() => {
    // добавляем данные в режиме редактирования
    if (editMode) {
      getAdminProduct(String(editMode)).then((res) => {
        if (res.data) {
          setIsLoadingProduct(false);
          reset(mapEditProductToForm(res?.data));

          const additionalAttributes = [
            ...(res.data.additional_attributes || []),
          ];
          const attributes = [...(res.data.attributes || [])];

          additionalAttributes.forEach((attr) => {
            setValue(attr.attribute_title!, attr.value);
          });

          // функция для селектов, чтобы устанавливать в них параметры пришедшие с бэкенда через форму
          const mapAttributes = () => {
            const result: IMapAttributes = {};

            Object.keys(attributeEnumObject).forEach((key) => {
              // Поиск в combinedAttributes по ключу attribute_title
              const foundAttribute = attributes.find(
                (attr) => attr.attribute_title === key,
              );

              // Если найдено совпадение, добавляем его в результат с заменой value_id на id
              if (foundAttribute) {
                // Извлекаем value_id
                const { value_id: valueId, ...rest } = foundAttribute;
                result[key] = {
                  // Заменяем value_id на id
                  id: valueId!,
                  ...rest,
                } as Omit<IAdminProductAttribute, 'attributes'>;
              }
            });

            Object.keys(result).forEach((key) => {
              // Устанавливаем значение в форму по ключу
              setValue(key, result[key]);
            });
          };
          mapAttributes();

          // функция для мультиселектов, чтобы устанавливать в них параметры пришедшие с бэкенда через форму
          const attributesList = ['gastronomy', 'grapes'];
          const mapAttributesAndSetValues = () => {
            const attributesMap: Record<string, IAttribute[]> = {};

            // Проходим по всем атрибутам
            attributes.forEach((attr) => {
              const title = attr.attribute_title;

              // Проверяем, если title существует и он есть в списке attributesList
              if (title && attributesList.includes(title)) {
                // Если ключ еще не создан в attributesMap, инициализируем его как пустой массив
                if (!attributesMap[title]) {
                  attributesMap[title] = [];
                }

                // Добавляем атрибут в соответствующий массив
                attributesMap[title].push({
                  value_id: attr.value_id,
                  value: attr.value,
                  attribute_id: attr.attribute_id,
                  attribute_title: attr.attribute_title,
                });
              }
            });

            // Устанавливаем значения в форму для каждого найденного набора атрибутов
            Object.keys(attributesMap).forEach((key) => {
              setValue(key, attributesMap[key]);
            });
          };
          mapAttributesAndSetValues();
        }
      });
    }
  }, [
    !!editMode,
    isLoadingProduct,
    reset,
    setValue,
    isBaseCard,
  ]);

  useEffect(() => {
    if (isBaseCard && selectedBaseCard?.id) {
      getBaseCardById(selectedBaseCard?.id).then((res) => {
        setIsLoadingProduct(false);
        if (res.data) {
          reset(mapBaseProductToForm(res?.data));
          setValue?.('type', selectedProductValues);
        }
      });
    }
  }, [isBaseCard, reset]);

  useEffect(() => {
    if (!isBaseCard && !selectedBaseCard?.id && !editMode) {
      setIsLoadingProduct(false);
      reset();
      setValue?.('productName', selectedProductValues?.name, {
        shouldValidate: true,
      });
      setValue?.('type', selectedProductValues, {
        shouldValidate: true,
      });
    }
  }, [isBaseCard]);

  // обновляем данные формы после синхронизации с Vivino
  useEffect(() => {
    if (synchronizedData !== null) {
      Object.entries(synchronizedData).forEach(([key, value]) => {
        setValue?.(key as keyof typeof synchronizedData, value);
      });
      success('Форма обновлена. Сохраните изменения');
      setSynchronizedData(null);
    }
  }, [synchronizedData]);

  useEffect(() => () => {
    setSelectedProductValues(null);
    setSelectedBaseCard(null);
  }, []);

  const addImagesToNewProduct = async (product_id: number) => {
    // Фильтруем изображения, чтобы отправлять только те, у которых есть изображение и id не undefined
    const validImages = uploadedImages.filter(
      (item) => item.image !== null && item.id !== undefined,
    );

    const promises = validImages.map((item) => {
      const formData = new FormData();
      formData.append('image', item.image!);

      return setProductImages({
        id: item.id!,
        type: item.type!,
        image: formData,
        product_id,
      }).unwrap();
    });

    try {
      await Promise.all(promises);
    } catch (error) {
      setUploadingStatus(false);
    }
  };

  const addProducerImageToNewProduct = async (producer_id: number) => {
    if (!uploadedProducerImage?.image) {
      return Promise.resolve();
    }

    const formData = new FormData();
    formData.append('image', uploadedProducerImage?.image);

    await setProducerImage({
      image: formData,
      producer_id,
    });
  };

  const onSubmit = handleSubmit(async (formData) => {
    const transformedData = transformProductData(formData, enumData);

    // Проверка наличия изображения с type === 1 среди локально загруженных или уже существующих
    const hasTypeOneImage = (
      (uploadedImages && uploadedImages.some((image) => image.image && image.type === 1))
        || (data.images && data.images.some((image: IImages) => image.type === 1))
    );

    if (!hasTypeOneImage) {
      errorFn('Загрузите фото бутылки');
      setUploadingStatus(false);
      return;
    }

    if (adminProduct?.id) {
      await updateProduct({
        form: transformedData,
        id: adminProduct?.id,
      }).then((res) => {
        if (res.data) {
          success('Товар отредактирован');
          router.push('/admin/products');
          setValue('vivino_id', null);
        }
      });
    } else {
      setUploadingStatus(true);
      await createProduct(transformedData).then(async (res) => {
        if (res.data) {
          const uploadPromises = [
            await addImagesToNewProduct(res.data.id),
            await addProducerImageToNewProduct(res.data.base_product_card.producer.id),
          ];
          await Promise.all(uploadPromises);

          setUploadingStatus(false);
          setValue('vivino_id', null);
          await router.push('/admin/products');
          success('Товар создан успешно');
        }
        setUploadingStatus(false);
      });
    }
  });

  const onCancelHandler = useCallback(() => {
    router.push('/admin/products');
  }, [router]);

  const props = {
    control,
    errors,
    setValue,
    values: data,
    attributeResults,
    editMode: !!editMode,
    baseCard: isBaseCard,
  };

  if (isLoadingProduct && (isAdminProductLoading || isBaseCardLoading)) {
    return (
      <Skeletons.AdminCreatProductFormSkeleton />
    );
  }

  return (
    <Container className={styles.outer}>
      <div ref={setMainRef} className={styles.inner}>
        <form className={styles.form}>
          <Title
            title={editMode ? 'Редактирование товара' : 'Добавление товара'}
          />

          <div {...getScrollingPropsByIndex(0)}>
            <ProductNameForm
              selectStates={selectStates}
              isLoading={isBaseCardLoading}
              {...props}
            />
          </div>

          <MainInformationForm
            isAttributesFetching={isAttributesFetching}
            handleSearch={handleSearch}
            loadMoreAttributes={loadMoreAttributes}
            selectStates={selectStates}
            {...props}
          />

          {type?.value === 'Вино' && <TasteCharacteristicsForm {...props} />}

          <div {...getScrollingPropsByIndex(1)}>
            <UploadPhotosForm
              images={data?.images as IImages[]}
              {...props}
              product_id={adminProduct?.id}
            />
          </div>

          {type?.value === 'Вино' && (
            <div {...getScrollingPropsByIndex(2)}>
              <SynchronizationForm {...props} />
            </div>
          )}

          <div {...getScrollingPropsByIndex(3)}>
            <AboutProductForm {...props} />
          </div>

          <div {...getScrollingPropsByIndex(4)}>
            <ProducerForm
              {...props}
              product_id={adminProduct?.id}
              producer_id={adminProduct?.base_product_card?.producer?.id}
              imageUrl={data?.image_url}
            />
          </div>

          <div {...getScrollingPropsByIndex(5)}>
            <TasteNotesForm {...props} />
          </div>

          <VisibilityForm {...props} />
        </form>

        <SectionIndicators links={links} activeChapter={activeChapter} />
      </div>

      <ButtonStack>
        <Button
          onClick={onCancelHandler}
          className={styles.button}
          label="Отмена"
          variant="tertiary"
          size="large"
        />
        <Button
          onClick={onSubmit}
          isLoading={isCreatingProduct || isUpdatingProduct || isProductFetching}
          disabled={isCreatingProduct || isUpdatingProduct || isProductFetching}
          className={styles.button}
          label="Сохранить"
          size="large"
        />
      </ButtonStack>

      <UploadingModal
        isCreatingProduct={isCreatingProduct}
        isOpen={uploadingStatus!}
      />
    </Container>
  );
};
