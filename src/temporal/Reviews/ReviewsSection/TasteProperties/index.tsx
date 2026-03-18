import { TasteSliders } from '@/shareds/ui';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import styles from './styles.module.scss';

export const TasteProperties = () => {
  const { activeProduct } = useSelector(selectors.productSelector);
  const addProps = activeProduct.additional_properties;
  const addPropsKeys = Object.keys(addProps || {}).filter((prop) => prop !== 'abv');
  if (!addProps) return null;
  const summ = addPropsKeys.reduce((acc, key) => acc + +(addProps[key] || 0), 0);
  if (!summ) return null;
  return (
    <div className={styles.taste}>
      <div className={styles.taste__heading}>
        <div className={styles.taste__title}>Вкусовые свойства</div>
        <div className={styles.taste__subtitle}>На основе оценок экспертов</div>
      </div>
      <TasteSliders
        addPropsKeys={addPropsKeys}
        data={addProps}
        className={styles.taste__sliders}
      />
    </div>
  );
};

export default TasteProperties;
