import DOMPurify from 'dompurify';

interface RenderProps {
  body: any;
  callback?: (data?: any) => void;
  data?: any;
}
const Render = (props: RenderProps) => {
  // 递归渲染函数
  const render = (body: any, data: any, callback?: (data?: any) => void): any => {
    if (typeof body === 'string' || typeof body === 'number') {
      return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(String(body)) }} />;
    }
    if (body?.component) {
      switch (body.component) {
        case 'view':
          return render(body.body, data, callback);
        case 'image':
          return <AImage {...body} />;
        case 'card':
          return <ProCard {...body} />;
        case 'form':
          return <ProForm {...body} />;
        case 'table':
          return <ProTable {...body} />;
        default:
          // 处理未知组件类型
          return <div>Unknown Component: {body.component}.</div>;
      }
    }
    if (Array.isArray(body)) {
      return body.map(item => render(item, data, callback));
    }
    // 确保所有路径都有返回值
    return null;
  };

  return render(props.body, props.data, props.callback);
};

export default Render;
