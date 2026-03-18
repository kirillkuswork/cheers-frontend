/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {
  ChangeEvent,
  forwardRef,
  ReactNode,
  useCallback,
  useState,
} from 'react';
import { Input } from '@/shareds';
import { IBaseInputProps } from '@/shareds/ui/BaseInput';
import clsx from 'clsx';
import { BaseSkeleton } from '@/shareds/ui/Skeletons/BaseSkeleton';
import styles from './styles.module.scss';

export interface IMainInputProps extends IBaseInputProps {
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
  isLoading?: boolean;
}

export const MainInput = forwardRef<HTMLInputElement, IMainInputProps>(
  (
    {
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
      isLoading,
      inputSize = 'l',
      inputRef,
      setFocused: onFocused,
      ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);

    const handleClear = () => {
      onChange?.({ target: { value: '' } } as ChangeEvent<HTMLInputElement>);
    };
    const handleFocus = useCallback((param: boolean) => {
      setFocused(param);
      onFocused?.(param);
    }, [onFocused]);

    const containerClickHandler = useCallback(() => {
      onContainerClick?.();
    }, [onContainerClick]);

    if (isLoading) {
      return (
        <div className={clsx(styles.wrapper)}>
          <BaseSkeleton
            isAnimation
            className={clsx(styles.skeleton, styles[`skeleton_${inputSize}`])}
          />
        </div>
      );
    }

    return (
      <div className={clsx(styles.wrapper, containerClassName)}>
        {outerLabel && <Input.OuterLabel>{outerLabel}</Input.OuterLabel>}
        <Input.Container
          onClick={containerClickHandler}
          disabled={props.disabled}
          focused={focused || isFocused}
          error={error}
        >
          <Input.Inner>
            <Input.BaseInput
              withLabel={inputSize !== 's'}
              mask={mask}
              value={value}
              onChange={onChange}
              setFocused={handleFocus}
              ref={ref}
              inputRef={inputRef}
              {...props}
            />
            <Input.Label disabled={props.disabled}>{label}</Input.Label>
          </Input.Inner>
          {showClearButton && !!value && (
            <Input.ClearButton
              disabled={props.disabled}
              handleClear={handleClear}
            />
          )}
          {icon && <Input.Icon className={styles.icon}>{icon}</Input.Icon>}
        </Input.Container>
        {error && <Input.ErrorLabel>{errorMsg}</Input.ErrorLabel>}
      </div>
    );
  },
);

MainInput.displayName = 'MainInput';
