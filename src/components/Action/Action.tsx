import React, { useState } from 'react';
import { history, useModel } from 'umi';
import { get } from '@/services/action';
import { tplEngine } from '@/utils/template';
import { reload } from '@/utils/reload';
import { Button, message, Popconfirm, Modal as AntModal } from 'antd';
import {
  ExclamationCircleOutlined,
  createFromIconfontCN,
} from '@ant-design/icons';
import Modal from './Modal';
import Drawer from './Drawer';
import Render from '@/components/Render';

const Action: React.FC<any> = (props) => {
  const { buttonLoadings, changeButtonLoadings } = useModel(
    'global',
    (model) => ({
      buttonLoadings: model.buttonLoadings,
      changeButtonLoadings: model.changeButtonLoadings,
    }),
  );
  //hack
  const [random, setRandom] = useState(0);
  const [submitResult, setSubmitResult] = useState(null);
  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js',
  });
  const formKey = props.submitForm ? props.submitForm : 'form';
  const { confirm } = AntModal;
  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  // 显示确认弹框
  const showConfirm = async (api: any, actionType = 'ajax') => {
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
            submit();
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
            window[formKey]?.resetFields?.();
          },
          onCancel() {
            console.log('Cancel');
          },
        });
        break;

      case 'cancel':
        confirm({
          title: tplEngine(props.confirmTitle, props.data),
          icon: <ExclamationCircleOutlined />,
          content: tplEngine(props.confirmText, props.data),
          onOk() {
            props?.callback?.();
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
  };

  // 提交表单
  const submit = async () => {
    
    window[formKey]?.submit?.();

    // hack
    await waitTime(1000);

    if (props.reload) {
      if (props.reload === 'window') {
        reload();
      } else {
        window[props.reload]?.current?.reload();
      }
    }
  };

  // 执行ajax行为
  const executeAction = async (api: string) => {
    buttonLoadings[props.componentKey] = true;
    changeButtonLoadings(buttonLoadings);
    setRandom(Math.random);

    const result = await get({
      actionUrl: tplEngine(api, props.data),
    });

    buttonLoadings[props.componentKey] = false;
    changeButtonLoadings(buttonLoadings);
    setRandom(Math.random);

    if (result.component === 'message') {
      if (result.status === 'success') {
        if (props.callback) {
          props.callback();
        }

        if (result.msg) {
          message.success(result.msg);
        }

        if (result.url) {
          history.push(result.url);
        }

        if (props.redirect) {
          history.push(props.redirect);
        }

        if (props.reload) {
          if (props.reload === 'window') {
            reload();
          } else {
            window[props.reload]?.current?.reload();
          }
        }
      } else {
        message.error(result.msg);
      }
    } else {
      setSubmitResult(result);
    }
  };

  let component = null;

  switch (props.actionType) {
    case 'ajax':
      if (props.confirmType === 'pop') {
        component = (
          <Popconfirm
            placement="topRight"
            title={tplEngine(props.confirmTitle, props.data)}
            onConfirm={() => {
              executeAction(props.api);
            }}
          >
            <Button
              loading={
                props.withLoading
                  ? buttonLoadings[props.componentKey]
                  : undefined
              }
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
            </Button>
          </Popconfirm>
        );
      } else {
        component = (
          <Button
            loading={
              props.withLoading ? buttonLoadings[props.componentKey] : undefined
            }
            style={props.style}
            block={props.block}
            danger={props.danger}
            disabled={props.disabled}
            ghost={props.ghost}
            shape={props.shape}
            size={props.size}
            type={props.type}
            icon={props.icon ? <IconFont type={props.icon} /> : false}
            onClick={() => {
              props.confirmTitle
                ? showConfirm(props.api)
                : executeAction(props.api);
            }}
          >
            {tplEngine(props.label, props.data)}
          </Button>
        );
      }
      break;

    case 'submit':
      if (props.confirmType === 'pop') {
        component = (
          <Popconfirm
            placement="topRight"
            title={tplEngine(props.confirmTitle, props.data)}
            onConfirm={() => {
              submit();
            }}
          >
            <Button
              loading={buttonLoadings[formKey]}
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
            </Button>
          </Popconfirm>
        );
      } else {
        component = (
          <Button
            loading={buttonLoadings[formKey]}
            style={props.style}
            block={props.block}
            danger={props.danger}
            disabled={props.disabled}
            ghost={props.ghost}
            shape={props.shape}
            size={props.size}
            type={props.type}
            icon={props.icon ? <IconFont type={props.icon} /> : false}
            onClick={() => {
              if (props.confirmTitle) {
                showConfirm(null, props.actionType);
              } else {
                submit();
              }
            }}
          >
            {tplEngine(props.label, props.data)}
          </Button>
        );
      }
      break;

    case 'reset':
      if (props.confirmType === 'pop') {
        component = (
          <Popconfirm
            placement="topRight"
            title={tplEngine(props.confirmTitle, props.data)}
            onConfirm={() => {
              window[formKey]?.resetFields?.();
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
            </Button>
          </Popconfirm>
        );
      } else {
        component = (
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
            onClick={() => {
              props.confirmTitle
                ? showConfirm(null, props.actionType)
                : window[formKey]?.resetFields?.();
            }}
          >
            {tplEngine(props.label, props.data)}
          </Button>
        );
      }
      break;

    case 'cancel':
      if (props.confirmType === 'pop') {
        component = (
          <Popconfirm
            placement="topRight"
            title={tplEngine(props.confirmTitle, props.data)}
            onConfirm={() => {
              props?.callback?.();
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
            </Button>
          </Popconfirm>
        );
      } else {
        component = (
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
            onClick={() => {
              props.confirmTitle
                ? showConfirm(null, props.actionType)
                : props?.callback?.();
            }}
          >
            {tplEngine(props.label, props.data)}
          </Button>
        );
      }
      break;

    case 'back':
      if (props.confirmType === 'pop') {
        component = (
          <Popconfirm
            placement="topRight"
            title={tplEngine(props.confirmTitle, props.data)}
            onConfirm={() => {
              history.go(-1);
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
            </Button>
          </Popconfirm>
        );
      } else {
        component = (
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
            onClick={() => {
              props.confirmTitle
                ? showConfirm(null, props.actionType)
                : history.go(-1);
            }}
          >
            {tplEngine(props.label, props.data)}
          </Button>
        );
      }
      break;

    case 'link':
      component = (
        <Button
          style={props.style}
          block={props.block}
          danger={props.danger}
          disabled={props.disabled}
          ghost={props.ghost}
          shape={props.shape}
          size={props.size}
          href={tplEngine(props.href, props.data)}
          target={props.target}
          type={props.type}
          icon={props.icon ? <IconFont type={props.icon} /> : false}
        >
          {tplEngine(props.label, props.data)}
        </Button>
      );
      break;

    case 'modal':
      component = (
        <Modal {...props} data={props.data} callback={props.callback} />
      );
      break;
    case 'drawer':
      component = (
        <Drawer {...props} data={props.data} callback={props.callback} />
      );
      break;
    default:
      component = (
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
        </Button>
      );
      break;
  }

  if (submitResult) {
    return (
      <>
        {component}
        {submitResult ? (
          <Render
            body={submitResult}
            data={{ ...props.data }}
            callback={props.callback}
          />
        ) : null}
      </>
    );
  } else {
    return component;
  }
};

export default Action;
