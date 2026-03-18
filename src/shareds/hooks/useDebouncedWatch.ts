import { useEffect, useRef } from 'react';
import { useFormContext, useWatch, FieldValues } from 'react-hook-form';

interface UseDebouncedWatchProps<T extends FieldValues> {
  onSubmit: (data: T) => void;
  debounceTime?: number;
  isEnabled?: boolean;
}

export const useDebouncedWatch = <T extends FieldValues>({
  onSubmit,
  debounceTime = 600,
  isEnabled,
}: UseDebouncedWatchProps<T>) => {
  const formContext = useFormContext<T>();
  if (!formContext) {
    throw new Error('useDebouncedWatch must be used within a FormProvider');
  }
  const { control, handleSubmit } = formContext;
  const watchedFields = useWatch({ control });
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const previousWatchedFields = useRef(watchedFields);
  useEffect(() => {
    if (!isEnabled) return;
    const hasFiltersChanged = JSON.stringify(previousWatchedFields.current) !== JSON.stringify(watchedFields);
    if (hasFiltersChanged) {
      previousWatchedFields.current = watchedFields;
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        handleSubmit(onSubmit)();
      }, debounceTime);
    }
  }, [watchedFields, isEnabled, debounceTime, handleSubmit, onSubmit]);
  useEffect(() => () => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
  }, []);
  useEffect(() => {
    // ToDo Временное решение, нужно снести весь хук
    if (isEnabled && debounceTimeout.current) clearTimeout(debounceTimeout.current);
  }, [isEnabled]);
  return { control, handleSubmit };
};
