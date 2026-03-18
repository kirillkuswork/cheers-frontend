import { QueryActionCreatorResult } from '@reduxjs/toolkit/query';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { QueryDefinition } from '@reduxjs/toolkit/src/query/endpointDefinitions';

export type UploadImageType = 1 | 2 | 3;

export interface IUploadedFile {
  id?: number;
  product_id?: number;
  producer_id?: number;
  image: File | null;
  type?: UploadImageType;
}

export interface IUploadImageProps {
  id?: number
  title?: string;
  className?: string;
  type?: UploadImageType;
  onFileUpload: (params: IUploadedFile) => QueryActionCreatorResult<QueryDefinition>;
  hasError?: boolean;
  handleFileRemove?: (id: number) => QueryActionCreatorResult<QueryDefinition>;
  url?: string
  product_id?: number;
  isProducer?: boolean;
  connectId?: number
}
