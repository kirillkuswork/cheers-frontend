import { useMemo } from 'react';
import { DonutItemInfo } from '@/entities/Product';
import { ArrayRender } from '@/shareds/utils/components';
import { IDonutSectionProps } from '@/widgets/Product/Donut/types';
import { Donut } from '@/widgets/Product';
import { TasteSliders } from '@/shareds/ui';
import styles from './styles.module.scss';

const colors = [
  '#F0146F',
  '#F75B69',
  '#FC8462',
  '#FFA859',
  '#FFCA4B',
  '#FFEB37',
];

export const DonutSection = ({
  tasteNotes,
  addProps,
}: IDonutSectionProps) => {
  const tasteNotesWithColors = useMemo(
    () => tasteNotes?.map((note, index) => ({
      ...note,
      color: colors[index],
    })),
    [tasteNotes],
  );

  if (!tasteNotes) {
    return null;
  }

  const addPropsKeys = Object.keys(addProps || {});

  return (
    <div className={styles.wrapper}>
      <Donut className={styles.donut} data={tasteNotesWithColors} />
      <div className={styles.items}>
        <ArrayRender
          items={tasteNotesWithColors}
          renderItem={(item) => <DonutItemInfo key={item.name} {...item} />}
        />
      </div>
      {addPropsKeys.length > 0 && addProps && (
        <TasteSliders
          addPropsKeys={addPropsKeys.slice(1, 4)}
          data={addProps}
        />
      )}
    </div>
  );
};
