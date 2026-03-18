import React, { FC, ReactNode } from 'react';

interface ISectionContentProps {
  children: ReactNode;
  className?: string;
}

export const SectionContent: FC<ISectionContentProps> = ({
  children,
  className,
}) => <div className={className}>{children}</div>;
