import React from 'react';
import ProDescriptions from '@ant-design/pro-descriptions';
import {
  Space,
  Image
} from 'antd';
import { Link } from 'umi';

const Descriptions: React.FC<any> = (props:any) => {

  // 解析item
  const itemRender = (items:any) => {
    const itemComponent = (
      items.map((item:any) => {
        let component = item.value;
        switch (item.type) {
          case "image":
            if(typeof component === 'object') {
              component = (component.map((componentItem:any) => {
                return <Image src={componentItem} width={item.image.width} height={item.image.height} />
              }));
              component = <Image.PreviewGroup><Space>{component}</Space></Image.PreviewGroup>
            } else {
              component = <Image src={component} width={item.image.width} height={item.image.height} />
            }
            break;
        
          case "link":
            if(item.target === '_blank') {
              component = <a href={item.href} target={item.target}>{component}</a>
            } else {
              component = <Link to={item.href}>{component}</Link>
            }
            break;

          default:
            break;
        }
        return <ProDescriptions.Item key={item.key} label={item.label}>{component}</ProDescriptions.Item>;
      })
    )
    return itemComponent;
  }

  return (
    <ProDescriptions {...props}>
      {itemRender(props.items)}
    </ProDescriptions>
  );
}

export default Descriptions;