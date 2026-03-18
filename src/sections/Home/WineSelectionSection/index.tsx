/* eslint-disable import/no-cycle */
import { ContentWrapper } from '@/shareds/ui';
import ArrayRender from '@/shareds/utils/components/ArrayRender';
import React, { FC, useCallback, useState } from 'react';
import { WINE_SELECTION_ITEMS } from '@/sections/Home/WineSelectionSection/constants';
import clsx from 'clsx';
import Image from 'next/image';
import { WineBySituationModal } from '@/widgets/Quiz';
import { ISelectionCard } from '@/sections/Home/WineSelectionSection/SelectionCard/types';
import { RuAnalogsModal } from '@/widgets/Quiz/RuAnalogsModal';
import { SelectionCard } from './SelectionCard';
import styles from './styles.module.scss';

export interface IWineSelectionSectionProps {}

export const WineSelectionSection: FC<IWineSelectionSectionProps> = () => {
  const [openWineBySituationModal, setOpenWineBySituationModal] = useState(false);
  const [openRuAnalogsModal, setOpenRuAnalogsModal] = useState(false);

  const openModalsHandler = useCallback((id: string) => {
    if (id === '1') {
      setOpenWineBySituationModal(true);
    } else {
      setOpenRuAnalogsModal(true);
    }
  }, [setOpenWineBySituationModal, setOpenRuAnalogsModal]);

  const selectionCardRender = useCallback(({ id, title, img }: ISelectionCard) => (
    <SelectionCard
      onClick={() => openModalsHandler(id!)}
      className={styles.card}
      key={id}
      title={title}
      img={img}
    >
      <div className={clsx(styles.imgWrapper, id === '1' && styles.firstImgWrapper)}>
        <Image className={clsx(styles.img, id === '1' && styles.firstImg)} fill src={img} alt={title!} />
      </div>
    </SelectionCard>
  ), [openModalsHandler]);

  return (
    <>
      <ContentWrapper className={styles.inner} title="Подобрать вино">
        <ArrayRender
          items={WINE_SELECTION_ITEMS}
          renderItem={selectionCardRender}
        />
      </ContentWrapper>

      <WineBySituationModal isOpen={openWineBySituationModal} onClose={() => setOpenWineBySituationModal(false)} />
      <RuAnalogsModal isOpen={openRuAnalogsModal} onClose={() => setOpenRuAnalogsModal(false)} />
    </>
  );
};
