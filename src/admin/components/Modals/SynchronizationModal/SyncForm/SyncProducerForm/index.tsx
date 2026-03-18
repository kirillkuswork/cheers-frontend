import React, { FC } from 'react';
import { Controller } from 'react-hook-form';
import { SearchInput } from '@/admin/components/SearchInput';
import { ISelectOption } from '@/admin/components/SearchInput/types';
import { useProducerList } from '@/shareds/hooks/useProducerList';
import { ISyncFormType } from '@/admin/components/Modals/SynchronizationModal/types';

interface ISyncProducerFormProps extends ISyncFormType {}

export const SyncProducerForm: FC<ISyncProducerFormProps> = ({
  control,
  errors,
}) => {
  const {
    producerList, isFetching, handleSearch, loadMoreProducers,
  } = useProducerList({
    query: null,
    pagination: { cursor: null, limit: 100 },
  });

  return (
    <Controller
      name="sync_producer_name"
      control={control}
      rules={{
        required: true,
      }}
      render={({ field }) => (
        <SearchInput
          {...field}
          isFetching={isFetching}
          onSearch={handleSearch}
          fetchMoreData={loadMoreProducers}
          onChange={(item) => {
            field.onChange(item?.value);
          }}
          options={producerList?.producers as ISelectOption[]}
          cursor={producerList?.pagination?.cursor}
          value={field?.value}
          label="Наименование производителя"
          error={!!errors.sync_producer_name}
          errorMsg="Обязательно к заполнению"
        />
      )}
    />
  );
};
