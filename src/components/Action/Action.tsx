import React, { useState } from 'react';
import { history } from 'umi';
import { get } from '@/services/action';
import { dataMapping, tplEngine } from '@/utils/template';
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
  const showConfirm = async (api:any, actionType='ajax') => {
    switch (actionType) {
      case 'ajax':
        confirm({
          title: tplEngine(props.confirmTitle, props.data),
          icon: <ExclamationCircleOutlined />,
          content: tplEngine(props.confirmText, props.data),
          onOk() {
            executeAction(api);
          },
          onCancel() {
            console.log('Cancel');
          },
        });
        break;

      case 'submit':
        confirm({
          title: tplEngine(props.confirmTitle, props.data),
          icon: <ExclamationCircleOutlined />,
          content: tplEngine(props.confirmText, props.data),
          onOk() {
            api?.submit?.();
          },
          onCancel() {
            console.log('Cancel');
          },
        });
        break;

      case 'reset':
        confirm({
          title: tplEngine(props.confirmTitle, props.data),
          icon: <ExclamationCircleOutlined />,
          content: tplEngine(props.confirmText, props.data),
          onOk() {
            api?.resetFields();
          },
          onCancel() {
            console.log('Cancel');
          },
        });
        break;

      case 'back':
        confirm({
          title: tplEngine(props.confirmTitle, props.data),
          icon: <ExclamationCircleOutlined />,
          content: tplEngine(props.confirmText, props.data),
          onOk() {
            history.go(-1);
          },
          onCancel() {
            console.log('Cancel');
          },
        });
        break;

      default:
        confirm({
          title: tplEngine(props.confirmTitle, props.data),
          icon: <ExclamationCircleOutlined />,
          content: tplEngine(props.confirmText, props.data),
          onOk() {
            executeAction(api);
          },
          onCancel() {
            console.log('Cancel');
          },
        });
        break;
    }
  }

  // 执行行为
  const executeAction = async (api:string) => {
    const result = await get({
      actionUrl: dataMapping(api,props.data)
    });

    if(result.status === 'success') {

      if(props.callback) {
        props.callback()
      }

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
  }

  let component = null;

  switch (props.actionType) {
    case 'ajax':
      if(props.confirmType === 'pop') {
        component =
        <Popconfirm
          placement="topRight"
          title={tplEngine(props.confirmTitle,props.data)}
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
            icon={props.icon ? <IconFont type={props.icon} /> : false}
          >
            {tplEngine(props.label,props.data)}
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
          icon={props.icon ? <IconFont type={props.icon} /> : false}
          onClick={()=>{ props.confirmTitle ? showConfirm(props.api) : executeAction(props.api)}}
        >
          {tplEngine(props.label,props.data)}
        </Button>
      }
      break;

      case 'submit':
        if(props.confirmType === 'pop') {
          component =
          <Popconfirm
            placement="topRight"
            title={tplEngine(props.confirmTitle,props.data)}
            onConfirm={()=>{props.form?.submit?.()}}
          >
            <Button
              block={props.block}
              danger={props.danger}
              disabled={props.disabled}
              ghost={props.ghost}
              shape={props.shape}
              size={props.size}
              type={props.showStyle}
              icon={props.icon ? <IconFont type={props.icon} /> : false}
            >
              {tplEngine(props.label,props.data)}
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
            icon={props.icon ? <IconFont type={props.icon} /> : false}
            onClick={()=>{ props.confirmTitle ? showConfirm(props.form, props.actionType) : props.form?.submit?.()}}
          >
            {tplEngine(props.label,props.data)}
          </Button>
        }
        break;

      case 'reset':
        if(props.confirmType === 'pop') {
          component =
          <Popconfirm
            placement="topRight"
            title={tplEngine(props.confirmTitle,props.data)}
            onConfirm={()=>{props.form?.resetFields()}}
          >
            <Button
              block={props.block}
              danger={props.danger}
              disabled={props.disabled}
              ghost={props.ghost}
              shape={props.shape}
              size={props.size}
              type={props.showStyle}
              icon={props.icon ? <IconFont type={props.icon} /> : false}
            >
              {tplEngine(props.label,props.data)}
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
            icon={props.icon ? <IconFont type={props.icon} /> : false}
            onClick={()=>{ props.confirmTitle ? showConfirm(props.form, props.actionType) : props.form?.resetFields()}}
          >
            {tplEngine(props.label,props.data)}
          </Button>
        }
        break;

      case 'back':
        if(props.confirmType === 'pop') {
          component =
          <Popconfirm
            placement="topRight"
            title={tplEngine(props.confirmTitle,props.data)}
            onConfirm={()=>{ history.go(-1) }}
          >
            <Button
              block={props.block}
              danger={props.danger}
              disabled={props.disabled}
              ghost={props.ghost}
              shape={props.shape}
              size={props.size}
              type={props.showStyle}
              icon={props.icon ? <IconFont type={props.icon} /> : false}
            >
              {tplEngine(props.label,props.data)}
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
            icon={props.icon ? <IconFont type={props.icon} /> : false}
            onClick={()=>{ props.confirmTitle ? showConfirm(null, props.actionType) : history.go(-1)}}
          >
            {tplEngine(props.label,props.data)}
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
          href={dataMapping(props.href,props.data)}
          target={props.target}
          type={props.showStyle}
          icon={props.icon ? <IconFont type={props.icon} /> : false}
        >
          {tplEngine(props.label,props.data)}
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
        icon={props.icon ? <IconFont type={props.icon} /> : false}
      >
        {tplEngine(props.label,props.data)}
      </Button>
      break;
  }

  return component;
}

export default Action;