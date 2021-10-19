import React, { useState } from 'react';
import { tplEngine } from '@/utils/template';
import {
  Drawer as AntDrawer,
  Button,
  Space
} from 'antd';
import Render from '@/components/Render';
import Action from '@/components/Action/Action';
import {createFromIconfontCN } from '@ant-design/icons';

const Drawer: React.FC<any> = (props:any) => {

  const IconFont = createFromIconfontCN({
    scriptUrl:'//at.alicdn.com/t/font_1615691_3pgkh5uyob.js'
  });

  const [visible, setVisible] = useState(props.drawer.visible);

  return (
    <>
      <Button
        block={props.block}
        danger={props.danger}
        disabled={props.disabled}
        ghost={props.ghost}
        shape={props.shape}
        size={props.size}
        type={props.type}
        icon={props.icon ? <IconFont type={props.icon} /> : false}
        onClick={()=>{setVisible(true)}}
      >
        {tplEngine(props.label,props.data)}
      </Button>
      <AntDrawer
        {...props.drawer}
        title={tplEngine(props.drawer.title,props.data)}
        visible={visible}
        onClose={()=>setVisible(false)}
        footer={
          props?.drawer?.actions ? 
          <Space>
            {props.drawer.actions?.map((action:any) => {
              return <Action {...action} data={props.data} callback={()=>setVisible(false)}/>
            })}
          </Space>
          : null
        }
      >
        <Render body={props.drawer.body} data={props.data} callback={()=>setVisible(false)}/>
      </AntDrawer>
    </>
  );
}

export default Drawer;