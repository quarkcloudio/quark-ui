import type { AnyNsRecord } from 'node:dns';

import DOMPurify from 'dompurify';

interface RenderProps {
  body: any;
  data?: any;
}
const Render = (props: RenderProps) => {
  const fieldNames = [
    'textField',
    'passwordField',
    'textAreaField',
    'inputNumberField',
    'iconField',
    'idField',
    'hiddenField',
    'checkboxField',
    'radioField',
    'imageField',
    'fileField',
    'switchField',
    'selectField',
    'treeField',
    'cascaderField',
    'dateField',
    'weekField',
    'monthField',
    'quarterField',
    'yearField',
    'datetimeField',
    'dateRangeField',
    'datetimeRangeField',
    'timeField',
    'timeRangeField',
    'displayField',
    'editorField',
    'searchField',
    'mapField',
    'geofenceField',
    'listField',
    'groupField',
    'selects',
    'treeSelectField',
    'spaceField',
    'compactField',
    'fieldsetField',
    'dependencyField',
    'transferField',
    'imageCaptchaField',
    'smsCaptchaField',
    'imagePickerField',
    'skuField'
  ];

  // 递归渲染函数
  const render = (body: any, data: AnyNsRecord): any => {
    if (typeof body === 'string' || typeof body === 'number') {
      return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(String(body)) }} />;
    }
    if (body?.component) {
      if (fieldNames.includes(body.component)) {
        return (
          <ProFormField
            colon={body.colon}
            component={body.component}
            extra={body.extra}
            fieldProps={{ ...body }}
            help={body.help}
            key={body.componentkey}
            label={body.label}
            name={body.name}
            required={body.required}
            rules={body.frontendRules}
            tooltip={body.tooltip}
            wrapperCol={body.wrapperCol}
          />
        );
      }

      switch (body.component) {
        case 'view':
          return render(body.body, data);
        case 'image':
          return <AImage {...body} />;
        case 'card':
          return <ProCard {...body} />;
        case 'form':
          return (
            <ProForm
              {...body}
              data={data}
            />
          );
        case 'table':
          return <ProTable {...body} />;
        case 'tabs':
          return <ProTabs {...body} />;
        default:
          // 处理未知组件类型
          return <div>Unknown Component: {body.component}.</div>;
      }
    }
    if (Array.isArray(body)) {
      return body.map(item => render(item, data));
    }
    // 确保所有路径都有返回值
    return null;
  };

  return render(props.body, props.data);
};

export default Render;
