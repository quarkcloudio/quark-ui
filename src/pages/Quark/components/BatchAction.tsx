import React from 'react';
import { ActionType }from '@ant-design/pro-table';
import { Link } from 'umi';
import { get } from '@/services/action';
import { stringify } from 'qs';
import {
  Button,
  Modal,
  Popconfirm,
  Dropdown,
  Menu
} from 'antd';
import { ExclamationCircleOutlined, DownOutlined } from '@ant-design/icons';

export interface Action {
  onCleanSelected:any;
  selectedRowKeys:any;
  actions: {};
  current?: ActionType;
}

const BatchAction: React.FC<Action> = (props) => {
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

  // 执行行为
  const executeAction = async (api:string) => {
    let ids = {};
    ids['id'] = props.selectedRowKeys;
    api = api.replace('id={id}',stringify(ids));
    const result = await get({
      actionUrl: api
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
      let ids = {};
      ids['id'] = props.selectedRowKeys;
      item.href = item.href.replace('id={id}',stringify(ids));
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
      let ids = {};
      ids['id'] = props.selectedRowKeys;
      item.href = item.href.replace('id={id}',stringify(ids));
      if(item.target === '_blank') {
        component = 
        <Button key={item.key} type={item.type} href={item.href} target={item.target} style={item.style}>
          {item.name}
        </Button>
      } else {
        component = 
        <Button key={item.key} type={item.type} style={item.style}>
          <Link key={item.key} to={item.href}>
            {item.name}
          </Link>
        </Button>
      }
    } else {
      component = 
      <Button key={item.key} type={item.type} style={item.style} onClick={()=>{executeAction(item.api)}}
      >
        {item.name}
      </Button>

      if(item.confirm) {
        component = 
        <Button key={item.key} type={item.type} style={item.style} onClick={()=>{showConfirm(item.confirm,item.api)}}
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
          <Button key={item.key} type={item.type} style={item.style}>
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
            component =
            <Dropdown key={item.key} overlay={menu(item.overlay)}>
              <a onClick={e => e.preventDefault()}>
                {item.name} <DownOutlined />
              </a>
            </Dropdown>
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
    <>
    {parseActions(props.actions)}
    </>
  );
}

export default BatchAction;