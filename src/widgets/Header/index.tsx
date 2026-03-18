import { useCallback, useState } from 'react';
import clsx from 'clsx';
import { TopNavigation } from '@/widgets/Header/TopNavigation';
import { MainBlock } from '@/widgets/Header/MainBlock';
import { MobileNavigation } from '@/widgets/Header/MobileNavigation';
import styles from './styles.module.scss';

function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const openMenuHandler = useCallback(() => setShowMenu(!showMenu), [showMenu]);
  const openModalHandler = useCallback(() => setOpenModal(!openModal), [openModal]);

  return (
    <>
      <header
        className={clsx(styles.header, !showHeader && styles.headerHidden)}
      >
        <div className={styles.inner}>
          <TopNavigation />
          <MainBlock
            showMenu={showMenu}
            openModal={openModal}
            setShowMenu={openMenuHandler}
            setShowHeader={setShowHeader}
            setOpenModal={openModalHandler}
          />
        </div>
      </header>
      {showMenu && (
        <MobileNavigation
          setOpenModal={openModalHandler}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
        />
      )}
    </>
  );
}

export default Header;
