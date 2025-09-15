interface RenderProps {
  body: any;
  callback?: (data: any) => void;
  data?: any;
}

const Render = (props: RenderProps) => {
  const render = (body: any, data: any, callback?: (data: any) => void): any => {
    if (typeof body === 'string' || typeof body === 'number') {
      return <span>{body}</span>;
    }
    if (body?.component) {
      switch (body.component) {
        case 'view':
          return render(body.body, data, callback);
        case 'image':
          return (
            <img
              alt={body.alt}
              src={body.src}
            />
          );
        default:
          // 处理未知组件类型
          return null;
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
