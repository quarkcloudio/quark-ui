import template from 'lodash.template';

// 模板引擎
export function tplEngine(tpl: any,data: any) {
    let result = tpl;

    if(!tpl || !data) {
        return result;
    }

    let keys = Object.keys(data);

    if(keys.length != 0) {
        const compiled = template(tpl);
        result = compiled(data);
    }

    return result;
}