import { IErrorResponse } from '@/redux/types/errors';
import { error } from '@/helpres/AlertHelpers';

export const getErrorMessages = (errorData: IErrorResponse) => {
  if (Array.isArray(errorData.data.detail)) {
    errorData.data.detail.map((err) => error(err.msg));
  }

  return error(errorData.data.message || errorData.data.detail as string);
};
