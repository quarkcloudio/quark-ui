// 根据key查找组件
const getComponent: any = (data: any, key: string) => {
  let component: any = {};
  if (data === undefined || data === null) {
    return component;
  }
  if (typeof data === 'string' || typeof data === 'number') {
    return component;
  }
  if (data.componentkey === key) {
    return data;
  }
  if (data.hasOwnProperty('tabPanes')) {
    return getComponent(data.tabPanes, key); // tab做特殊处理
  }
  if (data.hasOwnProperty('body')) {
    return getComponent(data.body, key);
  }
  if (data.hasOwnProperty(0)) {
    data.forEach((item: any) => {
      let subComponent = getComponent(item, key);
      let componentKeys = Object.keys(subComponent);
      if (componentKeys.length > 0) {
        component = subComponent;
      }
    });
  }

  return component;
};

export { getComponent };
