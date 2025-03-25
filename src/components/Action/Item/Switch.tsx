import React, { useState } from 'react';
import { history, useModel } from '@umijs/max';
import { Switch as AntSwitch, message, Modal as AntModal } from 'antd';
import {
  ExclamationCircleOutlined,
  createFromIconfontCN,
} from '@ant-design/icons';
import { get } from '@/services/action';
import tplEngine from '@/utils/template';
import reload from '@/utils/reload';
import Render from '@/components/Render';
import qs from 'query-string';

const Switch: React.FC<any> = (props) => {
  const [modal, contextHolder] = AntModal.useModal();
  const { buttonLoadings, setButtonLoadings } = useModel('buttonLoading');
  const [random, setRandom] = useState(0); // hack
  const [submitResult, setSubmitResult] = useState(null);
  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js',
  });
  let { object } = useModel('object');
  const { confirm } = modal;

  // 确认弹框
  const showConfirm = async (api: any, checked: boolean) => {
    confirm({
      title: tplEngine(props.confirmTitle, props.data),
      icon: <ExclamationCircleOutlined />,
      content: tplEngine(props.confirmText, props.data),
      onOk() {
        handle(api, checked);
      },
    });
  };

  // 执行行为
  const handle = async (api: string, checked: boolean) => {
    buttonLoadings[props.componentkey] = true;
    setButtonLoadings(buttonLoadings);
    setRandom(Math.random);

    const result = await get({
      url: tplEngine(api, props.data) + `&${props.fieldName}=${checked}`,
    });

    buttonLoadings[props.componentkey] = false;
    setButtonLoadings(buttonLoadings);
    setRandom(Math.random);

    if (result.component === 'message') {
      if (result.type === 'error') {
        message.error(result.content);
        return;
      }
      if (props.callback) {
        props.callback();
      }
      if (result.content) {
        message.success(result.content);
      }
      if (result.url) {
        const returnUrl = tplEngine(result.url, props.data);
        if (returnUrl === 'reload') {
          reload();
          return;
        }
        if (returnUrl?.indexOf('http') !== -1) {
          const values: any['token'] = localStorage.getItem(
            process.env.UMI_APP_TOKEN ?? 'token',
          );
          window.open(`${returnUrl}?${qs.stringify(values)}`);
        } else {
          history.push(result.url);
        }
      }
      if (props.redirect) {
        const redirectUrl = tplEngine(props.redirect, props.data);
        if (redirectUrl === 'reload') {
          reload();
          return;
        }
        if (redirectUrl?.indexOf('http') !== -1) {
          const values: any['token'] = localStorage.getItem(
            process.env.UMI_APP_TOKEN ?? 'token',
          );
          window.open(`${redirectUrl}?${qs.stringify(values)}`);
        } else {
          history.push(redirectUrl);
        }
      }
      if (props.reload) {
        if (props.reload === 'window') {
          reload();
        } else {
          object[props.reload]?.current?.reload();
        }
      }
      return;
    }

    setSubmitResult(result);
  };

  let component = (
    <AntSwitch
      loading={props.withLoading && buttonLoadings[props.componentkey]}
      style={props.style}
      size={props.size}
      checkedChildren={props.checkedChildren}
      unCheckedChildren={props.unCheckedChildren}
      checked={
        props?.data?.[props.fieldName] &&
        props.fieldValue == props.data[props.fieldName] // eslint-disable-line eqeqeq
      }
      onChange={(checked: boolean) => {
        void (props.confirmTitle
          ? showConfirm(props.api, checked)
          : handle(props.api, checked));
      }}
    />
  );

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
    );
  }

  return (
    <>
      {contextHolder}
      {component}
    </>
  );
};

export default Switch;
