import { IProductResponse } from '@/redux/services/types/admin';

export const mapBaseProductToForm = (product: IProductResponse['base_product_card']) => ({
  productId: product.id,
  productName: product.name,
  briefInfo: product.brief_info,
  name: product.producer.name,
  producerId: product.producer.id,
  description: product.producer.description,
  image_url: product.producer.image_url,
  temperature: product.temperature,
});
