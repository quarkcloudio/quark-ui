import React, { useContext, useState, useEffect, useRef } from 'react';
import styles from './FormPage.less';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import router from 'umi/router';
import { Editor } from '@tinymce/tinymce-react';
import {
  createFromIconfontCN,
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

const Iconfont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js', // 在 iconfont.cn 上生成
});

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
        initialValues:[],
        data:[]
      }
    }
  };
  routes:any;
  loading: boolean;
  dispatch: Dispatch<any>;
}

const FormPage: React.SFC<FormPageProps> = props => {

  // 上传图片文件
  const [formSingleImages, changeSingleImage] = useState([]);
  const [formMultipleImages, changeMultipleImage] = useState([]);
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
          if(formMultipleImages[item.name]) {
            let list:any = [];
            let multipleImages:any = [];
            multipleImages = formMultipleImages[item.name];
            multipleImages.map((fileInfo:any,fileKey:any) => {
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
          if(formSingleImages[item.name]) {
            values[item.name] = formSingleImages[item.name];
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
          form.resetFields();
          props.closeModal();
        }
      }
    });
  };

  const handleCancel = () => {
    changePreviewVisible(false);
    changePreviewImage('');
  };

  const handleEditorChange = (content:any, editor:any) => {
    console.log('Content was updated:', content);
  }

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
              help={item.help ? item.help : undefined}
            >
              <Input
                placeholder={item.placeholder}
                style={item.style ? item.style : []}
              />
            </Form.Item>
          )
        }

        if(item.component == 'inputNumber') {
          return (
            <Form.Item
              key={item.name}
              label={item.label}
              name={item.name}
              rules={item.frontendRules}
              help={item.help ? item.help : undefined}
            >
              <InputNumber
                size={item.size}
                style={item.style}
                max={item.max}
                min={item.min}
                step={item.step}
                placeholder={item.placeholder}
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
              help={item.help ? item.help : undefined}
            >
              <Radio.Group style={item.style ? item.style : []} options={item.options} />
            </Form.Item>
          )
        }

        if(item.component == 'select') {
          return (
            <Form.Item
              key={item.name}
              label={item.label}
              name={item.name}
              rules={item.frontendRules}
              help={item.help ? item.help : undefined}
            >
              <Select mode={item.mode} style={item.style ? item.style : []}>
                {item.options.map((item:any) => {
                  return (<Option key={item.value} value={item.value}>{item.label}</Option>)
                })}
              </Select>
            </Form.Item>
          )
        }

        if(item.component == 'icon') {
          return (
            <Form.Item
              key={item.name}
              label={item.label}
              name={item.name}
              rules={item.frontendRules}
              help={item.help ? item.help : undefined}
            >
              <Select style={item.style ? item.style : []}>
                {item.options.map((item:any) => {
                  return (<Option key={item} value={item}><Iconfont type={item} /> {item}</Option>)
                })}
              </Select>
            </Form.Item>
          )
        }

        if(item.component == 'switch') {
          return (
            <Form.Item
              key={item.name}
              label={item.label}
              name={item.name}
              extra={item.extra}
              help={item.help ? item.help : undefined}
              rules={item.frontendRules}
              valuePropName={'checked'}
            >
              <Switch
                checkedChildren={item.options.on}
                unCheckedChildren={item.options.off}
              />
            </Form.Item>
          )
        }

        if(item.component == "textArea") {
          return (
            <Form.Item
              key={item.name}
              label={item.label}
              name={item.name}
              extra={item.extra}
              help={item.help ? item.help : undefined}
              rules={item.frontendRules}
            >
              <TextArea style={item.style} rows={item.rows} placeholder={item.placeholder} />
            </Form.Item>
          );
        }

        if(item.component == "tree") {
          return (
            <Form.Item
              key={item.name}
              label={item.label}
              name={item.name}
              valuePropName={"defaultCheckedKeys"}
              trigger={"onCheck"}
              rules={item.frontendRules}
              help={item.help ? item.help : undefined}
            >
              <Tree
                checkable
                style={item.style ? item.style : []}
                treeData={item.treeData}
              />
            </Form.Item>
          );
        }

        if(item.component == "editor") {
          return (
            <Form.Item
              key={item.name}
              label={item.label}
              name={item.name}
              rules={item.frontendRules}
            >
              <Editor
                initialValue="<p>This is the initial content of the editor</p>"
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                  ],
                  toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help'
                }}
                onEditorChange={handleEditorChange}
              />
            </Form.Item>
          );
        }

        if(item.component == "image") {
          // 多图片上传模式
          if(item.mode == "multiple") {
            let uploadButton = (
              <div>
                <Iconfont type={'icon-plus-circle'} />
                <div className="ant-upload-text">{item.button}</div>
              </div>
            );
            let multipleImages:any = [];
            if(formMultipleImages[item.name]) {
              multipleImages = formMultipleImages[item.name]
            } else {
              if(content.body.form.data) {
                if(content.body.form.data[item.name]) {
                  multipleImages = content.body.form.data[item.name]
                }
              } else {
                multipleImages = formMultipleImages[item.name]
              }
            }
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
                  fileList={multipleImages}
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
                    changeMultipleImage(getFileList);
                  }}
                >
                  {multipleImages >= 3 ? null : uploadButton}
                </Upload>
              </Form.Item>
            );
          } else {
            // 单图片上传模式
            let uploadButton = (
              <div>
                <Iconfont type={'icon-plus-circle'} />
                <div className="ant-upload-text">{item.button}</div>
              </div>
            );
            let singleImages:any = [];
            if(formSingleImages[item.name]) {
              singleImages = formSingleImages[item.name]
            } else {
              if(content.body.form.data) {
                if(content.body.form.data[item.name]) {
                  singleImages = content.body.form.data[item.name]
                }
              } else {
                singleImages = formSingleImages[item.name]
              }
            }
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
                        changeSingleImage(fileInfo);
                      } else {
                        message.error(info.file.response.msg);
                      }
                    }
                  }}
                >
                  {singleImages ? (
                    <img src={singleImages.url} alt={singleImages.name} width={80} />
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
      <Modal
        visible={previewVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <img style={{ width: '100%' }} src={previewImage} />
      </Modal>
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