import React from 'react';
import type { MenuProps } from 'antd';
import { Space, Dropdown, Avatar } from 'antd';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { setAlpha } from '@ant-design/pro-components';

export interface RightContentProps {
  avatar?: string | React.ReactNode;
  name?: string;
  menu?: MenuProps | undefined;
  style?: React.CSSProperties | undefined;
}

const RightContent: React.FC<RightContentProps> = (props) => {
  const { avatar, name, menu } = { ...props };
  const className = useEmotionCss(() => {
    return {
      display: 'flex',
      height: '48px',
      overflow: 'hidden',
      marginLeft: '0px',
      gap: 8,
    };
  });
  const nameClassName = useEmotionCss(({ token }) => {
    return {
      marginLeft: '8px',
      width: '70px',
      height: '48px',
      overflow: 'hidden',
      lineHeight: '48px',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      [`@media only screen and (max-width: ${token.screenMD}px)`]: {
        display: 'none',
      },
    };
  });
  const avatarClassName = useEmotionCss(({ token }) => {
    return {
      color: token.colorPrimary,
      verticalAlign: 'top',
      background: setAlpha(token.colorBgContainer, 0.85),
      [`@media only screen and (max-width: ${token.screenMD}px)`]: {
        margin: 0,
      },
    };
  });
  const actionClassName = useEmotionCss(({ token }) => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

  return (
    <Space align="center" className={className}>
      {(avatar || name) && (
        <Dropdown menu={menu}>
          <span className={actionClassName}>
            {avatar && (
              <Avatar size="small" className={avatarClassName} src={avatar} />
            )}
            {name && <span className={`${nameClassName} anticon`}>{name}</span>}
          </span>
        </Dropdown>
      )}
    </Space>
  );
};

export default RightContent;
