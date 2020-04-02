import { Reducer } from 'redux';
import { Effect,Subscription } from 'dva';
import router from 'umi/router';
import { message } from 'antd';
import moment from 'moment';
import { 
  get,
  post,
} from '@/services/action';

export interface ModelType {
  namespace: string;
  state: {
    picture?:any,
  };
  subscriptions:{ setup: Subscription };
  effects: {
    info: Effect;
    delete: Effect;
  };
  reducers: {
    updateData: Reducer<{}>;
  };
}

const picture: ModelType = {
  namespace: 'picture',
  state: {
    picture:null,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {

      });
    },
  },
  effects: {
    *info({ payload, callback }, { put, call }) {

      const response = yield call(get, payload);
      if(!response) {
        return false;
      }
      if (response.status === 'success') {
        const data = { ...response.data };
        yield put({
          type: 'updateData',
          payload: data,
        });
        if (callback && typeof callback === 'function') {
          callback(response); // 返回结果
        }
      }
    },
    *delete({ payload, callback }, { put, call }) {

    },
  },
  reducers: {
    updateData(state, action) {
      return {
        picture:action.payload,
      };
    },
  },
};

export default picture;
