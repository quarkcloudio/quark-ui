import { Reducer } from 'redux';
import { Effect,Subscription } from 'dva';
import router from 'umi/router';
import { message } from 'antd';
import { 
  get,
  post,
} from '@/services/action';

export interface ModelType {
  namespace: string;
  state: {
    content?:any,
    routes?:any,
    searchExpand:boolean;
    loading:boolean,
  };
  subscriptions:{ setup: Subscription };
  effects: {
    info: Effect;
    submit: Effect;
  };
  reducers: {
    updateTable: Reducer<{}>;
    resetTable: Reducer<{}>;
    searchExpand: Reducer<{}>;
    changePageLoading: Reducer<{}>;
  };
}

const table: ModelType = {
  namespace: 'table',
  state: {
    content:{
      title:false,
      subTitle:false,
      description:false,
      breadcrumb:false,
      body:{
        table:{
          title:false,
          columns:[],
          dataSource:[],
          pagination:[]
        }
      }
    },
    routes:[],
    searchExpand:false,
    loading:true,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {

      });
    },
  },
  effects: {
    *info({ payload, callback }, { put, call }) {
      yield put({
        type: 'changePageLoading',
        payload: { loading:true},
      });
      const response = yield call(get, payload);
      if(!response) {
        return false;
      }
      if (response.status === 'success') {
        const data = { ...response.data, routes:response.data.content.breadcrumb,loading:false };
        yield put({
          type: 'updateTable',
          payload: data,
        });
        if (callback && typeof callback === 'function') {
          callback(response); // 返回结果
        }
      }
    },
    *submit({ payload, callback }, { put, call }) {
      const response = yield call(post, payload);
      if(!response) {
        return false;
      }
      // 操作成功
      if (response.status === 'success') {
        // 提示信息
        message.success(response.msg, 3);
        // 页面跳转
        if(response.url) {
          router.push(response.url);
        }
        if (callback && typeof callback === 'function') {
          callback(response); // 返回结果
        }
      } else {
        message.error(response.msg, 3);
      }
    },
  },
  reducers: {
    updateTable(state:any, action) {
      return {
        ...action.payload,
      };
    },
    resetTable(state:any, action) {
      let resetState = {
          content:[],
          loading:true,
        }
        return {
          ...resetState,
        };
      },
    searchExpand(state:any, action) {
      state.searchExpand = action.payload.searchExpand;
      return {
        ...state,
      };
    },
    changePageLoading(state:any, action) {
      state.loading = action.payload.loading
      return {
        ...state,
      };
    },
  },
};

export default table;
