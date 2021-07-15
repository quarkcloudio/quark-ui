import { trim } from '@/utils/trim';

// 数据映射
export function dataMapping(template: any,data: any) {

    let result = template;

    if(typeof template === 'string') {
        let tplValues = template.match(/{.*?(?:>|})/g);
        if(tplValues !== null) {
            tplValues.map((item:any) => {

                // 去除大括号
                let tpl = trim(item,'{','left');
                tpl = trim(tpl,'}','right');

                // 替换数据
                if(data) {
                    let replaceData = data.hasOwnProperty(tpl) ? data[tpl] : null;
                    result = result.replace(item, replaceData);
                }
            });
        }
    }

    return result;
}

// 模板引擎
export function tplEngine(template: any,data: any) {

    let result = template;

    if(typeof template === 'string') {
        let tplValues = template.match(/<%.*?(?:>|%>)/g);
        if(tplValues !== null) {
            tplValues.map((item:any) => {
                
                // 去除大括号
                let tpl = trim(item,'<%','left');
                tpl = trim(tpl,'%>','right');

                if(data) {
                    const keys = Object.keys(data)
                    keys.map((key:any) => {
                        if(tpl.indexOf('data.'+key)>-1) {
                            tpl = tpl.replace('data.'+key, data[key]);
                        }
                    })
                }

                let replaceData = eval(tpl);

                result = result.replace(item, replaceData);
            });
        }
    }

    return result;
}