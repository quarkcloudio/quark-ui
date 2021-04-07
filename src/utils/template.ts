import { trim } from '@/utils/trim';

// 解析模板
export function parseTemplate(template: any,data: any) {

    let result = template;
    let tplValues = template.match(/{[^+]+}/g);

    if(typeof template === 'string') {
        if(tplValues !== null) {
            tplValues.map((item:any) => {
                
                // 去除大括号
                item = trim(item,'{','left');
                item = trim(item,'}','right');

                // 替换数据
                if(data) {
                    let replaceData = data.hasOwnProperty(item) ? data[item] : null;
                    result = template.replace('{'+item+'}', replaceData);
                }
            });
        }
    }

    return result;
}