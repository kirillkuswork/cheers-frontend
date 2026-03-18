/* eslint-disable import/no-cycle */
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/redux/utils/baseQuery';
import {
  IAdminBaseCardByIdResponse,
  IAdminProductForm,
  IAdminProductFormRequest,
  IGetAdminBaseCardRequest,
  IGetAdminBaseCardResponse,
  IGetAdminOffersRequest,
  IGetAdminOffersResponse,
  IGetAdminOfficesRequest,
  IGetAdminOfficesResponse,
  IGetAdminPartnersRequest,
  IGetAdminPartnersResponse, IGetAdminProducerListRequest, IGetAdminProducerListResponse,
  IGetAdminProductAttributesRequest,
  IGetAdminProductAttributesResponse,
  IGetAdminProductsRequest,
  IGetAdminProductsResponse,
  IOfferFormRequest,
  IOfferFormResponse,
  IProducerImageRequest,
  IProducerImageResponse, IProductImageRequest,
  IProductImageResponse,
  IProductResponse,
  ITasteNoteRequest,
  ITasteNoteResponse,
  IUpdateProductVisibilityRequest, IVivinoSyncRequest, IVivinoSyncResponse,
} from '@/redux/services/types/admin';
import { camelCaseKeys } from '@/redux/utils/camelCaseKeys';
import { IErrorResponse } from '@/redux/types/errors';
import { getErrorMessages } from '@/redux/utils/getErrorMessages';
import { error } from '@/helpres/AlertHelpers';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['AdminProducts', 'AdminPartners'],
  endpoints: (builder) => ({
    deleteProductById: builder.mutation<string, string>({
      query: (id: string) => ({
        url: `/admin/product/${id}`,
        method: 'DELETE',
      }),
      transformErrorResponse: (errorData: IErrorResponse) => {
        getErrorMessages(errorData);
      },
      invalidatesTags: ['AdminProducts'],
    }),
    updateProductVisibility: builder.mutation<void, IUpdateProductVisibilityRequest>({
      query: (params: IUpdateProductVisibilityRequest) => ({
        url: `/admin/product/${params.id}/is_hidden`,
        method: 'PATCH',
        body: { is_hidden: params.is_hidden },
      }),
      transformErrorResponse: (errorData: IErrorResponse) => {
        getErrorMessages(errorData);
      },
      invalidatesTags: ['AdminProducts'],
    }),
    getAdminProducts: builder.query<IGetAdminProductsResponse, IGetAdminProductsRequest>({
      query: (params: IGetAdminProductsRequest) => ({
        url: '/admin/product',
        method: 'POST',
        body: params,
      }),
      keepUnusedDataFor: 0,
      transformResponse: (response: IGetAdminProductsResponse) => {
        const camelCasedProducts = response.products.map((product) => camelCaseKeys(product));
        return { ...response, products: camelCasedProducts };
      },
      transformErrorResponse: (errorData: IErrorResponse) => {
        getErrorMessages(errorData);
      },
      providesTags: ['AdminProducts'],
    }),
    getAdminBaseCardProducts: builder.query<IGetAdminBaseCardResponse, IGetAdminBaseCardRequest>({
      query: (params: IGetAdminBaseCardRequest) => ({
        url: '/admin/product/base_card',
        method: 'POST',
        body: params,
      }),
      transformErrorResponse: (errorData: IErrorResponse) => {
        getErrorMessages(errorData);
      },
    }),
    getAdminBaseCardById: builder.query<IAdminBaseCardByIdResponse, string>({
      query: (id) => ({
        url: `/admin/product/base_card/${id}`,
        method: 'GET',
      }),
      transformErrorResponse: (errorData: IErrorResponse) => {
        getErrorMessages(errorData);
      },
    }),
    getAdminProductAttributes: builder.query<IGetAdminProductAttributesResponse, IGetAdminProductAttributesRequest>({
      query: (params: IGetAdminProductAttributesRequest) => ({
        url: `/admin/product/value/${params.attributeId}`,
        method: 'POST',
        body: { pagination: params.pagination, query: params.query },
      }),
      transformErrorResponse: (errorData: IErrorResponse) => {
        getErrorMessages(errorData);
      },
      keepUnusedDataFor: 0,
    }),
    getAdminProduct: builder.query<IProductResponse, string>({
      query: (id: string) => ({
        url: `/admin/product/${id}`,
        method: 'GET',
      }),
      transformErrorResponse: (errorData: IErrorResponse) => {
        getErrorMessages(errorData);
      },
    }),
    createAdminProduct: builder.query<IProductResponse, IAdminProductForm>({
      query: (params: IAdminProductForm) => ({
        url: '/admin/product/',
        method: 'PUT',
        body: params,
      }),
      transformErrorResponse: (errorData: IErrorResponse) => {
        error(`Ошибка создания товара. ${errorData.data.message}`);
      },
    }),
    updateAdminProduct: builder.query<IProductResponse, IAdminProductFormRequest >({
      query: (params: IAdminProductFormRequest) => ({
        url: `/admin/product/${params.id}`,
        method: 'PUT',
        body: params.form,
      }),
      transformErrorResponse: (errorData: IErrorResponse) => {
        getErrorMessages(errorData);
      },
    }),
    getAdminTasteNote: builder.query<ITasteNoteResponse, ITasteNoteRequest>({
      query: (params: ITasteNoteRequest) => ({
        url: '/admin/taste_note/',
        method: 'POST',
        body: params,
      }),
      transformErrorResponse: (errorData: IErrorResponse) => {
        getErrorMessages(errorData);
      },
    }),
    getAdminPartners: builder.query<IGetAdminPartnersResponse, IGetAdminPartnersRequest>({
      query: (params: IGetAdminPartnersRequest) => ({
        url: '/admin/partners/',
        method: 'POST',
        body: params,
      }),
      keepUnusedDataFor: 0,
      transformResponse: (response: IGetAdminPartnersResponse) => {
        const camelCasedPartners = response.partners.map((partner) => camelCaseKeys(partner));
        return { ...response, partners: camelCasedPartners };
      },
      transformErrorResponse: (errorData: IErrorResponse) => {
        getErrorMessages(errorData);
      },
    }),
    getAdminOffices: builder.query<IGetAdminOfficesResponse, IGetAdminOfficesRequest>({
      query: (params) => ({
        url: `/admin/partners/${params.partnerId}/offices`,
        method: 'POST',
        body: { pagination: params.pagination },
      }),
      transformResponse: (response: IGetAdminOfficesResponse) => {
        const camelCasedPartners = response.offices.map((partner) => camelCaseKeys(partner));
        return { ...response, partners: camelCasedPartners };
      },
      transformErrorResponse: (errorData: IErrorResponse) => {
        getErrorMessages(errorData);
      },
    }),
    getAdminOffers: builder.query<IGetAdminOffersResponse, IGetAdminOffersRequest>({
      query: (params) => ({
        url: `/admin/offer/${params.productId}/offers`,
        method: 'POST',
        body: { pagination: params.pagination },
      }),
      transformResponse: (response: IGetAdminOffersResponse) => {
        const camelCasedPartners = response.offers.map((partner) => camelCaseKeys(partner));
        return { ...response, partners: camelCasedPartners };
      },
      transformErrorResponse: (errorData: IErrorResponse) => {
        getErrorMessages(errorData);
      },
      providesTags: ['AdminPartners'],
    }),
    deleteOfferById: builder.mutation<string, string>({
      query: (id: string) => ({
        url: `/admin/offer/${id}`,
        method: 'DELETE',
      }),
      transformErrorResponse: (errorData: IErrorResponse) => {
        getErrorMessages(errorData);
      },
      invalidatesTags: ['AdminPartners'],
    }),
    createAdminOffer: builder.mutation<IOfferFormResponse, IOfferFormRequest>({
      query: (params: IOfferFormRequest) => ({
        url: '/admin/offer/',
        method: 'POST',
        body: params,
      }),
      transformErrorResponse: (errorData: IErrorResponse) => {
        getErrorMessages(errorData);
      },
      invalidatesTags: ['AdminPartners'],
    }),
    setProducerImage: builder.query<IProducerImageResponse, IProducerImageRequest >({
      query: (params: IProducerImageRequest) => ({
        url: `/admin/producer/${params.producer_id}/image`,
        method: 'POST',
        body: params.image,
      }),
      keepUnusedDataFor: 0,
    }),
    deleteProducerImage: builder.query<string, number>({
      query: (id: number) => ({
        url: `/admin/producer/${id}/image`,
        method: 'DELETE',
      }),
      keepUnusedDataFor: 0,
    }),
    setProductImage: builder.query<IProductImageResponse, IProductImageRequest>({
      query: (params) => ({
        url: `/admin/product/${params.product_id}/image?image_type=${params.type}`,
        method: 'POST',
        body: params.image,
      }),
      keepUnusedDataFor: 0,
    }),
    deleteProductImage: builder.query<number, Pick<IProductImageRequest, 'product_id'> & { imageId: number }>({
      query: (params) => ({
        url: `/admin/product/${params.product_id}/image`,
        method: 'DELETE',
        body: { image_id: params.imageId },
      }),
      keepUnusedDataFor: 0,
    }),
    getProducerList: builder.query<IGetAdminProducerListResponse, IGetAdminProducerListRequest | null>({
      query: (params: IGetAdminProducerListRequest) => ({
        url: '/admin/producer/',
        method: 'POST',
        body: params,
      }),
      transformResponse: (response: IGetAdminProducerListResponse) => ({
        ...response,
        producers: response.producers.map(({ id, name }) => ({
          id,
          value: name,
        })),
      }),
      transformErrorResponse: (errorData: IErrorResponse) => {
        getErrorMessages(errorData);
      },
    }),
    getSyncWithVivino: builder.query<IVivinoSyncResponse, IVivinoSyncRequest>({
      query: (params: IVivinoSyncRequest) => ({
        url: '/admin/vivino/',
        method: 'POST',
        body: params,
      }),
      transformResponse: (response: IVivinoSyncResponse) => {
        const levels = [
          'acidity_level',
          'bodied_level',
          'fizziness_level',
          'tannin_level',
          'sweetness_level',
        ] as const;

        const transformedAttributes = { ...response.attributes };

        levels.forEach((level) => {
          if (transformedAttributes[level]) {
            transformedAttributes[level] = Math.round(transformedAttributes[level]);
          }
        });

        return {
          ...response,
          attributes: transformedAttributes,
        };
      },
    }),
  }),
});

export const {
  useDeleteProductByIdMutation,
  useUpdateProductVisibilityMutation,
  useLazyGetAdminProductsQuery,
  useLazyGetAdminBaseCardProductsQuery,
  useGetAdminProductAttributesQuery,
  useLazyGetAdminProductAttributesQuery,
  useLazyGetAdminBaseCardByIdQuery,
  useLazyGetAdminProductQuery,
  useLazyCreateAdminProductQuery,
  useLazyUpdateAdminProductQuery,
  useLazyGetAdminTasteNoteQuery,
  useLazyGetAdminPartnersQuery,
  useLazyGetAdminOfficesQuery,
  useLazyGetAdminOffersQuery,
  useDeleteOfferByIdMutation,
  useCreateAdminOfferMutation,
  useLazySetProducerImageQuery,
  useLazySetProductImageQuery,
  useLazyDeleteProducerImageQuery,
  useLazyDeleteProductImageQuery,
  useLazyGetProducerListQuery,
  useLazyGetSyncWithVivinoQuery,
} = adminApi;
