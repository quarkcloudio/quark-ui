import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown as BaseDropdown, Button } from 'antd';
import Action from '@/components/Action';
import tplEngine from '@/utils/template';
import { DownOutlined, createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js',
});

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const Dropdown: React.FC<any> = (props: any) => {
  // 渲染组件
  const menuItemRender = (item: any, index: number) => {
    let component = null;
    if (item.component === 'menuSubMenu') {
      component = getItem(
        item.title,
        index,
        props.icon && <IconFont type={props.icon} />,
        [...componentRender(item.items)],
      );
    }
    if (item.component === 'menuItemGroup') {
      component = getItem(
        item.title,
        index,
        null,
        [...componentRender(item.items)],
        'group',
      );
    }
    if (item.component === 'menuItem' || item.component === 'action') {
      component = getItem(
        <Action {...item} data={{ ...props.data }} callback={props.callback} />,
        index,
        props.icon && <IconFont type={props.icon} />,
      );
    }
    if (item.component === 'menuDivider') {
      component = { type: 'divider' };
    }

    return component;
  };

  // 渲染组件
  const componentRender = (items: any) => {
    let component = items.map((item: any, index: number) => {
      return menuItemRender(item, index);
    });

    return component;
  };

  return (
    <BaseDropdown
      {...props}
      menu={{
        defaultOpenKeys: props.menu.defaultOpenKeys,
        defaultSelectedKeys: props.menu.defaultSelectedKeys,
        inlineIndent: props.menu.inlineIndent,
        mode: props.menu.mode,
        multiple: props.menu.multiple,
        selectable: props.menu.selectable,
        style: props.menu.style,
        subMenuCloseDelay: props.menu.subMenuCloseDelay,
        subMenuOpenDelay: props.menu.subMenuOpenDelay,
        theme: props.menu.theme,
        triggerSubMenuAction: props.menu.triggerSubMenuAction,
        items: props.menu.items ? componentRender(props.menu.items) : null,
      }}
    >
      <Button
        style={props.style}
        block={props.block}
        danger={props.danger}
        disabled={props.disabled}
        ghost={props.ghost}
        shape={props.shape}
        size={props.size}
        type={props.type}
        icon={props.icon ? <IconFont type={props.icon} /> : false}
      >
        {tplEngine(props.label, props.data)}
        {props.arrow ? <DownOutlined /> : null}
      </Button>
    </BaseDropdown>
  );
};

export default Dropdown;
