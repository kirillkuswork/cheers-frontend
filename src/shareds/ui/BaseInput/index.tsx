/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {
  ChangeEvent, FC, FocusEvent, forwardRef, HTMLAttributes, InputHTMLAttributes, LegacyRef, RefObject,
} from 'react';

import { Close } from '@/assets/icons';
import clsx from 'clsx';
import InputMask from 'react-input-mask';
import { Spinner } from '@/shareds/ui/Spinner';
import styles from './styles.module.scss';

export interface IBaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  error?: boolean;
  mask?: string;
  withLabel?: boolean;
  inputRef?: RefObject<HTMLInputElement>;
  onClear?: () => void;
  setFocused?: (param: boolean) => void;
}

interface IInputContainerProps
  extends Pick<IBaseInputProps, 'error' | 'disabled'> {
  focused?: boolean;
  inputSize?: 'l' | 'm' | 's'
}
interface IInputLabelProps extends Pick<IBaseInputProps, 'disabled'> {}
interface IClearButtonProps extends Pick<IBaseInputProps, 'disabled'> {
  handleClear: () => void;
}
interface IIconProps extends HTMLAttributes<HTMLDivElement> {
  onClick?: () => void;
  disabled?: boolean
}

const Container: FC<HTMLAttributes<HTMLDivElement> & IInputContainerProps> = ({
  className,
  children,
  error,
  focused,
  disabled,
  inputSize,
  onClick,
}) => (
  <div
    onClick={onClick}
    className={clsx(
      styles.container,
      error && styles.error,
      focused && styles.focused,
      disabled && styles.containerDisabled,
      styles[`container_${inputSize}`],
      className,
    )}
  >
    {children}
  </div>
);

const Inner: FC<HTMLAttributes<HTMLDivElement>> = ({ className, children }) => (
  <div className={clsx(styles.inner, className)}>{children}</div>
);

const Label: FC<HTMLAttributes<HTMLDivElement> & IInputLabelProps> = ({
  className,
  disabled,
  children,
}) => (
  <div
    className={clsx(styles.label, disabled && styles.labelDisabled, className)}
  >
    {children}
  </div>
);

const OuterLabel: FC<HTMLAttributes<HTMLDivElement> & IInputLabelProps> = ({
  className,
  disabled,
  children,
}) => (
  <div
    className={clsx(styles.outerLabel, disabled && styles.labelDisabled, className)}
  >
    {children}
  </div>
);

const ErrorLabel: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
}) => <div className={clsx(styles.errorLabel, className)}>{children}</div>;

const ClearButton: FC<IClearButtonProps> = ({ handleClear, disabled }) => (
  <button
    disabled={disabled}
    aria-label="clear-button"
    type="button"
    className={clsx(styles.clearButton, disabled && styles.clearButtonDisabled)}
    onClick={handleClear}
  >
    <Close className={styles.clearButtonIcon} />
  </button>
);

const Icon: FC<IIconProps> = ({
  onClick, children, className, disabled,
}) => (
  <span className={clsx(styles.icon, className, disabled && styles.disabledIcon)} onClick={onClick}>
    {children}
  </span>
);

const Loader:FC<HTMLAttributes<HTMLDivElement>> = ({ className }) => (
  <div className={clsx(styles.loader, className)}>
    <Spinner />
  </div>
);

export const BaseInput = forwardRef<HTMLDivElement, IBaseInputProps>(
  (props, ref) => {
    const {
      onChange,
      className,
      mask,
      disabled,
      placeholder = '',
      withLabel,
      type = 'text',
      id,
      maxLength,
      onFocus,
      onBlur,
      setFocused,
      inputRef,
    } = props;
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
    };

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
      onFocus?.(event);
      setFocused?.(true);
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      onBlur?.(event);
      setFocused?.(false);
    };

    const classes = clsx(
      styles.input,
      withLabel ? styles.withLabel : styles.withoutLabel,
      className,
    );

    if (mask) {
      return (
        <InputMask
          placeholder={placeholder}
          className={classes}
          mask={mask!}
          maskChar=""
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      );
    }

    return (
      <input
        id={id}
        maxLength={maxLength}
        ref={ref as LegacyRef<HTMLInputElement> || inputRef}
        disabled={disabled}
        type={type}
        className={classes}
        onChange={handleChange}
        placeholder={placeholder}
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    );
  },
);

BaseInput.displayName = 'BaseInput';

export const Input = {
  Container,
  Inner,
  Label,
  OuterLabel,
  ClearButton,
  BaseInput,
  ErrorLabel,
  Icon,
  Loader,
};
