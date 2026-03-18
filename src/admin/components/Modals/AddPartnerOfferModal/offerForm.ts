import { FieldValues } from 'react-hook-form';
import { IAdminProductAttribute, IOfferFormRequest } from '@/redux/services/types/admin';

interface IOfferForm {
  data: FieldValues,
  productId: number
  partnerId: number
}
export const offerForm = ({ data, productId, partnerId }: IOfferForm): IOfferFormRequest => ({
  product_id: productId,
  partner_id: partnerId,
  office_ids: data.shops.map((item: IAdminProductAttribute) => item.id),
  price: Number(data.price),
  discount_price: Number(data.discount_price),
  discount_percent: Number(data.discount_percent),
  start_at: data.startDate,
  end_at: data.endDate,
  link: data.productLink,
  partner_product_id: data.partner_product_id,
});
