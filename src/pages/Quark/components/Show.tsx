import React from 'react';
import ProCard from '@ant-design/pro-card';
import ProDescriptions from '@ant-design/pro-descriptions';
import { Link } from 'umi';

const Show: React.FC<any> = (props:any) => {

  // 解析表单item
  const itemRender = (items:any) => {
    const formItemComponent = (
      items.map((item:any,key:any) => {
        let component = item.value;

        if(item.image) {
          component = <img src={component} width={item.image.width} height={item.image.height} />
        }

        if(item.link) {
          if(item.link.target === '_blank') {
            component = <a href={item.link.href} target={item.link.target}>{component}</a>
          } else {
            component = <Link to={item.href}>{component}</Link>
          }
        }

        return <ProDescriptions.Item label={item.label}>{component}</ProDescriptions.Item>;
      })
    )
    return formItemComponent;
  }

  return (
    <ProCard>
      <ProDescriptions
        title={props.show.title}
        style={props.show.style ? props.show.style : {margin:'25px',width:'100%'}}
        tooltip={props.show.tooltip}
        loading={props.show.loading}
        bordered={props.show.bordered}
        column={props.show.column}
        size={props.show.size}
        layout={props.show.layout}
        colon={props.show.colon}
      >
        {itemRender(props.show.items)}
      </ProDescriptions>
    </ProCard>
  );
}

export default Show;