import React, { useContext, useState, useEffect, useRef } from 'react';
import styles from './FormPage.less';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import router from 'umi/router';
import { 
  PlusOutlined,
} from '@ant-design/icons';

import {
  Card,
  Spin,
  InputNumber,
  DatePicker,
  Tabs,
  Switch,
  Form,
  Select,
  Input,
  Button,
  Checkbox,
  Radio,
  Upload,
  message,
  Modal,
  Tree,
  Cascader,
  Breadcrumb
} from 'antd';

const { TextArea } = Input;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const { TreeNode } = Tree;

export interface FormPageProps {
  type:string|undefined;
  api: string;
  search?:any;
  closeModal?:any;
  content: {
    title:string,
    subTitle:string,
    description:string,
    breadcrumb:any,
    body:{
      form: {
        title:string,
        layout:any,
        items:any,
        action:string,
        disableSubmit:any,
        disableReset:any,
        initialValues:[]
      }
    }
  };
  routes:any;
  loading: boolean;
  dispatch: Dispatch<any>;
}

const FormPage: React.SFC<FormPageProps> = props => {

  // 上传图片文件
  const [formSingleFiles, changeSingleFile] = useState([]);
  const [formMultipleFiles, changeMultipleFile] = useState([]);
  const [previewVisible, changePreviewVisible] = useState(false);
  const [previewImage, changePreviewImage] = useState('');

  const {
    type,
    api,
    search,
    content,
    routes,
    loading,
    dispatch
  } = props;

  const [form] = Form.useForm();

  /**
   * constructor
   */
  useEffect(() => {
    dispatch({
      type: 'form/info',
      payload: {
        actionUrl: api,
        ...search
      },
      callback: (res:any) => {
        form.setFieldsValue(res.data.content.body.form.data);
      }
    });
  }, [dispatch, api, search]); // eslint-disable-line 

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values:any) => {
    
    content.body.form.items.map((item:any,key:any) => {
      if(item.component == 'image') {
        if(item.mode == "multiple") {
          // 多图
          if(formMultipleFiles[item.name]) {
            let list:any = [];
            let multipleFiles:any = [];
            multipleFiles = formMultipleFiles[item.name];
            multipleFiles.map((fileInfo:any,fileKey:any) => {
              let getFileInfo:any = [];
              getFileInfo['id'] = fileInfo.id;
              getFileInfo['name'] = fileInfo.name;
              getFileInfo['size'] = fileInfo.size;
              getFileInfo['url'] = fileInfo.url;
              list[fileKey] = getFileInfo;
            })
            values[item.name] = list;
          } else {
            values[item.name] = [];
          }
        } else {
          // 单图
          if(formSingleFiles[item.name]) {
            values[item.name] = formSingleFiles[item.name];
          } else {
            values[item.name] = [];
          }
        }
      }

      if(item.component == 'datePicker') {
        if(values[item.name]) {
          values[item.name] = values[item.name].format('YYYY-MM-DD HH:mm:ss');
        }
      }

      if(item.component == 'rangePicker') {
        if (values[item.name]) {
          if (values[item.name][0] && values[item.name][1]) {
            // 时间标准化
            let dateStart = values[item.name][0].format('YYYY-MM-DD HH:mm:ss');
            let dateEnd = values[item.name][1].format('YYYY-MM-DD HH:mm:ss');
            // 先清空对象
            values[item.name] = [];
            // 重新赋值对象
            values[item.name] = [dateStart, dateEnd];
          }
        }
      }

      if(item.component == 'editor') {
        values[item.name] = values[item.name].toHTML();
      }
    })

    dispatch({
      type: 'form/submit',
      payload: {
        actionUrl: content.body.form.action,
        ...values
      },
      callback: (res:any) => {
        if(type == 'modal') {
          props.closeModal();
        }
      }
    });
  };

  const handleCancel = () => {
    changePreviewVisible(false);
    changePreviewImage('');
  };

  let formComponent = null;
  if(content) {
    formComponent =
    <Form {...content.body.form.layout} form={form} onFinish={onFinish} initialValues={content.body.form.initialValues}>
      {!!content.body.form.items && content.body.form.items.map((item:any) => {
        if(item.component == 'id') {
          return (
            <Form.Item
              style={{display:'none'}}
              key={item.name}
              name={item.name}
            >
              <Input/>
            </Form.Item>
          )
        }

        if(item.component == 'input') {
          return (
            <Form.Item
              key={item.name}
              label={item.label}
              name={item.name}
              rules={item.frontendRules}
            >
              <Input
                placeholder={item.placeholder}
                style={item.style ? item.style : []}
              />
            </Form.Item>
          )
        }

        if(item.component == 'radio') {
          return (
            <Form.Item
              key={item.name}
              label={item.label}
              name={item.name}
              rules={item.frontendRules}
            >
              <Radio.Group options={item.options} />
            </Form.Item>
          )
        }

        if(item.component == "textArea") {
          return (
            <Form.Item
              key={item.name}
              label={item.labelName}
              name={item.name}
              extra={item.extra}
              rules={item.frontendRules}
            >
              <TextArea style={item.style} rows={item.rows} placeholder={item.placeholder} />
            </Form.Item>
          );
        }

        if(item.component == "image") {

          // 多图片上传模式
          if(item.mode == "multiple") {
            if(item.value) {
              changeMultipleFile(item.value);
            }

            let uploadButton = (
              <div>
                <PlusOutlined />
                <div className="ant-upload-text">{item.button}</div>
              </div>
            );
            return (
              <Form.Item 
                key={item.name}
                label={item.label}
                name={item.name}
                extra={item.extra}
              >
                <Upload
                  name={'file'}
                  listType={"picture-card"}
                  fileList={formMultipleFiles[item.name]}
                  multiple={true}
                  onPreview={(file:any) => {
                    changePreviewImage(file.url || file.thumbUrl);
                    changePreviewVisible(true);
                  }}
                  action={'/api/admin/picture/upload'}
                  headers={{authorization: 'Bearer ' + sessionStorage['token']}}
                  beforeUpload = {(file:any) => {
                    let canUpload = false;
                    for(var i = 0; i < item.limitType.length; i++) {
                      if(item.limitType[i] == file.type) {
                        canUpload = true;
                      }
                    }
                    if (!canUpload) {
                      message.error('请上传正确格式的图片!');
                      return false;
                    }
                    const isLtSize = file.size / 1024 / 1024 < item.limitSize;
                    if (!isLtSize) {
                      message.error('图片大小不可超过'+item.limitSize+'MB!');
                      return false;
                    }
                    return true;
                  }}
                  onChange = {(info:any) => {
                    let fileList = info.fileList;
                    fileList = fileList.slice(-item.limitNum);
                    fileList = fileList.map((file:any) => {
                      if (file.response) {
                        file.id = file.response.data.id;
                        file.name = file.response.data.name;
                        file.url = file.response.data.url;
                        file.size = file.response.data.size;
                      }
                      return file;
                    });
  
                    fileList = fileList.filter((file:any) => {
                      if (file.response) {
                        return file.response.status === 'success';
                      }
                      return true;
                    });

                    let getFileList:any = [];
                    getFileList[item.name] = fileList;
                    changeMultipleFile(getFileList);
                  }}
                >
                  {formMultipleFiles[item.name] >= 3 ? null : uploadButton}
                </Upload>
                <Modal
                  visible={previewVisible}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </Form.Item>
            );
          } else {

            if(item.value) {
              changeSingleFile(item.value);
            }

            // 单图片上传模式
            let uploadButton = (
              <div>
                <PlusOutlined />
                <div className="ant-upload-text">{item.button}</div>
              </div>
            );

            return (
              <Form.Item
                key={item.name}
                label={item.label}
                extra={item.extra}
              >
                <Upload
                  name={'file'}
                  listType={"picture-card"}
                  showUploadList={false}
                  action={'/api/admin/picture/upload'}
                  headers={{authorization: 'Bearer ' + sessionStorage['token']}}
                  beforeUpload = {(file:any) => {
                    let canUpload = false;
                    for(var i = 0; i < item.limitType.length; i++) {
                      if(item.limitType[i] == file.type) {
                        canUpload = true;
                      }
                    }
                    if (!canUpload) {
                      message.error('请上传正确格式的图片!');
                      return false;
                    }
                    const isLtSize = file.size / 1024 / 1024 < item.limitSize;
                    if (!isLtSize) {
                      message.error('图片大小不可超过'+item.limitSize+'MB!');
                      return false;
                    }
                    return true;
                  }}
                  onChange = {(info:any) => {
                    if (info.file.status === 'done') {
                      if (info.file.response.status === 'success') {
                        let fileInfo:any = [];
                        fileInfo[item.name] = info.file.response.data;
                        console.log(fileInfo);
                        changeSingleFile(fileInfo);
                      } else {
                        message.error(info.file.response.msg);
                      }
                    }
                  }}
                >
                  {formSingleFiles[item.name] ? (
                    <img src={formSingleFiles[item.name].url} alt={formSingleFiles[item.name].name} width={80} />
                  ) : (uploadButton)}
                </Upload>
              </Form.Item>
            );
          }
        }

      })}
      {(!content.body.form.disableSubmit && !content.body.form.disableReset) ? 
        <Form.Item
          wrapperCol={
            { offset: 3, span: 21 }
          }
        >
          <Button
            type="primary"
            htmlType="submit"
          >
            提交
          </Button>
          <Button
            htmlType="button"
            onClick={onReset}
            style={{marginLeft:'8px'}}
          >
            重置
          </Button>
        </Form.Item>
      : null}
      {(!content.body.form.disableSubmit && content.body.form.disableReset) ?
        <Form.Item
          wrapperCol={
            { offset: 3, span: 21 }
          }
        >
          <Button
            type="primary"
            htmlType="submit"
          >
            提交
          </Button>
        </Form.Item>
      : null}
      {(content.body.form.disableSubmit && !content.body.form.disableReset) ? 
        <Form.Item
          wrapperCol={
            { offset: 3, span: 21 }
          }
        >
          <Button
            htmlType="button"
            onClick={onReset}
          >
            重置
          </Button>
        </Form.Item>
      : null}
    </Form>
  }

  return (
    <Spin spinning={loading} tip="Loading..." style={{width:'100%',marginTop:'200px'}}>
      {content ?
        <span>
          {(type == 'page') ?
            <PageHeaderWrapper
              title={content ? content.title : false}
              subTitle={content.subTitle}
              content={content.description}
              breadcrumb={{routes}}
            >
              <Card
                size="small"
                title={content.body.form.title}
                bordered={false}
                extra={<Button type="link" onClick={(e) => router.go(-1)}>返回上一页</Button>}
              >
                {formComponent}
              </Card>
            </PageHeaderWrapper>
          :
            <span>
              {formComponent}
            </span>
          }
        </span>
      : null}
    </Spin>
  );
};

function mapStateToProps(state:any) {
  const {
    content,
    routes,
    loading,
  } = state.form;

  return {
    content,
    routes,
    loading,
  };
}

export default connect(mapStateToProps)(FormPage);