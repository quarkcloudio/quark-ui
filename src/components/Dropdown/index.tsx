import React from 'react';
import Render from '@/components/Render';
import Action from '@/components/Action/Action';
import { Menu as BaseMenu, Dropdown as BaseDropdown,Button } from 'antd';
import { tplEngine } from '@/utils/template';

import {
  DownOutlined,
  createFromIconfontCN,
} from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js',
});
const { SubMenu, ItemGroup, Item, Divider } = BaseMenu;

const Dropdown: React.FC<any> = (props:any) => {

  // 渲染组件
  const menuItemRender = (item:any) => {

    let component = null;

    if (item.component === 'menuSubMenu') {
      component = (
        <SubMenu key={item.key} icon={props.icon ? <IconFont type={props.icon} /> : false} title={item.title}>
          {componentRender(item.items)}
        </SubMenu>
      );
    }

    if (item.component === 'menuItemGroup') {
      component = (
        <ItemGroup key={item.key} title={item.title}>
          {componentRender(item.items)}
        </ItemGroup>
      );
    }

    if (item.component === 'menuItem') {
      component = (
        <Item key={item.key} icon={props.icon ? <IconFont type={props.icon} /> : false}>
          <Action
            {...item}
            data={{ ...props.data }}
            callback={props.callback}
          />
        </Item>
      );
    }

    if (item.component === 'menuDivider') {
      component = <Divider {...item} />;
    }

    return component;
  };

  // 渲染组件
  const componentRender = (items:any) => {

    let component = items.map((item: any) => {
      return menuItemRender(item);
    })

    return component;
  };

  const overlay = (
    <BaseMenu
      defaultOpenKeys={props.overlay.defaultOpenKeys}
      defaultSelectedKeys={props.overlay.defaultSelectedKeys}
      inlineIndent={props.overlay.inlineIndent}
      mode={props.overlay.mode}
      multiple={props.overlay.multiple}
      selectable={props.overlay.selectable}
      style={props.overlay.style ? props.overlay.style : undefined}
      subMenuCloseDelay={props.overlay.subMenuCloseDelay}
      subMenuOpenDelay={props.overlay.subMenuOpenDelay}
      theme={props.overlay.theme}
      triggerSubMenuAction={props.overlay.triggerSubMenuAction}
    >
      {props.overlay.items ? componentRender(props.overlay.items) : null}
    </BaseMenu>
  );

  return (
    <BaseDropdown {...props} overlay={overlay}>
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
}

export default Dropdown;