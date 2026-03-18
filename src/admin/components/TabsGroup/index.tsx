import React, { FC } from 'react';
import { Tab, TabContext } from '@/admin/components/Tab';
import { ITabsGroupProps, ITabProps } from '@/admin/components/Tab/types';
import styles from './styles.module.scss';

export const Wrapper = ({
  value = null,
  onTabChange,
  children,
}: ITabsGroupProps) => {
  const state = React.useMemo(() => ({ value, onTabChange }), [value, onTabChange]);

  return (
    <div className={styles.tabsGroup}>
      <TabContext.Provider value={state}>
        {children}
      </TabContext.Provider>
    </div>
  );
};

const Item:FC<ITabProps> = (props) => <Tab {...props} />;

export const TabsGroup = {
  Wrapper,
  Item,
};
