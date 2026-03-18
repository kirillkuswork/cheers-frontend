/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useMemo } from 'react';

import { Button } from '@/shareds/ui';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';
import { TTabs } from '../types';
import { ArrowRight } from './icons';

interface IPropsPageHeadReview {
  activeTab: TTabs,
  isSmallTitle?: boolean,
  productId?: string,
  onChangeTab: (newTab: TTabs) => void
}

const variantCheck = (x: string, y: string): 'secondary' | 'quaternary' => (x === y ? 'secondary' : 'quaternary');

const PageHeadReview = ({
  activeTab, isSmallTitle, productId, onChangeTab,
}: IPropsPageHeadReview) => {
  const router = useRouter();
  const getVariantForExperts = useMemo(() => variantCheck(activeTab, 'experts'), [activeTab]);
  const getVariantForUsers = useMemo(() => variantCheck(activeTab, 'users'), [activeTab]);
  const handleRedirect = () => {
    if (!isSmallTitle || !productId) return;
    router.push(`${productId}/reviews`);
  };
  return (
    <div className={styles.pageHeadReview}>
      <div
        onClick={handleRedirect}
        className={clsx(
          {
            [styles.title]: true,
            [styles.smallTitle]: isSmallTitle,
          },
        )}
      >
        Оценки
        <ArrowRight />
      </div>
      <div className={styles.tabs}>
        <Button
          label="Эксперты"
          onClick={() => onChangeTab('experts')}
          variant={getVariantForExperts}
        />
        <Button
          label="Пользователи"
          onClick={() => onChangeTab('users')}
          variant={getVariantForUsers}
        />
      </div>
    </div>
  );
};

export default React.memo(PageHeadReview);
