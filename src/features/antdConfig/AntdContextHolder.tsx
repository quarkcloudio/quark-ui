import { App } from 'antd';
import type { PropsWithChildren } from 'react';
import '@ant-design/v5-patch-for-react-19';

function ContextHolder() {
  const { message, modal, notification } = App.useApp();
  window.$message = message;
  window.$modal = modal;
  window.$notification = notification;
  return null;
}

const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <App className="h-full">
      <ContextHolder />
      {children}
    </App>
  );
};

export default AppProvider;
