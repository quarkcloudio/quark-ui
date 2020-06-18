import { Reducer } from 'redux';
import { Effect,Subscription } from 'dva';
import { history } from 'umi';
import { message } from 'antd';
import moment from 'moment';
import { 
  get,
  post,
} from '@/services/action';

export interface ModelType {
  namespace: string;
  state: {
    content?:any,
    routes?:any,
    formImages:any,
    formFiles:any,
    formSearchOptions:any,
    formMapPosition:any,
    loading:boolean,
    pageRandom:any,
  };
  subscriptions:{ setup: Subscription };
  effects: {
    info: Effect;
    submit: Effect;
    updateSearchOptions: Effect;
  };
  reducers: {
    updateImages: Reducer<{}>;
    updateFiles: Reducer<{}>;
    updateSearchOptions: Reducer<{}>;
    updateMapPosition: Reducer<{}>;
    updateForm: Reducer<{}>;
    resetForm: Reducer<{}>;
    changePageLoading: Reducer<{}>;
  };
}

const form: ModelType = {
  namespace: 'form',
  state: {
    content:{
      title:false,
      subTitle:false,
      description:false,
      breadcrumb:false,
      body:{
        form:{
          title:false,
          layout:false,
          items:[],
          initialValues:[]
        }
      }
    },
    routes:[],
    formImages:[],
    formFiles:[],
    formSearchOptions:[],
    formMapPosition:[],
    loading:true,
    pageRandom:1
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

        let formImages:any = [];
        let formFiles:any = [];
        let formSearchOptions:any = [];
        let formMapPosition:any = [];

        if (callback && typeof callback === 'function') {

          if(response.data.content.body.form.tab) {
            response.data.content.body.form.tab.map((tab:any,key:any) => {
              tab.items.map((item:any,key:any) => {

                if(item.component == 'image') {
                  if(response.data.content.body.form.data[item.name]) {
                    formImages[item.name] = response.data.content.body.form.data[item.name];
                  }

                  if(item.value) {
                    formImages[item.name] = item.value;
                  }
                }

                if(item.component == 'file') {
                  if(response.data.content.body.form.data[item.name]) {
                    formFiles[item.name] = response.data.content.body.form.data[item.name];
                  }

                  if(item.value) {
                    formFiles[item.name] = item.value;
                  }
                }

                if(item.component == 'search') {
                  formSearchOptions[item.name] = item.options;
                }

                if(item.component == 'map') {
                  let position = {
                    longitude:item.value.longitude,
                    latitude:item.value.latitude
                  }
                  formMapPosition[item.name] = position;
                }

                if(item.component == 'datetime') {
                  if(response.data.content.body.form.data[item.name]) {
                    response.data.content.body.form.data[item.name] = moment(response.data.content.body.form.data[item.name], item.format);
                  } else {
                    response.data.content.body.form.data[item.name] = moment();
                  }

                  if(item.value) {
                    response.data.content.body.form.data[item.name] = moment(item.value, item.format);
                  }
                }

                if(item.component == 'datetimeRange' || item.component == 'timeRange') {
                  if(item.value[0] && item.value[1]) {
                    response.data.content.body.form.data[item.name] = 
                    [
                      moment(item.value[0], item.format),
                      moment(item.value[1], item.format)
                    ]
                  }
                }
          
              })
            })
          } else {
            response.data.content.body.form.items.map((item:any,key:any) => {
      
              if(item.component == 'image') {
                if(response.data.content.body.form.data[item.name]) {
                  formImages[item.name] = response.data.content.body.form.data[item.name];
                }

                if(item.value) {
                  formImages[item.name] = item.value;
                }
              }

              if(item.component == 'file') {
                if(response.data.content.body.form.data[item.name]) {
                  formFiles[item.name] = response.data.content.body.form.data[item.name];
                }

                if(item.value) {
                  formFiles[item.name] = item.value;
                }
              }

              if(item.component == 'search') {
                formSearchOptions[item.name] = item.options;
              }

              if(item.component == 'map') {
                let position = {
                  longitude:item.value.longitude,
                  latitude:item.value.latitude
                }
                formMapPosition[item.name] = position;
              }

              if(item.component == 'datetime') {
                if(response.data.content.body.form.data[item.name]) {
                  response.data.content.body.form.data[item.name] = moment(response.data.content.body.form.data[item.name], item.format);
                } else {
                  response.data.content.body.form.data[item.name] = moment();
                }

                if(item.value) {
                  response.data.content.body.form.data[item.name] = moment(item.value, item.format);
                }
              }
        
              if(item.component == 'datetimeRange' || item.component == 'timeRange') {
                if(item.value[0] && item.value[1]) {
                  response.data.content.body.form.data[item.name] = 
                  [
                    moment(item.value[0], item.format),
                    moment(item.value[1], item.format)
                  ]
                }
              }

            })
          }

          callback(response); // 返回结果
        }

        const data = { 
          ...response.data,
          routes:response.data.content.breadcrumb,
          loading:false,
          formImages: formImages,
          formFiles:formFiles,
          formSearchOptions:formSearchOptions,
          formMapPosition:formMapPosition
        };

        yield put({
          type: 'updateForm',
          payload: data,
        });

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
          history.push(response.url);
        }
        if (callback && typeof callback === 'function') {
          callback(response); // 返回结果
        }
      } else {
        message.error(response.msg, 3);
      }
    },
    *updateSearchOptions({ payload, callback }, { put, call }) {
      const response = yield call(get, payload);
      const data = { data:response.data,itemName:payload.itemName};

      yield put({
        type: 'updateSearchOptions',
        payload: data,
      });
    },
  },
  reducers: {
    updateImages(state:any, action:any) {
      state.formImages[action.payload.itemName] = action.payload.images;
      state.pageRandom = Math.random();
      return {
        ...state,
      };
    },
    updateFiles(state:any, action:any) {
      state.formFiles[action.payload.itemName] = action.payload.files;
      state.pageRandom = Math.random();
      return {
        ...state,
      };
    },
    updateSearchOptions(state:any, action:any) {
      state.formSearchOptions[action.payload.itemName] = action.payload.data;
      state.pageRandom = Math.random();
      return {
        ...state,
      };
    },
    updateMapPosition(state:any, action:any) {
      let position = {
        longitude:action.payload.longitude,
        latitude:action.payload.latitude
      }
      state.formMapPosition[action.payload.itemName] = position;
      state.pageRandom = Math.random();

      return {
        ...state,
      };
    },
    updateForm(state, action) {
      return {
        ...action.payload,
      };
    },
    resetForm(state, action) {
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
