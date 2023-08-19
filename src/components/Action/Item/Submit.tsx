import React, { useState } from 'react';
import { useModel } from '@umijs/max';
import { Button, Popconfirm, Modal as AntModal } from 'antd';
import { ExclamationCircleOutlined, createFromIconfontCN } from '@ant-design/icons';
import tplEngine from '@/utils/template';
import reload from '@/utils/reload';

const Action: React.FC<any> = (props) => {
  const [modal, contextHolder] = AntModal.useModal();
  const { buttonLoadings, setButtonLoadings } = useModel('buttonLoading');
  const IconFont = createFromIconfontCN({ scriptUrl: '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js' });
  let { object } = useModel('object');
  let getObject: any = object;
  const formKey = props.submitForm ? props.submitForm : 'form';
  const { confirm } = modal;
  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  // 确认弹框
  const showConfirm = async () => {
    confirm({
      title: tplEngine(props.confirmTitle, props.data),
      icon: <ExclamationCircleOutlined />,
      content: tplEngine(props.confirmText, props.data),
      onOk: ()=>{submit()},
    })
  };

  // 提交表单
  const submit = async () => {
    getObject[formKey]?.submit?.();

    // hack
    await waitTime(1000);

    if (props.reload) {
      if (props.reload === 'window') {
        reload();
      } else {
        getObject[props.reload]?.current?.reload();
      }
    }
  };

  let component = (
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
      icon={props.icon && <IconFont type={props.icon} />}
      onClick={() => {
        if (props.confirmTitle) {
          showConfirm()
        } else {
          submit();
        }
      }}
    >
      {tplEngine(props.label, props.data)}
    </Button>
  );

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
          icon={props.icon && <IconFont type={props.icon} />}
        >
          {tplEngine(props.label, props.data)}
        </Button>
      </Popconfirm>
    );
  }

  return <>{contextHolder}{component}</>;
};

export default Action;
