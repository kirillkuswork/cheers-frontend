import { Tooltip } from 'antd/lib';
import { FC } from 'react';
import { TooltipProps } from 'antd/es/tooltip';

export type CustomTooltipProps = {
  isInverted?: boolean;
} & TooltipProps;

export const CustomTooltip: FC<CustomTooltipProps> = ({
  isInverted,
  title,
  children,
  ...props
}) => {
  const color = isInverted ? '#262626' : '#FFFFFF';
  return (
    <Tooltip
      overlayInnerStyle={{
        color: isInverted ? '#FFFFFF' : '#262626',
        padding: '12px 16px',
        borderRadius: '12px',
        fontSize: '12px',
        lineHeight: '20px',
      }}
      title={title}
      color={color}
      key={color}
      {...props}
    >
      {children}
    </Tooltip>
  );
};
