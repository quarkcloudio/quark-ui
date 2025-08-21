import classNames from 'clsx';
import React from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const SimpleScrollbar = ({
  children,
  className
}: {
  readonly children: React.ReactNode;
  readonly className?: string;
}) => {
  return (
    <div className={classNames('h-full flex-1-hidden', className)}>
      <SimpleBar className="h-full">{children}</SimpleBar>
    </div>
  );
};

export default SimpleScrollbar;
