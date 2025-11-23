import { Form, Select } from 'antd';
import React, { useEffect, useState } from 'react';

import { fetchSelectsOptions } from '@/service/api';

const Selects: React.FC<any> = (props: any) => {
  const [random, setRandom] = useState(0);
  const [items, setItems] = useState(props.body);
  const { getEngineFormRef } = useEngine();

  const getFields = async () => {
    // 深拷贝一份 body 来防止直接修改 props
    const fieldsCopy = [...items];

    // 收集需要加载选项的依赖项
    const loadPromises: Array<Promise<void>> = [];

    for (const item of fieldsCopy) {
      const value = getEngineFormRef()?.getFieldsValue(item.name);
      if (value && item.load) {
        for (const [key, subItem] of fieldsCopy.entries()) {
          if (item.load.field === subItem.name && item.load.api) {
            const promise = fetchSelectsOptions(item.load.api, {
              search: value
            }).then((result: any) => {
              fieldsCopy[key].options = result.data;
            });
            loadPromises.push(promise);
          }
        }
      }
    }

    // 并发执行所有请求
    await Promise.all(loadPromises);

    return fieldsCopy;
  };

  // 初始化字段
  const setInitialFields = async () => {
    if (!Array.isArray(items)) {
      return;
    }
    const newFields = await getFields();
    const updatedItems = await Promise.all(newFields);
    setItems(updatedItems);
  };

  useEffect(() => {
    setInitialFields();
  }, []);

  const onSelectChange = async (value: any, name: string, load: any = null) => {
    const fieldsValue: any = {};
    if (load) {
      const promises = items.map(async (item: any) => {
        if (load.field === item.name && load.api) {
          const result = await fetchSelectsOptions(load.api, {
            search: value
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

    getEngineFormRef()?.setFieldsValue(fieldsValue);
    setRandom(Math.random);
    console.log(random);
  };

  // 渲染组件
  const fieldRender = (item: any) => {
    let component = null;

    switch (item.component) {
      case 'selectField':
        component = (
          <Form.Item
            extra={item.extra}
            help={item.help ? item.help : undefined}
            label={item.label}
            name={item.name}
            rules={item.frontendRules}
            tooltip={item.tooltip}
          >
            <Select
              allowClear={item.allowClear}
              disabled={item.disabled}
              mode={item.mode}
              options={item.options}
              placeholder={item.placeholder}
              size={item.size}
              style={item.style ? item.style : []}
              onChange={value => {
                onSelectChange(value, item.name, item.load);
              }}
            />
          </Form.Item>
        );
        break;
      default:
        component = (
          <Form.Item
            extra={item.extra}
            help={item.help ? item.help : undefined}
            label={item.label}
            name={item.name}
          >
            <span key={item.name}>无{item.component}组件</span>
          </Form.Item>
        );
        break;
    }

    return component;
  };

  const component = items.map((item: any) => {
    return fieldRender(item);
  });

  return component;
};

export default Selects;
