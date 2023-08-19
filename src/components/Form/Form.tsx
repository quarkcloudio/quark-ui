import React, { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { history, useModel } from '@umijs/max';
import { message, Space, Spin } from 'antd';
import { ProForm, ProFormProps } from '@ant-design/pro-components';
import qs from 'query-string';
import { post, get } from '@/services/action';
import Action from '@/components/Action';
import Render from '@/components/Render';
import tplEngine from '@/utils/template';
import reload from '@/utils/reload';

export interface FormExtendProps {
  component?: string;
  componentkey?: string;
  api?: string;
  apiType?: string;
  initApi?: string;
  targetBlank?: string;
  actions?: any;
  resetButtonText?: string;
  submitButtonText?: string;
  buttonWrapperCol?: any;
  body?: any;
  data?: any;
  callback?: any;
  style?: CSSProperties | undefined;
}

const defaultProps = {
  componentkey: 'form',
  apiType: 'POST',
} as FormExtendProps;

const Form: React.FC<ProFormProps & FormExtendProps> = (props) => {
  const [form] = ProForm.useForm();
  const [spinning, setLoading] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const { buttonLoadings, setButtonLoadings } = useModel('buttonLoading');
  const { object, setObject } = useModel('object');
  const [random, setRandom] = useState(0); // hack
  const getObject: any = object;
  const {
    componentkey,
    title,
    colon,
    initialValues,
    labelAlign,
    name,
    preserve,
    requiredMark,
    scrollToFirstError,
    size,
    dateFormatter,
    layout,
    labelCol,
    wrapperCol,
    style,
    api,
    apiType,
    initApi,
    targetBlank,
    actions,
    data,
    body,
    resetButtonText,
    submitButtonText,
    buttonWrapperCol,
    callback,
  } = { ...defaultProps, ...props };

  const formKey = componentkey ? componentkey : 'form'
  getObject[formKey] = form;
  setObject(getObject);

  useEffect(() => {
    if (initApi) {
      getInitialValues();
    }
  }, []);

  const getInitialValues = async () => {
    if (initApi) {
      setLoading(true);

      let result = await get({
        url: tplEngine(initApi, data),
      });

      const getObject: any = object;
      getObject[formKey].setFieldsValue(result.data);
      setLoading(false);
    }
  };

  const onFinish = async (values: any) => {
    let result = null;
    buttonLoadings[formKey] = true;
    setButtonLoadings(buttonLoadings);
    setRandom(Math.random);

    if (apiType === 'GET') {
      if (targetBlank) {
        let url = tplEngine(api, data);
        values['token'] = localStorage.getItem('token');
        if (api?.indexOf('http') === -1) {
          url = `${url}`;
        }

        window.open(`${url}?${qs.stringify(values)}`);
        buttonLoadings[formKey] = false;
        setButtonLoadings(buttonLoadings);
        setRandom(Math.random);
        return false;
      } else {
        result = await get({
          url: tplEngine(api, data),
          data: values,
        });
      }
    } else {
      result = await post({
        url: tplEngine(api, data),
        data: values,
      });
    }

    buttonLoadings[formKey] = false;
    setButtonLoadings(buttonLoadings);
    setRandom(Math.random);

    if (result.component === 'message') {
      if (result.type === 'success') {
        if (callback) {
          callback();
        }
        message.success(result.content);
      } else {
        message.error(result.content);
      }

      if (result.url) {
        if (result.url === 'reload') {
          reload();
        } else {
          history.push(result.url);
        }
      }
    } else {
      setSubmitResult(result);
    }
  };

  return (
    <Spin spinning={spinning}>
      <ProForm
        form={getObject[formKey]}
        title={title}
        colon={colon}
        initialValues={initialValues}
        labelAlign={labelAlign}
        name={name}
        preserve={preserve}
        requiredMark={requiredMark}
        scrollToFirstError={scrollToFirstError}
        size={size}
        dateFormatter={dateFormatter}
        layout={layout}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        style={style}
        onFinish={async (values: any) => {
          onFinish(values);
        }}
        submitter={{
          searchConfig: {
            resetText: resetButtonText,
            submitText: submitButtonText,
          },
          render: (proFormProps: any, doms: any) => {
            if (actions) {
              return (
                <ProForm.Item wrapperCol={buttonWrapperCol}>
                  <Space>
                    {actions?.map((action: any, index: number) => {
                      return (
                        <Action
                          key={index}
                          {...action}
                          submitForm={action.submitForm ?? formKey}
                          data={data}
                          callback={callback}
                        />
                      );
                    })}
                  </Space>
                </ProForm.Item>
              );
            }
          },
        }}
      >
        <Render
          body={body}
          data={{ ...data, componentkey: formKey }}
          callback={callback}
        />
        {submitResult && (
          <Render body={submitResult} data={{ ...data }} callback={callback} />
        )}
      </ProForm>
    </Spin>
  );
};

export default Form;
