import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface IButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'extra-small' | 'small' | 'medium' | 'large';
}
