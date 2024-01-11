import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import type { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

export interface IconExtendProps {
  extraCommonProps?: any;
  scriptUrl?: string;
  type?: string;
}

const Icon: React.FC<
  IconComponentProps & React.RefAttributes<HTMLDivElement> & IconExtendProps
> = (props) => {
  const { scriptUrl, extraCommonProps, className, height, style, width, type } =
    { ...props };
  const IconFont = createFromIconfontCN({
    extraCommonProps: extraCommonProps,
    scriptUrl: scriptUrl ?? '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js',
  });

  return (
    <IconFont
      className={className}
      height={height}
      style={style}
      width={width}
      type={type ?? ''}
    />
  );
};

export default Icon;
