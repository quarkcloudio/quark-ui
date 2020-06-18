import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'form', ...(require('E:/develop/quark/quark-ui/src/models/form.ts').default) });
app.model({ namespace: 'global', ...(require('E:/develop/quark/quark-ui/src/models/global.ts').default) });
app.model({ namespace: 'login', ...(require('E:/develop/quark/quark-ui/src/models/login.ts').default) });
app.model({ namespace: 'picture', ...(require('E:/develop/quark/quark-ui/src/models/picture.ts').default) });
app.model({ namespace: 'request', ...(require('E:/develop/quark/quark-ui/src/models/request.ts').default) });
app.model({ namespace: 'show', ...(require('E:/develop/quark/quark-ui/src/models/show.ts').default) });
app.model({ namespace: 'table', ...(require('E:/develop/quark/quark-ui/src/models/table.ts').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
