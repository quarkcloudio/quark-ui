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
    loading:boolean,
  };
  subscriptions:{ setup: Subscription };
  effects: {
    get: Effect;
    post: Effect;
  };
  reducers: {
    updateData: Reducer<{}>;
    resetData: Reducer<{}>;
    changePageLoading: Reducer<{}>;
  };
}

const form: ModelType = {
  namespace: 'request',
  state: {
    loading:true,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {

      });
    },
  },
  effects: {
    *get({ payload, callback }, { put, call }) {
      yield put({
        type: 'changePageLoading',
        payload: { loading:true},
      });
      const response = yield call(get, payload);
      if(!response) {
        return false;
      }
      if (response.status === 'success') {
        const data = { ...response.data, loading:false };
        yield put({
          type: 'updateData',
          payload: data,
        });
        if (callback && typeof callback === 'function') {
          callback(response); // 返回结果
        }
      }
    },
    *post({ payload, callback }, { put, call }) {
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
    updateData(state, action) {
      return {
        ...action.payload,
      };
    },
    resetData(state, action) {
      let resetState = {
          content:[],
          loading:true,
        }
        return {
          ...resetState,
        };
      },
    changePageLoading(state, action) {
      let pageLoading = {
        loading:action.payload.loading
      }
      return {
        ...pageLoading,
      };
    },
  },
};

export default form;
