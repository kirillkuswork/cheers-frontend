import { createContext, FC, useContext } from 'react';
import clsx from 'clsx';
import { ITabProps, ITabsContextType } from '@/admin/components/Tab/types';
import styles from './styles.module.scss';

export const TabContext = createContext({} as ITabsContextType);

export const Tab: FC<ITabProps> = ({
  value,
  label,
  size = 'm',
  isDisabled,
}) => {
  const context = useContext(TabContext);
  const handleClick = () => {
    context.onTabChange?.(value!);
  };

  const classes = clsx(
    styles.tab,
    context.value === value && styles.active,
    styles[`tab_${size}`],
    isDisabled && styles.disabled,
  );

  return (
    <button
      disabled={isDisabled}
      onClick={handleClick}
      className={classes}
      type="button"
    >
      {label}
    </button>
  );
};
