/* eslint-disable no-unsafe-optional-chaining */
import { useEffect } from 'react';
import useBreakpoint from '@/shareds/hooks/useBreakpoint';
import styles from './styles.module.scss';
import { RoadmapItemProps } from './types';

function RoadmapItem({
  id,
  title,
  items,
  onCenter,
}: RoadmapItemProps) {
  const breakpoint = useBreakpoint();
  useEffect(() => {
    const halfHeight = window.innerHeight / 2;

    const onScroll = () => {
      const element = document.getElementById(title);
      const rect = element?.getBoundingClientRect();
      if (rect) {
        const viewportCenterTop = ((window.innerHeight / 2) - (rect.height / 2));
        const viewportCenterBot = ((window.innerHeight / 2) + (rect.height / 2));
        const elementTop = rect.top - 15;
        const elementBottom = rect.bottom;
        if (elementTop <= viewportCenterTop && viewportCenterBot <= elementBottom) {
          if (breakpoint !== 'xs') onCenter();
        }
      }
      if (rect?.top && breakpoint !== 'xs') {
        if (
          document.documentElement.scrollTop + halfHeight >= rect.top
          && document.documentElement.scrollTop + halfHeight <= rect.top + rect.height
        ) {
          onCenter();
        }
      }
    };

    if (breakpoint !== 'xs') {
      document.addEventListener('scroll', () => { onScroll(); });
    }

    return () => {
      document.removeEventListener('scroll', () => { onScroll(); });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakpoint]);

  return (
    <div className={`${styles.wrapper} ${id === 4 && styles.wrapperLast}`} id={title}>
      <div className={styles.title}>
        {title}
      </div>
      <div className={styles.items}>
        {items.map((item) => (
          <div className={styles.item} key={item}>
            <div className={styles.defis}>
              -
            </div>
            <div className={styles.text}>
              {item}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoadmapItem;
