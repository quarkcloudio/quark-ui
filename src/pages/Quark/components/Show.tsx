import React from 'react';
import ProCard from '@ant-design/pro-card';
import ProDescriptions from '@ant-design/pro-descriptions';
import {
  Space,
  Button,
  Image
} from 'antd';
import { Link } from 'umi';

const Show: React.FC<any> = (props:any) => {

  // 解析表单item
  const itemRender = (items:any) => {
    const formItemComponent = (
      items.map((item:any,key:any) => {
        let component = item.value;

        if(item.image) {
          if(typeof component === 'object') {
            component = (component.map((componentItem:any,key:any) => {
              return <Image src={componentItem} width={item.image.width} height={item.image.height} />
            }));

            component = <Image.PreviewGroup><Space>{component}</Space></Image.PreviewGroup>
          } else {
            component = <Image src={component} width={item.image.width} height={item.image.height} />
          }
        }

        if(item.link) {
          //设置target时为浏览器跳转，未设置时为前端路由跳转
          if (item.link.target) {
            component = <a href={item.link.href} target={item.link.target}>{component}</a>
          } else {
            component = <Link to={item.href}>{component}</Link>
          }
        }

        return <ProDescriptions.Item key={item.key} label={item.label}>{component}</ProDescriptions.Item>;
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
        extra={
          props.show.backButton ?
            <Button type="link" onClick={e => {history.go(-1);}}>
              返回上一页
            </Button>
          :
            null
        }
      >
        {itemRender(props.show.items)}
      </ProDescriptions>
    </ProCard>
  );
}

export default Show;
