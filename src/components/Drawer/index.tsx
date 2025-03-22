import React, { useState } from 'react';
import { Drawer as AntDrawer, Button, Space } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { get } from '@/services/action';
import Action from '@/components/Action';
import Render from '@/components/Render';
import tplEngine from '@/utils/template';

const Drawer: React.FC<any> = (props: any) => {
  const IconFont = createFromIconfontCN({ scriptUrl: '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js' });
  const [open, setOpen] = useState(props.drawer.open);
  const [data, setData] = useState(props.data); // 初始化表单数据

  const setInitialData = async () => {
    // 从接口获取初始值
    if (props.initApi) {
      let result = await get({
        url: tplEngine(props.initApi, props.data),
      });
      setData(result.data);
    }
  };

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
        icon={props.icon && <IconFont type={props.icon} />}
        onClick={() => {
          setOpen(true);
          setInitialData()
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
          props?.drawer?.actions && (
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
          )
        }
      >
        <Render
          body={props.drawer.body}
          data={{...props.data, ...data}}
          callback={() => setOpen(false)}
        />
      </AntDrawer>
    </>
  );
};

export default Drawer;
