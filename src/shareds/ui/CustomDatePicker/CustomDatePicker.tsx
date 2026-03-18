import React, { FC, useState } from 'react';
import { DatePicker } from 'antd/lib';
import { IMainInputProps, MainInput } from '@/shareds/ui/MainInput';
import { convertTimestampToISOString, formatTimestampToDate } from '@/helpres/formatTime';

interface ICustomDatePickerProps
  extends Omit<IMainInputProps, 'onChange' | 'value'> {
  value: string;
  onChange?: (dateString: string) => void;
}

export const CustomDatePicker: FC<ICustomDatePickerProps> = ({
  value,
  onChange,
  label,
  error,
  errorMsg,
  containerClassName,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const handleDateChange = (date: string) => {
    onChange?.('' || convertTimestampToISOString(date));
    setOpen(false);
  };

  return (
    <div className={containerClassName}>
      <DatePicker
        open={open}
        size="small"
        value={null}
        onChange={handleDateChange}
        inputReadOnly
        style={{
          visibility: 'hidden', position: 'absolute',
        }}
      />
      <MainInput
        {...props}
        value={value ? formatTimestampToDate(value) : ''}
        label={label}
        error={error}
        errorMsg={errorMsg}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      />
    </div>
  );
};
