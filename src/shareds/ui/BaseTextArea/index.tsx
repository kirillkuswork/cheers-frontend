/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  ChangeEvent,
  FC,
  forwardRef,
  HTMLAttributes, RefObject,
  FocusEvent,
  TextareaHTMLAttributes,
} from 'react';

import { Close } from '@/assets/icons';
import clsx from 'clsx';
import styles from './styles.module.scss';

export interface IBaseTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  error?: boolean;
  mask?: string;
  withLabel?: boolean;
  inputRef?: RefObject<HTMLTextAreaElement>;
  onClear?: () => void;
  setFocused?: (param: boolean) => void;
}

interface ITextAreaContainerProps
  extends Pick<IBaseTextAreaProps, 'error' | 'disabled'> {
  focused?: boolean;
  inputSize?: 'l' | 'm' | 's'
}
interface ITextAreaLabelProps extends Pick<IBaseTextAreaProps, 'disabled'> { }
interface IClearButtonProps extends Pick<IBaseTextAreaProps, 'disabled'> {
  handleClear: () => void;
}
interface IIconProps extends HTMLAttributes<HTMLDivElement> {
  onClick?: () => void;
}

const Container: FC<HTMLAttributes<HTMLDivElement> & ITextAreaContainerProps> = ({
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
    className={clsx(className, {
      [styles.container]: true,
      [styles[`container_${inputSize}`]]: inputSize,
      [styles.error]: error,
      [styles.focused]: focused,
      [styles.containerDisabled]: disabled,
    })}
  >
    {children}
  </div>
);

const Inner: FC<HTMLAttributes<HTMLDivElement>> = ({ className, children }) => (
  <div className={clsx(styles.inner, className)}>{children}</div>
);

const Label: FC<HTMLAttributes<HTMLDivElement> & ITextAreaLabelProps> = ({
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

const OuterLabel: FC<HTMLAttributes<HTMLDivElement> & ITextAreaLabelProps> = ({
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

const Icon: FC<IIconProps> = ({ onClick, children, className }) => (
  <span className={clsx(styles.icon, className)} onClick={onClick}>
    {children}
  </span>
);

export const BaseTextArea = forwardRef<HTMLDivElement, IBaseTextAreaProps>(
  (props) => {
    const {
      onChange,
      className,
      disabled,
      placeholder = '',
      withLabel,
      id,
      inputRef,
      maxLength,
      onFocus,
      onBlur,
      setFocused,
    } = props;
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(event);
    };

    const handleFocus = (event: FocusEvent<HTMLTextAreaElement>) => {
      onFocus?.(event);
      setFocused?.(true);
    };

    const handleBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
      onBlur?.(event);
      setFocused?.(false);
    };

    const classes = clsx(
      styles.input,
      withLabel ? styles.withLabel : styles.withoutLabel,
      className,
    );

    return (
      <textarea
        id={id}
        maxLength={maxLength}
        ref={inputRef}
        disabled={disabled}
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

BaseTextArea.displayName = 'BaseTextArea';

export const TextArea = {
  Container,
  Inner,
  Label,
  OuterLabel,
  ClearButton,
  BaseTextArea,
  ErrorLabel,
  Icon,
};
