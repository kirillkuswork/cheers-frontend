// eslint-disable-next-line import/no-extraneous-dependencies
import camelcaseKeys from 'camelcase-keys';

// Утилита для преобразования ключей объекта в кэмелкейс с использованием дженериков
export const camelCaseKeys = <T extends Record<string, unknown> | readonly Record<string, unknown>[]>(
  obj: T,
): T => camelcaseKeys(obj, { deep: true }) as T;
