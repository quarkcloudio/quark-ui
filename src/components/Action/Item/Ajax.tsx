import React, { useState } from 'react';
import { history, useModel } from '@umijs/max';
import { Button, message, Popconfirm, Modal as AntModal } from 'antd';
import { ExclamationCircleOutlined,createFromIconfontCN } from '@ant-design/icons';
import { get } from '@/services/action';
import tplEngine from '@/utils/template';
import reload from '@/utils/reload';
import Render from '@/components/Render';

const Ajax: React.FC<any> = (props) => {
  const [modal, contextHolder] = AntModal.useModal();
  const { buttonLoadings, setButtonLoadings } = useModel('buttonLoading');
  const [random, setRandom] = useState(0); // hack
  const [submitResult, setSubmitResult] = useState(null);
  const IconFont = createFromIconfontCN({ scriptUrl: '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js' });
  let { object } = useModel('object');
  const { confirm } = modal;

  // 确认弹框
  const showConfirm = async (api: any) => {
    confirm({
      title: tplEngine(props.confirmTitle, props.data),
      icon: <ExclamationCircleOutlined />,
      content: tplEngine(props.confirmText, props.data),
      onOk() {
        handle(api);
      },
    });
  };

  // 执行行为
  const handle = async (api: string) => {
    buttonLoadings[props.componentkey] = true;
    setButtonLoadings(buttonLoadings);
    setRandom(Math.random);

    const result = await get({
      url: tplEngine(api, props.data),
    });

    buttonLoadings[props.componentkey] = false;
    setButtonLoadings(buttonLoadings);
    setRandom(Math.random);

    if (result.component === 'message') {
      if (result.type === 'error') {
        message.error(result.content);
        return
      }
      if (props.callback) {
        props.callback();
      }
      if (result.content) {
        message.success(result.content);
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
          object[props.reload]?.current?.reload();
        }
      }
      return
    }

    setSubmitResult(result);
  };

  let component = (
    <Button
      loading={props.withLoading && buttonLoadings[props.componentkey]}
      style={props.style}
      block={props.block}
      danger={props.danger}
      disabled={props.disabled}
      ghost={props.ghost}
      shape={props.shape}
      size={props.size}
      type={props.type}
      icon={props.icon && <IconFont type={props.icon} />}
      onClick={() => { props.confirmTitle ? showConfirm(props.api) : handle(props.api) }}
    >
      {tplEngine(props.label, props.data)}
    </Button>
  );

  if (props.confirmType === 'pop') {
    component = (
      <Popconfirm
        placement="topRight"
        title={tplEngine(props.confirmTitle, props.data)}
        onConfirm={()=>{handle(props.api)}}
      >
        <Button
          loading={props.withLoading && buttonLoadings[props.componentkey]}
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

  if (submitResult) {
    return (
      <>
        {contextHolder}
        {component}
        {submitResult && (
          <Render
            body={submitResult}
            data={{ ...props.data }}
            callback={props.callback}
          />
        )}
      </>
    )
  }

  return <>{contextHolder}{component}</>
};

export default Ajax;
