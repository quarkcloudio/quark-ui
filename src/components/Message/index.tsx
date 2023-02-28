import { message } from 'antd';
import { history } from '@umijs/max';

const Message: any = (props:any, successCallback:any = null) => {
  const [messageApi] = message.useMessage();
  if (props.component !== 'message') {
    return false
  }

  if (props.content) {
    messageApi.open({
      type: props.type,
      content: props.content,
      duration: props.duration,
      icon: props.icon,
      style: props.style
    });
  }

  if (props.url) {
    history.push(props.url);
  }

  if (props.callback) {
    props.callback();
  }

  // 成功后回调
  if (props.type == "success") {
    if (successCallback) {
      successCallback()
    }
  }
};

export default Message;
