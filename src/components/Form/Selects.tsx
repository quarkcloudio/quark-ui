import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';
import { get } from '@/services/action';
import { Form, Select } from 'antd';
import Render from '@/components/Render';

const Selects: React.FC<any> = (props: any) => {
  //hack
  const [random, setRandom] = useState(0);
  const [items, setItems] = useState(props.body);

  const onSelectChange = async (value: any, name: string, load: any = null) => {
    let fieldsValue: any = {};
    if (load) {
      const promises = items.map(async (item: any, key: any) => {
        if (load.field === item.name && load.api) {
          const result = await get({
            actionUrl: load.api,
            search: value,
          });

          item.options = result.data;
        }
        return item;
      });

      const getItems = await Promise.all(promises);
      setItems(getItems);

      fieldsValue[load.field] = undefined;
    }

    fieldsValue[name] = value;

    window[props.data.formKey]?.setFieldsValue(fieldsValue);
    setRandom(Math.random);
  };

  // 渲染组件
  const fieldRender = (item: any) => {
    let component = null;

    switch (item.component) {
      case 'selectField':
        component = (
          <Form.Item
            name={item.name}
            label={item.label}
            tooltip={item.tooltip}
            rules={item.frontendRules}
            extra={item.extra}
            help={item.help ? item.help : undefined}
          >
            <Select
              placeholder={item.placeholder}
              style={item.style ? item.style : []}
              options={item.options}
              disabled={item.disabled}
              mode={item.mode}
              allowClear={item.allowClear}
              size={item.size}
              onChange={(value) => {
                onSelectChange(value, item.name, item.load);
              }}
            />
          </Form.Item>
        );
        break;
      default:
        component = (
          <Form.Item
            label={item.label}
            name={item.name}
            help={item.help ? item.help : undefined}
            extra={item.extra}
          >
            <span key={item.name}>无{item.component}组件</span>
          </Form.Item>
        );
        break;
    }

    // 解析when
    if (item.when) {
      let fieldData: any = {};
      fieldData[item.name] = window[props.data.formKey]?.getFieldValue(
        item.name,
      );
      return (
        <>
          {component}
          <Render body={item.when} data={fieldData} callback={item.callback} />
        </>
      );
    } else {
      return component;
    }
  };

  const component = items.map((item: any) => {
    return fieldRender(item);
  });

  return component;
};

export default Selects;
