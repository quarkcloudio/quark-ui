import clsx from 'clsx';

import soybeanAvatar from '@/assets/imgs/soybean.jpg';

const SoybeanAvatar = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      {...props}
      className={clsx('size-72px  overflow-hidden rd-1/2', className)}
    >
      <img
        className="size-full"
        src={soybeanAvatar}
      />
    </div>
  );
};

export default SoybeanAvatar;
