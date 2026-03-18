import { SearchWrapper } from '../../SearchWrapper';
import styles from './styles.module.scss';

export const ProductSearchEmpty = () => (
  <SearchWrapper className={styles.wrapper}>
    <div className={styles.title}>
      По вашему запросу ничего не найдено
    </div>
    <div className={styles.subtitle}>
      Попробуйте поискать по другим ключевым словам или перейдите в каталог
    </div>
  </SearchWrapper>
);
