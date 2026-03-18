/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FC } from 'react';
import { linkContentPrefix } from '@/helpres/scrollSlider';
import clsx from 'clsx';
import styles from './styles.module.scss';

interface SectionIndicatorsProps {
  links: string[];
  activeChapter: number
}

export const SectionIndicators: FC<SectionIndicatorsProps> = ({ links, activeChapter }) => (
  <div className={styles.wrapper}>
    {links.map((item, index) => (
      <div key={item} className={styles.indicators}>
        <div className={clsx(styles.indicator, activeChapter === index && styles.activeIndicator)} />
        <a
          href={`#${linkContentPrefix}${index}`}
          data-index={index}
          className={clsx(styles.text, activeChapter === index && styles.active)}
        >
          {item}
        </a>
      </div>
    ))}
  </div>
);
