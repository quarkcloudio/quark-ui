import { trim } from '@/utils/trim';

// 数据映射
export function dataMapping(template: any,data: any) {

    let result = template;

    if(typeof template === 'string') {
        let tplValues = template.match(/{.*?(?:>|})/g);
        if(tplValues !== null) {
            tplValues.map((item:any) => {

                // 去除大括号
                item = trim(item,'{','left');
                item = trim(item,'}','right');

                // 替换数据
                if(data) {
                    let replaceData = data.hasOwnProperty(item) ? data[item] : null;
                    result = result.replace('{'+item+'}', replaceData);
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
                item = trim(item,'<%','left');
                item = trim(item,'%>','right');

                if(data) {
                    const keys = Object.keys(data)
                    keys.map((key:any) => {
                        if(item.indexOf('data.'+key)>-1) {
                            item = item.replace('data.'+key, data[key]);
                        }
                    })
                }

                result = eval(item);
            });
        }
    }

    return result;
}