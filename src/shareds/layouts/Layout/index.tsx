import Header from '@/widgets/Header';
import Footer from '@/widgets/Footer';
import styles from './styles.module.scss';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={styles.layout}
      id="layout"
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
