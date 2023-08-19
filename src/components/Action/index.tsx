import React from 'react';
import { Button } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import tplEngine from '@/utils/template';
import Modal from '@/components/Modal';
import Drawer from '@/components/Drawer';
import Ajax from '@/components/Action/Item/Ajax';
import Back from '@/components/Action/Item/Back';
import Cancel from '@/components/Action/Item/Cancel';
import Js from '@/components/Action/Item/Js';
import Link from '@/components/Action/Item/Link';
import Reset from '@/components/Action/Item/Reset';
import Submit from '@/components/Action/Item/Submit';

const Action: React.FC<any> = (props) => {
  const IconFont = createFromIconfontCN({ scriptUrl: '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js' });

  var component
  switch (props.actionType) {
    case 'js':
      component = <Js {...props} data={props.data} callback={props.callback} /> 
      break;
    case 'ajax':
      component = <Ajax {...props} data={props.data} callback={props.callback} /> 
      break;
    case 'submit':
      component = <Submit {...props} data={props.data} callback={props.callback} /> 
      break;
    case 'reset':
      component = <Reset {...props} data={props.data} callback={props.callback} /> 
      break;
    case 'cancel':
      component = <Cancel {...props} data={props.data} callback={props.callback} /> 
      break;
    case 'back':
      component = <Back {...props} data={props.data} callback={props.callback} /> 
      break;
    case 'link':
      component = <Link {...props} data={props.data} callback={props.callback} /> 
      break;
    case 'modal':
      component = <Modal {...props} data={props.data} callback={props.callback} />
      break;
    case 'drawer':
      component = <Drawer {...props} data={props.data} callback={props.callback} />
      break;
    default:
      component = (
        <Button
          style={props.style}
          block={props.block}
          danger={props.danger}
          disabled={props.disabled}
          ghost={props.ghost}
          shape={props.shape}
          size={props.size}
          type={props.type}
          icon={props.icon && <IconFont type={props.icon} />}
        >
          {tplEngine(props.label, props.data)}
        </Button>
      );
      break;
  }

  return component
};

export default Action;
