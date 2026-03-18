import Link from 'next/link';
import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.scss';
import { ArrowIcon } from './icons';
import { IBreadCrumbsProps } from './types';

function BreadCrumbs({
  crumbs = [],
  className,
}: IBreadCrumbsProps) {
  return (
    <div className={clsx(styles.wrapper, className)}>
      {crumbs.map(({ title, href }, index) => (
        href && index !== crumbs.length - 1
          ? (
            // Если есть href и элемент не последний, то отдаем Link со стрелкой
            <React.Fragment key={title}>
              <Link
                className={styles.link}
                href={href}
              >
                {title}
              </Link>
              <div className={styles.arrow}>
                <ArrowIcon />
              </div>
            </React.Fragment>
          ) : (
            // Если элемент последний, то отдаем просто текст
            <span key={title} className={styles.text}>
              {title}
            </span>
          )))}
    </div>
  );
}

export default BreadCrumbs;

// Пример передаваемого объекта с крошками

// const CRUMBS = {
//   crumbs: [
//     {
//       text: 'Главная',
//       href: '/',
//     },
//     {
//       text: 'Товары',
//       href: '/products',
//     },
//     {
//       text: {category},
//       href: `/products/${category}`,
//     },
//   ],
// };
