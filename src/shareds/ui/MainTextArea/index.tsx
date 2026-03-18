/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  ChangeEvent, FC, ReactNode, useCallback, useState,
} from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { BaseTextArea, IBaseTextAreaProps, TextArea } from '../BaseTextArea';

export interface IMainTextAreaProps extends IBaseTextAreaProps {
  label: string;
  outerLabel?: string;
  errorMsg?: string;
  showClearButton?: boolean;
  icon?: ReactNode;
  onIconClick?: () => void;
  onContainerClick?: () => void;
  containerClassName?: string;
  inputSize?: 'm' | 'l' | 's';
  isFocused?: boolean;
}

export const MainTextArea: FC<IMainTextAreaProps> = ({
  label,
  outerLabel,
  value,
  onChange,
  error,
  errorMsg,
  mask,
  showClearButton,
  icon,
  onIconClick,
  onContainerClick,
  containerClassName,
  isFocused,
  inputSize = 'l',
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  const handleClear = () => {
    onChange?.({ target: { value: '' } } as ChangeEvent<HTMLTextAreaElement>);
  };
  const handleFocus = useCallback((param: boolean) => {
    setFocused(param);
  }, []);

  return (
    <div className={clsx(styles.wrapper, containerClassName)}>
      {outerLabel && <TextArea.OuterLabel>{outerLabel}</TextArea.OuterLabel>}
      <TextArea.Container
        onClick={onContainerClick}
        disabled={props.disabled}
        focused={focused || isFocused}
        error={error}
      >
        <TextArea.Inner>
          <BaseTextArea
            withLabel={inputSize !== 's'}
            mask={mask}
            value={value}
            onChange={onChange}
            setFocused={handleFocus}
            {...props}
          />
          <TextArea.Label disabled={props.disabled}>{label}</TextArea.Label>
        </TextArea.Inner>
        {showClearButton && value && (
          <TextArea.ClearButton
            disabled={props.disabled}
            handleClear={handleClear}
          />
        )}
        {icon && <TextArea.Icon className={styles.icon}>{icon}</TextArea.Icon>}
      </TextArea.Container>
      {error && <TextArea.ErrorLabel>{errorMsg}</TextArea.ErrorLabel>}
    </div>
  );
};
