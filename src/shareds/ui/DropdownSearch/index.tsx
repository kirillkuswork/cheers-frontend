/* eslint-disable react/jsx-no-useless-fragment */
import {
  FC,
} from 'react';
import { HistorySearch } from './HistorySearch';
import { ProductSearch } from './ProductSearch';
import { IDropdownSearchProps } from './types';

export const DropdownSearch: FC<IDropdownSearchProps> = ({
  data,
  isLoading,
  onClose,
  searchValue,
  isError,
}) => (
  <>
    {searchValue.length >= 3 && (
      <ProductSearch
        onClose={onClose}
        data={data}
        isLoading={isLoading}
        isError={isError}
      />
    )}

    {searchValue.length < 3 && (
      <HistorySearch onClose={onClose} />
    )}
  </>
);
