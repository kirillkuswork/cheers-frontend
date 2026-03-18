import { Corner, ShareNetwork } from '@/shareds/assets/icons';
import { useState } from 'react';
import styles from './styles.module.scss';
import { CustomTooltip } from '../CustomTooltip';

export const ShareButton = () => {
  const [isTooltip, setIsTooltip] = useState(false);

  const handleCopyRoute = () => {
    navigator.clipboard.writeText(window.location.href);
    if (!isTooltip) {
      setIsTooltip(true);
      setTimeout(() => {
        setIsTooltip(false);
      }, 1000);
    }
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        onClick={handleCopyRoute}
        type="button"
      >
        <span className={styles.icon}>
          <ShareNetwork />
        </span>
        <span className={styles.label}>
          Поделиться
        </span>
      </button>

      {isTooltip && (
        <CustomTooltip className={styles.tooltip}>
          <div className={styles.tooltip__title}>
            Ссылка скопирована
          </div>
          <Corner className={styles.corner} />
        </CustomTooltip>
      )}
    </div>
  );
};
