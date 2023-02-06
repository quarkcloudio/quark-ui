import React, { useState } from 'react';
import tplEngine from '@/utils/template';
import { Drawer as AntDrawer, Button, Space } from 'antd';
import Render from '@/components/Render';
import Action from '@/components/Action';
import { createFromIconfontCN } from '@ant-design/icons';

const Drawer: React.FC<any> = (props: any) => {
  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js',
  });
  const [open, setOpen] = useState(props.drawer.open);

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
        onClick={() => {
          setOpen(true);
        }}
      >
        {tplEngine(props.label, props.data)}
      </Button>
      <AntDrawer
        {...props.drawer}
        title={tplEngine(props.drawer.title, props.data)}
        open={open}
        onClose={() => setOpen(false)}
        footer={
          props?.drawer?.actions ? (
            <Space>
              {props.drawer.actions?.map((action: any, index: number) => {
                return (
                  <Action
                    key={index}
                    {...action}
                    data={props.data}
                    callback={() => setOpen(false)}
                  />
                );
              })}
            </Space>
          ) : null
        }
      >
        <Render
          body={props.drawer.body}
          data={props.data}
          callback={() => setOpen(false)}
        />
      </AntDrawer>
    </>
  );
};

export default Drawer;
