import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  className?: string;
  /** Label */
  label: React.ReactNode;
  show?: boolean;
  suffix?: React.ReactNode;
}>;

const SettingItem: FC<Props> = ({ children, className, label, show = true, suffix }: Props) => {
  if (!show) return null;

  return (
    <div className={clsx('w-full flex-y-center justify-between', className)}>
      <div>
        <span className="pr-8px text-base-text">{label}</span>
        {suffix}
      </div>
      {children}
    </div>
  );
};

export default SettingItem;
