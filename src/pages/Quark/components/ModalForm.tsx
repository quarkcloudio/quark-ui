import React, { useState, useEffect } from 'react';
import { ModalForm as AntModalForm} from '@ant-design/pro-form';
import { useModel, history } from 'umi';
import { get, post } from '@/services/action';
import {
  Form as AntForm,
  Button,
  message
} from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import FormItem from './FormItem';

const ModalForm: React.FC<any> = (props:any) => {
  const [form] = AntForm.useForm();
  const { initialState } = useModel('@@initialState');
  const IconFont = createFromIconfontCN({
    scriptUrl: initialState.settings.iconfontUrl,
  });

  const [formComponent, setFormComponentState] = useState({
    api:null,
    style:undefined,
    title:undefined,
    width:undefined,
    initialValues:{},
    items:[],
    colon:undefined,
    labelAlign:undefined,
    name:undefined,
    preserve:undefined,
    requiredMark:undefined,
    scrollToFirstError:undefined,
    size:undefined,
    layout:undefined,
    labelCol:undefined,
    wrapperCol:undefined,
  });

  const [visible, setVisible] = useState(false);

  const getComponent = async () => {
    const result = await get({
      actionUrl: props.modal
    });
    const formComponent = findFormComponent(result.data);
    setFormComponentState(formComponent)
    form.setFieldsValue({...formComponent.initialValues});
    setVisible(true);
  }

  const findFormComponent:any = (data:any) => {
    if(data.component === 'form') {
      return data;
    }

    if(data.hasOwnProperty('content')) {
      return findFormComponent(data.content);
    }
  
    let conmpontent = [];

    if(data.hasOwnProperty(0)) {
      conmpontent = (data.map((item:any) => {
        return findFormComponent(item);
      }));
    }

    return conmpontent
  }

  let trigger:any = null;
  switch (props.component) {
    case 'buttonStyle':
      trigger =
      <Button
        key={props.key}
        type={props.type}
        block={props.block}
        danger={props.danger}
        disabled={props.disabled}
        ghost={props.ghost}
        shape={props.shape}
        size={props.size}
        icon={props.icon ? <IconFont type={props.icon} /> : null}
        style={props.style}
        onClick={()=>{getComponent()}}
      >
        {props.name}
      </Button>
      break;
  
    case 'aStyle':
      trigger =
        <a key={props.key} style={props.style} onClick={()=>{getComponent()}}>
          {props.name}
        </a>
      break;

    default:
      break;
  }

  const onFinish = async (values: any) => {
    const result = await post({
      actionUrl: formComponent.api,
      ...values
    });

    if(result.status === 'success') {
      message.success(result.msg);
    } else {
      message.error(result.msg);
    }

    if(result.url) {
      history.push(result.url);
    }
  };

  return (
    <AntModalForm
      trigger={trigger}
      form={form}
      onFinish={async (values) => { onFinish(values) }}
      style={formComponent.style}
      colon={formComponent.colon}
      initialValues={formComponent.initialValues}
      labelAlign={formComponent.labelAlign}
      name={formComponent.name}
      preserve={formComponent.preserve}
      requiredMark={formComponent.requiredMark}
      scrollToFirstError={formComponent.scrollToFirstError}
      size={formComponent.size}
      layout={formComponent.layout}
      labelCol={formComponent.labelCol}
      wrapperCol={formComponent.wrapperCol}
      modalProps={{
        title:formComponent.title ? formComponent.title : undefined,
        width:formComponent.width ? formComponent.width : undefined,
        visible:visible,
        onCancel : () => {setVisible(false)}
      }}
    >
      <FormItem form={form} initialValues={formComponent.initialValues} items={formComponent.items} />
    </AntModalForm>
  );
}

export default ModalForm;