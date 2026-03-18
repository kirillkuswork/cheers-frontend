import { BlockingMessage } from '@/shareds/ui';
import { useRouter } from 'next/router';

interface ISearchBlockingMessageProps {
  dataLength: number | undefined,
  searchText: string | undefined,
  isFiltersError: boolean | undefined,
  isProductsError: boolean | undefined,
  isFiltersLoading: boolean | undefined,
  isProductsLoading: boolean | undefined,
}

function SearchBlockingMessage({
  dataLength,
  searchText,
  isFiltersError,
  isProductsError,
  isFiltersLoading,
  isProductsLoading,
}: ISearchBlockingMessageProps) {
  const router = useRouter();

  const handleToCatalog = () => {
    router.push('/');
  };

  const createBlockingMessage = () => {
    if (isFiltersError || isProductsError) {
      return <BlockingMessage />;
    }
    if ((dataLength === 0 || !searchText) && (!isFiltersLoading && !isProductsLoading)) {
      return (
        <BlockingMessage
          title="По вашему запросу ничего не найдено"
          subtitle="Попробуйте поискать по другим ключевым словам или перейдите в каталог"
          buttonLabel="В каталог"
          onClick={handleToCatalog}
        />
      );
    }
    return null;
  };

  return (
    <>
      {createBlockingMessage()}
    </>
  );
}

export default SearchBlockingMessage;
