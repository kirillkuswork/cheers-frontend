/* eslint-disable max-len */
import React, { FC, HTMLAttributes } from 'react';
import styles from './styles.module.scss';

export const ButtonsGroup: FC<HTMLAttributes<HTMLDivElement>> = ({ children }) => <div className={styles.buttonsGroup}>{children}</div>;
