import { template } from 'lodash';

// 模板引擎
const tplEngine = (tpl: any, data: any) => {
  let result = tpl;
  if (!tpl || !data) {
    return result;
  }

  const keys = Object.keys(data);
  if (keys.length !== 0) {
    const compiled = template(tpl);
    result = compiled(data);
  }

  return result;
};

export default tplEngine;
