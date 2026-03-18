import { ReactNode } from 'react';
import { Header } from '@/admin/components/Header';
import styles from './styles.module.scss';

export const AdminLayout = ({ children }: { children: ReactNode }) => (
  <div className={styles.layout}>
    <Header />
    {children}
  </div>
);
