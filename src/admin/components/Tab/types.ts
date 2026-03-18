import { HTMLAttributes, ReactNode } from 'react';

export interface ITabProps extends HTMLAttributes<HTMLButtonElement> {
  onTabChange?: (tabValue: number) => void,
  value: number | null,
  label: string
  option?: string;
  size?: 'm' | 's'
  isDisabled?: boolean
}

export interface ITabsGroupProps {
  value?: number | null,
  children: ReactNode
  onTabChange?: ITabProps['onTabChange'],
}

export interface ITabsContextType {
  value: ITabProps['value'];
  onTabChange: ITabProps['onTabChange'];
}
