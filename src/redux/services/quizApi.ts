/* eslint-disable import/no-cycle */
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/redux/utils/baseQuery';
import { IQuizResponse } from '@/redux/services/types/quiz';

export const quizApi = createApi({
  reducerPath: 'quizApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getWineBySituation: builder.query<IQuizResponse[], void>({
      query: () => ({
        url: '/quiz/wine_by_situation',
        method: 'GET',
      }),
    }),
    getRuAnalogs: builder.query<IQuizResponse[], void>({
      query: () => ({
        url: '/quiz/ru_analogs',
        method: 'GET',
      }),
    }),
  }),
});

export const { useLazyGetWineBySituationQuery, useLazyGetRuAnalogsQuery } = quizApi;
