import { message } from 'antd/lib';
import { CheckCircle, WarningCircle } from '@/shareds/assets/icons';
import clsx from 'clsx';
import styles from './styles.module.scss';

message.config({
  maxCount: 1,
});

export const success = (content?: string) => {
  message.open({
    type: 'success',
    content: content || 'Успешное действие',
    icon: <CheckCircle />,
    className: clsx(styles.message, styles.success),
  });
};
export const warning = (content?: string) => {
  message.open({
    type: 'warning',
    content: content || 'Предупреждение',
    icon: <WarningCircle />,
    className: clsx(styles.message, styles.warning),
  });
};
export const error = (content?: string) => {
  message.open({
    type: 'error',
    content: content || 'Ошибка',
    className: clsx(styles.message, styles.error),
  });
};
