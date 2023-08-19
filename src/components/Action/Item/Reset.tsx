import React from 'react';
import { useModel } from '@umijs/max';
import { Button, Popconfirm, Modal as AntModal } from 'antd';
import { ExclamationCircleOutlined, createFromIconfontCN } from '@ant-design/icons';
import tplEngine from '@/utils/template';

const Reset: React.FC<any> = (props) => {
  const [modal, contextHolder] = AntModal.useModal();
  const IconFont = createFromIconfontCN({ scriptUrl: '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js' });
  let { object } = useModel('object');
  const formKey = props.submitForm ? props.submitForm : 'form';
  const { confirm } = modal;

  // 确认弹框
  const showConfirm = async () => {
    confirm({
      title: tplEngine(props.confirmTitle, props.data),
      icon: <ExclamationCircleOutlined />,
      content: tplEngine(props.confirmText, props.data),
      onOk() { object[formKey]?.resetFields?.()}
    })
  };

  let component = (
    <Button
      style={props.style}
      block={props.block}
      danger={props.danger}
      disabled={props.disabled}
      ghost={props.ghost}
      shape={props.shape}
      size={props.size}
      type={props.type}
      icon={props.icon && <IconFont type={props.icon} />}
      onClick={() => { props.confirmTitle ? showConfirm() : object[formKey]?.resetFields?.() }}
    >
      {tplEngine(props.label, props.data)}
    </Button>
  )

  if (props.confirmType === 'pop') {
    component = (
      <Popconfirm
        placement="topRight"
        title={tplEngine(props.confirmTitle, props.data)}
        onConfirm={() => { object[formKey]?.resetFields?.() }}
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
          icon={props.icon && <IconFont type={props.icon} />}
        >
          {tplEngine(props.label, props.data)}
        </Button>
      </Popconfirm>
    )
  }

  return <>{contextHolder}{component}</>
};

export default Reset;
