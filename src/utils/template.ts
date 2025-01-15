import template from 'lodash.template';

// 模板引擎
const tplEngine = (tpl: any, data: any) => {
  let result = tpl;
  if (!tpl || !data) {
    return result;
  }

  let keys = Object.keys(data);
  if (keys.length === 0) {
    return result;
  }

  try {
    const compiled = template(tpl);
    result = compiled(data);
  } catch (error) {
    console.error('引擎渲染失败:', error);
    return '';
  }

  return result;
};

export default tplEngine;
