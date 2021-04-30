import React, { useState } from 'react';
import { history } from 'umi';
import { get } from '@/services/action';
import { parseTemplate } from '@/utils/template';
import {
  Button,
  message,
  Popconfirm,
  Modal
} from 'antd';
import {ExclamationCircleOutlined, createFromIconfontCN } from '@ant-design/icons';

const Action: React.FC<any> = (props) => {
  const IconFont = createFromIconfontCN({
    scriptUrl:'//at.alicdn.com/t/font_1615691_3pgkh5uyob.js'
  });

  const { confirm } = Modal;

  // 显示确认弹框
  const showConfirm = async (api:string) => {
    confirm({
      title: props.confirmTitle,
      icon: <ExclamationCircleOutlined />,
      content: props.confirmText,
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
    switch (props.actionType) {
      case 'ajax':
        const result = await get({
          actionUrl: parseTemplate(api,props.data)
        });

        if(result.status === 'success') {

          if(result.msg) {
            message.success(result.msg);
          }

          if(result.url) {
            history.push(result.url);
          }

          if(props.redirect) {
            history.push(props.redirect);
          }

          if(props.reload) {
            if(props.reload === 'window') {
              location.reload();
            } else {
              window[props.reload]?.current?.reload();
            }
          }
        } else {
          message.error(result.msg);
        }
        break;
    
      default:
        break;
    }
  }

  let component = null;

  switch (props.actionType) {
    case 'ajax':
      if(props.confirmType === 'pop') {
        component =
        <Popconfirm
          placement="topRight"
          title={props.confirmTitle}
          onConfirm={()=>{executeAction(props.api)}}
        >
          <Button
            block={props.block}
            danger={props.danger}
            disabled={props.disabled}
            ghost={props.ghost}
            shape={props.shape}
            size={props.size}
            type={props.showStyle}
            icon={props.icon ? <IconFont type={props.icon} /> : null}
          >
            {props.label}
          </Button>
        </Popconfirm>
      } else {
        component =
        <Button
          block={props.block}
          danger={props.danger}
          disabled={props.disabled}
          ghost={props.ghost}
          shape={props.shape}
          size={props.size}
          type={props.showStyle}
          icon={props.icon ? <IconFont type={props.icon} /> : null}
          onClick={()=>{ props.confirmTitle ? showConfirm(props.api) : executeAction(props.api)}}
        >
          {props.label}
        </Button>
      }
      break;

      case 'link':
        component =
        <Button
          block={props.block}
          danger={props.danger}
          disabled={props.disabled}
          ghost={props.ghost}
          shape={props.shape}
          size={props.size}
          href={props.href}
          target={props.target}
          type={props.showStyle}
          icon={props.icon ? <IconFont type={props.icon} /> : null}
        >
          {props.label}
        </Button>
      break;
    default:
      component =
      <Button
        block={props.block}
        danger={props.danger}
        disabled={props.disabled}
        ghost={props.ghost}
        shape={props.shape}
        size={props.size}
        type={props.showStyle}
        icon={props.icon ? <IconFont type={props.icon} /> : null}
      >
        {props.label}
      </Button>
      break;
  }

  return component;
}

export default Action;