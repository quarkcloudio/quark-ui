import React, { useState } from 'react';
import { useModel } from '@umijs/max';
import { Button, Popconfirm, Modal as AntModal } from 'antd';
import {
  ExclamationCircleOutlined,
  createFromIconfontCN,
} from '@ant-design/icons';
import tplEngine from '@/utils/template';
import reload from '@/utils/reload';

const Action: React.FC<any> = (props) => {
  const [modal, contextHolder] = AntModal.useModal();
  const { buttonLoadings, setButtonLoadings } = useModel('buttonLoading');
  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js',
  });
  let { object } = useModel('object');
  let { submit } = useModel('submit');
  const [random, setRandom] = useState(0); // hack
  const formKey = props.submitForm ? props.submitForm : 'form';
  const { confirm } = modal;

  // 确认弹框
  const showConfirm = async () => {
    confirm({
      title: tplEngine(props.confirmTitle, props.data),
      icon: <ExclamationCircleOutlined />,
      content: tplEngine(props.confirmText, props.data),
      onOk: () => {
        handle();
      },
    });
  };

  // 提交表单
  const handle = async () => {
    // 设置按钮提交状态
    buttonLoadings[formKey] = true;
    setButtonLoadings(buttonLoadings);
    setRandom(Math.random);

    // 提交表单
    object[formKey]?.current
      ?.validateFieldsReturnFormatValue()
      ?.then(async (values: any) => {
        await submit[formKey]?.(values);
        if (props.reload) {
          if (props.reload === 'window') {
            reload();
          } else {
            object[props.reload]?.current?.reload();
          }
        }
      })
      .catch((errorInfo: any) => {
        // 重置按钮提交状态
        buttonLoadings[formKey] = false;
        setButtonLoadings(buttonLoadings);
        setRandom(Math.random);
      });
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
          showConfirm();
        } else {
          handle();
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
          handle();
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

  return (
    <>
      {contextHolder}
      {component}
    </>
  );
};

export default Action;
