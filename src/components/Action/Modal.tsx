import React, { useState } from 'react';
import { tplEngine } from '@/utils/template';
import {
  Modal as AntModal,
  Button
} from 'antd';
import Render from '@/components/Render';
import {createFromIconfontCN } from '@ant-design/icons';

const Modal: React.FC<any> = (props:any) => {

  const IconFont = createFromIconfontCN({
    scriptUrl:'//at.alicdn.com/t/font_1615691_3pgkh5uyob.js'
  });

  const [visible, setVisible] = useState(props.modal.visible);

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
      <AntModal
        {...props.modal}
        title={tplEngine(props.modal.title,props.data)}
        visible={visible}
        onCancel={()=>setVisible(false)}
        footer={
          props?.modal?.actions ? <Render body={props?.modal?.actions} data={props.data} callback={()=>setVisible(false)} /> : null
        }
      >
        <Render body={props.modal.body} data={props.data} callback={()=>setVisible(false)}/>
      </AntModal>
    </>
  );
}

export default Modal;