/* eslint-disable no-unsafe-optional-chaining */
import {
  IAdditionalAttribute,
  IAdminProductForm,
  IAttribute,
  ITasteNoteWithName,
} from '@/redux/services/types/admin';
import { FieldValues } from 'react-hook-form';
import { IEnumResponse } from '@/redux/services/types/enum';

export const transformProductData = (
  product: FieldValues,
  enumData: IEnumResponse,
): IAdminProductForm => {
  function mapTasteNotes(tasteNotes: ITasteNoteWithName[] | null) {
    if (!tasteNotes) return null;

    const filteredNotes = tasteNotes.filter((note) => {
      const { name, percent } = note;

      return Object.keys(note).length > 0 && name != null && percent != null;
    });

    return filteredNotes.length > 0
      ? filteredNotes.map(({ id, percent }) => ({ id, percent }))
      : null;
  }

  const grapesValues = product.grapes || [];
  const gastronomyValues = product.gastronomy || [];

  // Универсальная функция для обработки массива атрибутов
  const mapAttributes = (attributeValues: (IAttribute & { id?: number })[]): IAttribute[] => [
    ...attributeValues?.map((attribute: IAttribute & { id?: number }) => ({
      value_id: attribute?.id || attribute?.value_id,
    })),
  ].filter((attr) => attr?.value_id !== null);

  const grapesAttributes = mapAttributes(grapesValues);
  const gastronomyAttributes = mapAttributes(gastronomyValues);

  const additionalAttributes: IAdditionalAttribute[] = [
    { attribute_id: enumData.AttributeEnum.abv, value: product.abv },
    { attribute_id: enumData.AttributeEnum.bodied_level, value: product?.bodied_level },
    { attribute_id: enumData.AttributeEnum.acidity_level, value: product?.acidity_level },
    { attribute_id: enumData.AttributeEnum.tannin_level, value: product?.tannin_level },
    { attribute_id: enumData.AttributeEnum.fizziness_level, value: product?.fizziness_level },
    { attribute_id: enumData.AttributeEnum.sweetness_level, value: product?.sweetness_level },
  ].filter(
    (attr) => attr.value !== null && attr.value !== undefined && attr.value !== '',
  );

  const attributes = [
    { value_id: product?.country?.id || null },
    { value_id: product?.volume?.id || null },
    { value_id: product?.materials?.id || null },
    { value_id: product?.color?.id || null },
    { value_id: product?.region?.id || null },
    { value_id: product?.sub_type?.id || null },
    { value_id: product?.type?.id || null },
    { value_id: product?.sweetness?.id || null },
  ].filter((attr) => attr?.value_id !== null);

  return {
    attributes: [...attributes, ...grapesAttributes, ...gastronomyAttributes] as IAttribute[],
    additional_attributes: [...additionalAttributes],
    base_product_card: {
      id: product?.productId,
      name: product?.productName,
      brief_info: product?.briefInfo,
      temperature: product?.temperature,
      producer: {
        id: product?.producerId,
        name: product?.name,
        description: product?.degustation,
      },
    },
    prefix: product?.prefix || null,
    suffix: product?.suffix || null,
    year: product?.year,
    vivino_id: Number(product?.vivino_id),
    dye: product?.dye || '',
    flavour: product?.flavour || '',
    taste: product?.taste || '',
    degustation: product?.degustation || '',
    style: product?.style || '',
    vivino_rating: Number(product?.vivino_rating),
    is_hidden: product?.is_hidden || false,
    region_place: Number(product?.region_place) || null,
    vineyard_place: Number(product?.vineyard_place) || null,
    world_place: Number(product?.world_place) || null,
    synchronized_at: new Date().toISOString() || '',
    taste_notes: mapTasteNotes(product.taste_notes) || null,
  };
};
