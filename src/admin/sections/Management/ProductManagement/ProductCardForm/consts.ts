import { IImageForm } from '@/admin/sections/Management/ProductManagement/ProductCardForm/types';
import { IAdminProductAttribute } from '@/redux/services/types/admin';
import { DropDownItem } from '@/shareds/ui/Dropdown/types';
import { IAttributeEnum } from '@/redux/services/types/enum';

export const OPTIONS: IAdminProductAttribute[] = [
  { value: 'Вино', id: 1 },
  { value: 'Пиво и сидр', id: 2 },
  { value: 'Коньяк', id: 3 },
  { value: 'Виски', id: 4 },
];

export const MULTI_SELECT_OPTIONS: DropDownItem[] = [
  { label: 'Вино', value: '1' },
  { label: 'Пиво и сидр', value: '2' },
  { label: 'Коньяк', value: '3' },
  { label: 'Виски', value: '4' },
];

export const LINKS = [
  'Основная информация',
  'Загрузка фотографий',
  'Синхронизация с Vivino',
  'О товаре',
  'Производитель',
  'Вкусовые нотки',
];

export const IMAGES_FORM: IImageForm[] = [
  {
    type: 1,
    title: 'Загрузите фото бутылки',
    hasError: false,
    url: '',
    connectId: 1,
  },
  {
    type: 2,
    title: 'Загрузите фото этикетки',
    hasError: false,
    url: '',
    connectId: 2,
  },
  {
    type: 3,
    title: 'Загрузите доп. фото',
    hasError: false,
    url: '',
    connectId: 3,
  },
  {
    type: 3,
    title: 'Загрузите доп. фото',
    hasError: false,
    url: '',
    connectId: 4,
  },
  {
    type: 3,
    title: 'Загрузите доп. фото',
    hasError: false,
    url: '',
    connectId: 5,
  },
  {
    type: 3,
    title: 'Загрузите доп. фото',
    hasError: false,
    url: '',
    connectId: 6,
  },
];

export const attributeEnumObject: IAttributeEnum = {
  type: 1,
  sub_type: 2,
  color: 3,
  sweetness: 4,
  volume: 5,
  materials: 6,
  grapes: 7,
  abv: 8,
  country: 9,
  region: 10,
  bodied_level: 11,
  acidity_level: 12,
  fizziness_level: 13,
  tannin_level: 14,
  sweetness_level: 15,
  gastronomy: 16,
};
