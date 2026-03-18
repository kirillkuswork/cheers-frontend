import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { getBaseUrl } from '@/consts/config';
import { BaseQueryFn } from '@reduxjs/toolkit/query';

const headers: Record<string, string> = {};

const instance = axios.create({
  baseURL: getBaseUrl(),
  headers,
});

let refreshAttempts = 0;

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

instance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const request = error.config;

    const token = localStorage.getItem('refreshToken');
    const originalRequest = error.config as AxiosRequestConfig & { isRetry?: boolean };

    if (error.response?.status === 401 && !originalRequest.isRetry && refreshAttempts < 3) {
      originalRequest.isRetry = true;
      refreshAttempts += 1;

      try {
        localStorage.setItem('accessToken', '');
        const tokens = await instance.post('/auth/refresh-token', {
          refresh_token: token,
        });

        localStorage.setItem('refreshToken', tokens.data.refresh_token);
        localStorage.setItem('accessToken', tokens.data.access_token);
        refreshAttempts = 0;

        return await instance.request(request);
      } catch (refreshError) {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        throw refreshError;
      }
    }
    throw error;
  },
);

export const axiosBaseQuery = (): BaseQueryFn<
{
  url: string;
  method: AxiosRequestConfig['method'];
  body?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
},
unknown,
{ status?: number; data?: unknown }
> => async ({
  url, method, body: data, params,
}) => {
  try {
    const result = await instance({
      url,
      method,
      data,
      params,
    });

    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError as AxiosError;

    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
};
