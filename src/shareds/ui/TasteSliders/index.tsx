import clsx from 'clsx';
import { ArrayRender } from '@/shareds/utils/components';
import styles from './styles.module.scss';
import { SliderItem } from './SliderItem';

interface ITasteSlidesProps {
  className?: string;
  addPropsKeys: string[];
  data: Record<string, unknown>;
}

export const TasteSliders = ({
  className,
  addPropsKeys,
  data,
}: ITasteSlidesProps) => (
  <div className={clsx(styles.slidersItems, className)}>
    <ArrayRender
      items={addPropsKeys}
      renderItem={(item) => (
        <SliderItem
          key={item}
          percent={data[item]}
          propKey={item}
        />
      )}
    />
  </div>
);

export default TasteSliders;
