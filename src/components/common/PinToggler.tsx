import React from 'react';

import ButtonIcon from '@/components/custom/ButtonIcon';
import SvgIcon from '@/components/custom/SvgIcon';

interface Props {
  className: string;
  onClick?: React.ComponentProps<'button'>['onClick'];
  pin?: boolean;
}
const PinToggler = ({ className, onClick, pin }: Props) => {
  const { t } = useTranslation();

  const icon = pin ? 'mdi-pin-off' : 'mdi-pin';
  return (
    <ButtonIcon
      triggerParent
      className={className}
      tooltipContent={pin ? t('icon.unpin') : t('icon.pin')}
      tooltipPlacement="bottomLeft"
      onClick={onClick}
    >
      <SvgIcon icon={icon} />
    </ButtonIcon>
  );
};

export default PinToggler;
