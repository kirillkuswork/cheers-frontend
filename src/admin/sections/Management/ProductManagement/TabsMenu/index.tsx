import React, { FC, useCallback } from 'react';
import { TabsGroup } from '@/admin/components/TabsGroup';
import { Button } from '@/shareds';
import { ITabsGroupProps } from '@/admin/components/Tab/types';
import { useActions } from '@/shareds/hooks/useActions';
import { adminActions } from '@/redux/actions/adminActions';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';

interface ITabsMenuProps extends Omit<ITabsGroupProps, 'children'> {}

export const TabsMenu: FC<ITabsMenuProps> = ({ value, onTabChange }) => {
  const { setAddPartnerOfferModalOpen } = useActions(adminActions);
  const router = useRouter();
  const isEditMode = !!router?.query?.id;

  const options = [
    { label: 'Карточка товара', value: 1, isDisabled: false },
    { label: 'Предложения партнеров', value: 2, isDisabled: !isEditMode },
  ];

  const setAddPartnerOfferModalOpenHandler = useCallback(() => {
    setAddPartnerOfferModalOpen(true);
  }, [setAddPartnerOfferModalOpen]);

  return (
    <div className={styles.wrapper}>
      <TabsGroup.Wrapper onTabChange={onTabChange} value={value}>
        {options.map((option) => (
          <TabsGroup.Item key={option.value} {...option} />
        ))}
      </TabsGroup.Wrapper>

      {value === 2 && (
        <Button
          onClick={setAddPartnerOfferModalOpenHandler}
          label="Добавить предложение"
        />
      )}
    </div>
  );
};
