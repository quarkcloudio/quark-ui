import { routerRedux } from 'dva/router';
import { Reducer } from 'redux';
import { Effect,Subscription } from 'dva';
import router from 'umi/router';
import { parse, stringify } from 'qs';
import { message } from 'antd';
import { 
  get,
  post,
} from '@/services/action';

export function getPageQuery(): {
  [key: string]: string;
} {
  return parse(window.location.href.split('?')[1]);
}

export interface ModelType {
  namespace: string;
  state: {};
  reducers: {
    storeMenus: Reducer<{}>;
    setEngineApi: Reducer<{}>;
  };
  effects: {
    getMenus: Effect;
  };
  subscriptions:{ setup: Subscription };
}

const global : ModelType = {
  namespace: 'global',
  state: {
    menus:[],
    engine:{
      api:null,
      component:null,
      search:[]
    },
  },
  reducers: {
    storeMenus(state, action) {
      return {
        menus:action.payload,
      };
    },
    setEngineApi(state:any, action) {
      state.engine = action.payload;
      return {
        ...state,
      };
    }
  },
  effects: {
    *getMenus({ payload, callback }, { call, put }) {

      const response = yield call(get, payload);
      if(!response) {
        return false;
      }

      yield put({
        type: 'storeMenus',
        payload: response.data,
      });

      if (callback && typeof callback === 'function') {
        callback(response);
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const params = getPageQuery();
        let { api,component,search } = params;
        if (api) {
          dispatch({
            type: 'setEngineApi',
            payload: {
              api: api,
              component:component,
              search:search
            }
          });
        }
        if (!sessionStorage['token'] && pathname !== '/login') {
          router.push('/login');
        }
      });
    },
  },
};

export default global;
