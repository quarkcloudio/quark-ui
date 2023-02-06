import React from 'react';
import { Space } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import components from '@/components/Render/components';
import tplEngine from '@/utils/template';

export interface RenderProps {
  body?: any;
  data?: any;
  callback?: any;
}

const defaultProps = {
  body: undefined,
  data: undefined,
  callback: undefined,
} as RenderProps;

// 获取组件
const getComponent = (componentName: string) => {
  let component: any = null;
  components.forEach((item: any) => {
    if (item.name.indexOf(componentName + '|') !== -1) {
      component = item.component;
    } else {
      if (item.name === componentName) {
        component = item.component;
      }
    }
  });

  return component;
};

// 解析组件
const parserComponent = (
  index: number,
  componentName: string,
  componentProps: any,
  data: any,
  callback: any,
) => {
  // Tpl组件特殊处理
  if (componentName === 'tpl') {
    return (
      <span
        {...componentProps}
        dangerouslySetInnerHTML={{
          __html: tplEngine(componentProps.body, data),
        }}
      />
    );
  }

  // Space组件特殊处理
  if (componentName === 'space') {
    return (
      <Space key={index} {...componentProps}>
        {componentRender(componentProps.body, data, callback)}
      </Space>
    );
  }

  // Card组件特殊处理
  if (componentName === 'card') {
    return (
      <ProCard
        key={index}
        {...componentProps}
        extra={componentRender(componentProps.extra, data, callback)}
        callback={callback}
        data={data}
      >
        {componentRender(componentProps.body, data, callback)}
      </ProCard>
    );
  }

  let component = getComponent(componentName);
  if (component) {
    component = React.cloneElement(component, {
      key: index,
      ...componentProps,
      data: data,
      callback: callback,
    });
  }

  return component;
};

// 渲染组件
const componentRender = (body: any, data: any, callback: any) => {
  let component: any = null;
  if (body === null || body === undefined) {
    return null;
  }
  if (typeof body === 'string' || typeof body === 'number') {
    if (data) {
      body = tplEngine(body, data);
    }
    return body;
  }
  if (body.hasOwnProperty('component')) {
    component = parserComponent(0, body.component, body, data, callback);
  } else {
    component = body.map((item: any, index: number) => {
      if (item.hasOwnProperty(0)) {
        return componentRender(item, data, callback);
      }
      return parserComponent(index, item.component, item, data, callback);
    });
  }

  return component;
};

const Render: React.FC<RenderProps> = (props) => {
  const { body, data, callback } = { ...defaultProps, ...props };

  // 组件渲染
  const component = componentRender(body, data, callback);

  // 字符串
  if (typeof component === 'string') {
    return <span dangerouslySetInnerHTML={{ __html: component }} />;
  }

  // 返回组件
  return component;
};

export default Render;
