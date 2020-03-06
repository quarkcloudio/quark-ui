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
    loading:boolean,
  };
  subscriptions:{ setup: Subscription };
  effects: {
    info: Effect;
    submit: Effect;
  };
  reducers: {
    updateShow: Reducer<{}>;
    changePageLoading: Reducer<{}>;
  };
}

const show: ModelType = {
  namespace: 'show',
  state: {
    content:{
      title:false,
      subTitle:false,
      description:false,
      breadcrumb:false,
      body:{
        show:{
          title:false,
          layout:false,
          items:[]
        }
      }
    },
    routes:[],
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
          type: 'updateShow',
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
    updateShow(state, action) {
      return {
        ...action.payload,
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

export default show;
