import React from 'react';
import { ActionType }from '@ant-design/pro-table';
import { useModel, Link } from 'umi';
import { get } from '@/services/action';
import ModalForm from './ModalForm';
import DrawerForm from './DrawerForm';
import { stringify } from 'qs';
import {
  Button,
  Modal,
  Popconfirm,
  Dropdown,
  Menu,
  Space
} from 'antd';
import { ExclamationCircleOutlined, DownOutlined, createFromIconfontCN } from '@ant-design/icons';

export interface Action {
  onCleanSelected:any;
  selectedRowKeys:any;
  actions: {};
  current?: ActionType;
}

const BatchAction: React.FC<Action> = (props) => {
  const { initialState } = useModel('@@initialState');
  const IconFont = createFromIconfontCN({
    scriptUrl: initialState.settings.iconfontUrl,
  });
  const { confirm } = Modal;

  // 显示确认弹框
  const showConfirm = async (confirmInfo:any, api:string) => {
    confirm({
      title: confirmInfo.title,
      icon: <ExclamationCircleOutlined />,
      content: confirmInfo.content,
      onOk() {
        executeAction(api);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  // 替换查询变量
  const replaceQueryVariable = (url:any) => 
  {
    let query = {};
    var urls = url.split("?");
    if(urls) {
      var vars = urls[1].split("&");
      for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[1] === '{ids}' || pair[1] === '{id}'){
          pair[1] = props.selectedRowKeys;
        }
        query[pair[0]] = pair[1];
      }

      return urls[0]+'?'+stringify(query)
    }
    return url;
  }

  // 执行行为
  const executeAction = async (api:string) => {
    const result = await get({
      actionUrl: replaceQueryVariable(api)
    });

    if(result.status === 'success') {
      props.onCleanSelected();
      if (props.current) {
        props.current.reload();
      }
    }
  }

  // 获取menu
  const menu = (menus:any) => {
    return <Menu>{parseActions(menus)}</Menu>
  }

  // aStyle
  const aStyle = (item:any) => {
    let component = null;
    if(item.href) {
      item.href = replaceQueryVariable(item.href);
      // 跳转行为
      if(item.target === '_blank') {
        component = 
        <a key={item.key} href={item.href} target={item.target} style={item.style}>
          {item.name}
        </a>
      } else {
        component = 
        <Link key={item.key} style={item.style} to={item.href}>
          {item.name}
        </Link>
      }
    } else if(item.modal) {
      component = <ModalForm current={props.current} {...item} />
    } else if(item.drawer) {
      component = <DrawerForm current={props.current} {...item} />
    } else {
      // 执行操作行为
      component = 
      <a key={item.key} style={item.style} onClick={()=>{executeAction(item.api)}}>
        {item.name}
      </a>

      // 是否带确认
      if(item.confirm) {
        component = 
        <a key={item.key} style={item.style} onClick={()=>{showConfirm(item.confirm,item.api)}}>
          {item.name}
        </a>
      }

      // 带Popconfirm确认
      if(item.popconfirm) {
        component = 
        <Popconfirm
          key={item.key}
          placement="topRight"
          title={item.popconfirm.title}
          onConfirm={()=>{executeAction(item.api)}}
        >
          <a key={item.key} style={item.style}>
            {item.name}
          </a>
        </Popconfirm>
      }
    }
    return component;
  }

  // buttonStyle
  const buttonStyle = (item:any) => {
    let component = null;
    if(item.href) {
      item.href = replaceQueryVariable(item.href);
      if(item.target === '_blank') {
        component = 
        <Button
          key={item.key}
          type={item.type}
          block={item.block}
          danger={item.danger}
          disabled={item.disabled}
          ghost={item.ghost}
          shape={item.shape}
          size={item.size}
          icon={item.icon ? <IconFont type={item.icon} /> : null}
          href={item.href}
          target={item.target}
          style={item.style}
        >
          {item.name}
        </Button>
      } else {
        component = 
        <Link key={item.key} to={item.href}>
          <Button
            key={item.key}
            type={item.type}
            block={item.block}
            danger={item.danger}
            disabled={item.disabled}
            ghost={item.ghost}
            shape={item.shape}
            size={item.size}
            icon={item.icon ? <IconFont type={item.icon} /> : null}
            style={item.style}
          >
            {item.name}
          </Button>
        </Link>
      }
    } else if(item.modal) {
      component = <ModalForm current={props.current} {...item} />
    } else if(item.drawer) {
      component = <DrawerForm current={props.current} {...item} />
    } else {
      component = 
      <Button
        key={item.key}
        type={item.type}
        block={item.block}
        danger={item.danger}
        disabled={item.disabled}
        ghost={item.ghost}
        shape={item.shape}
        size={item.size}
        icon={item.icon ? <IconFont type={item.icon} /> : null}
        style={item.style}
        onClick={()=>{executeAction(item.api)}}
      >
        {item.name}
      </Button>

      if(item.confirm) {
        component = 
        <Button
          key={item.key}
          type={item.type}
          block={item.block}
          danger={item.danger}
          disabled={item.disabled}
          ghost={item.ghost}
          shape={item.shape}
          size={item.size}
          icon={item.icon ? <IconFont type={item.icon} /> : null}
          style={item.style}
          onClick={()=>{showConfirm(item.confirm,item.api)}}
        >
          {item.name}
        </Button>
      }

      // 带Popconfirm确认
      if(item.popconfirm) {
        component = 
        <Popconfirm
          key={item.key}
          placement="topRight"
          title={item.popconfirm.title}
          onConfirm={()=>{executeAction(item.api)}}
        >
          <Button
            key={item.key}
            type={item.type}
            block={item.block}
            danger={item.danger}
            disabled={item.disabled}
            ghost={item.ghost}
            shape={item.shape}
            size={item.size}
            icon={item.icon ? <IconFont type={item.icon} /> : null}
            style={item.style}
          >
            {item.name}
          </Button>
        </Popconfirm>
      }
    }
    return component;
  }

  // 解析actions
  const parseActions = (actions:any) => {
    let actionComponent:any = null;
    actionComponent = (
      actions.map((item:any,key:any) => {
        let component:any = null;
        switch (item.component) {
          case 'aStyle':
            component = aStyle(item);
            break;

          case 'buttonStyle':
            component = buttonStyle(item);
            break;
          case 'itemStyle':
            component = <Menu.Item key={item.key}>{aStyle(item)}</Menu.Item>;
            break;

          case 'dropdownStyle':
            if(item.mode === 'a') {
              component =
              <Dropdown key={item.key} overlay={menu(item.overlay)}>
                <a onClick={e => e.preventDefault()} style={item.style}>
                  {item.name} <DownOutlined />
                </a>
              </Dropdown>
            } else {
              component =
              <Dropdown key={item.key} overlay={menu(item.overlay)}>
                <Button>
                  {item.name} <DownOutlined />
                </Button>
              </Dropdown>
            }
            break;

          default:
            break;
        }
        return component;
      })
    )
    return actionComponent;
  }

  return (
    <Space>
      {parseActions(props.actions)}
    </Space>
  );
}

export default BatchAction;