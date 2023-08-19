import React from 'react';
import { Button, Popconfirm, Modal as AntModal } from 'antd';
import { ExclamationCircleOutlined, createFromIconfontCN } from '@ant-design/icons';
import tplEngine from '@/utils/template';

const Js: React.FC<any> = (props) => {
  const [modal, contextHolder] = AntModal.useModal();
  const IconFont = createFromIconfontCN({scriptUrl: '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js'});
  const { confirm } = modal;

  // 确认弹框
  const showConfirm = async () => {
    confirm({
      title: tplEngine(props.confirmTitle, props.data),
      icon: <ExclamationCircleOutlined />,
      content: tplEngine(props.confirmText, props.data),
      onOk() {
        // eslint-disable-next-line
        eval(props.js);
      },
    })
  };

  let component = null;
  if (props.confirmType === 'pop') {
    component = (
      <Popconfirm
        placement="topRight"
        title={tplEngine(props.confirmTitle, props.data)}
        onConfirm={() => {
          // eslint-disable-next-line
          eval(props.js);
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
          icon={props.icon && <IconFont type={props.icon} />}
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
        icon={props.icon && <IconFont type={props.icon} />}
        onClick={() => {
          if (props.confirmTitle) {
            showConfirm();
          } else {
            // eslint-disable-next-line
            eval(props.js);
          }
        }}
      >
        {tplEngine(props.label, props.data)}
      </Button>
    );
  }

  return <>{contextHolder}{component}</>
};

export default Js;
