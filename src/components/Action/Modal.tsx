import React, { useState, useEffect } from 'react';
import { useModel, history } from 'umi';
import { dataMapping, tplEngine } from '@/utils/template';
import {
  Modal as AntModal,
  Button
} from 'antd';
import Render from '@/components/Render';
import Action from '@/components/Action/Action';
import {createFromIconfontCN } from '@ant-design/icons';

const Modal: React.FC<any> = (props:any) => {

  const IconFont = createFromIconfontCN({
    scriptUrl:'//at.alicdn.com/t/font_1615691_3pgkh5uyob.js'
  });

  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button
        block={props.block}
        danger={props.danger}
        disabled={props.disabled}
        ghost={props.ghost}
        shape={props.shape}
        size={props.size}
        type={props.showStyle}
        icon={props.icon ? <IconFont type={props.icon} /> : false}
        onClick={()=>{setVisible(true)}}
      >
        {tplEngine(props.label,props.data)}
      </Button>
      <AntModal
        title={props.modal.title}
        width={props.modal.width}
        visible={visible}
        onCancel={()=>setVisible(false)}
        footer={
          props?.modal?.actions?.map((action:any) => {
            return <Action {...action} callback={()=>setVisible(false)} data={props.data}/>
          })
        }
      >
        <Render body={props.modal.body} data={props.data} />
      </AntModal>
    </>
  );
}

export default Modal;