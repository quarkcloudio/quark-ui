import React from 'react';
import Action from '@/components/Action/Action';
import { Menu as BaseMenu } from 'antd';
import {
  createFromIconfontCN,
} from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js',
});
const { SubMenu, ItemGroup, Item, Divider } = BaseMenu;

const Menu: React.FC<any> = (props:any) => {

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

  return (
    <BaseMenu
      defaultOpenKeys={props.defaultOpenKeys}
      defaultSelectedKeys={props.defaultSelectedKeys}
      inlineIndent={props.inlineIndent}
      mode={props.mode}
      multiple={props.multiple}
      selectable={props.selectable}
      style={props.style ? props.style : undefined}
      subMenuCloseDelay={props.subMenuCloseDelay}
      subMenuOpenDelay={props.subMenuOpenDelay}
      theme={props.theme}
      triggerSubMenuAction={props.triggerSubMenuAction}
    >
      {props.items ? componentRender(props.items) : null}
    </BaseMenu>
  );
}

export default Menu;