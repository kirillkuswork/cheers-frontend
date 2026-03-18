import { ArrayRender } from '@/shareds/utils/components';
import { PATHS } from '@/shareds/consts/baseConts';
import Link from 'next/link';
import { SearchWrapper } from '../SearchWrapper';
import { ProductSearchItem } from './ProductSearchItem';
import styles from './styles.module.scss';
import { ProductSearchEmpty } from './ProductSearchEmpty';
import { IDropdownSearchProps } from '../types';
import { SearchSuggestionsSkeleton } from '../../Skeletons/SearchSuggestionsSkeleton';

interface IProductSearch extends Omit<IDropdownSearchProps, 'searchValue'> { }

export const ProductSearch = ({
  onClose,
  data,
  isLoading,
  isError,
}: IProductSearch) => {
  // const dispatch = useDispatch();

  const showDummy = data?.length === 0 || isError;
  const showSkeletons = isLoading;

  // Очистка кеша запроса на анмаунт компонента
  // useEffect(() => () => {
  //   dispatch(searchApi.util.resetApiState());
  // }, [dispatch]);

  if (!data) {
    return null;
  }

  if (showSkeletons) {
    return (
      <SearchWrapper>
        <SearchSuggestionsSkeleton />
      </SearchWrapper>
    );
  }

  if (showDummy) {
    return <ProductSearchEmpty />;
  }

  return (
    <SearchWrapper>
      <ArrayRender
        items={data}
        renderItem={(item) => (
          <Link
            key={item.id}
            href={`${PATHS.products}/${item.id}`}
            className={styles.link}
            onClick={onClose}
          >
            <ProductSearchItem props={item} />
          </Link>
        )}
      />
    </SearchWrapper>
  );
};
