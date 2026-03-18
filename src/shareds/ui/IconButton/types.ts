import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface IIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  variant?: 'secondary' | 'tertiary';
  size?: 'small' | 'large';
}
