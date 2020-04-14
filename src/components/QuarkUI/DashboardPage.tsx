import React, { useContext, useState, useEffect, useRef } from 'react';
import styles from './DashboardPage.less';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import router from 'umi/router';
import { Editor } from '@tinymce/tinymce-react';
import {
  UploadOutlined,
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
  Breadcrumb,
  Row,
  Col,
  Divider,
  Menu,
  Pagination,
  Popconfirm
} from 'antd';

import locale from 'antd/es/date-picker/locale/zh_CN';

const { SubMenu } = Menu;
const { Meta } = Card;

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
        tab:any,
        data:[]
      }
    }
  };
  formImages:any;
  formFiles:any;
  picture:any;
  routes:any;
  loading: boolean;
  dispatch: Dispatch<any>;
  pageRandom:string;
}

const FormPage: React.SFC<FormPageProps> = props => {

  // 上传图片文件
  const [previewVisible, changePreviewVisible] = useState(false);
  const [previewImage, changePreviewImage] = useState('');
  const [pictureBoxVisible, changePictureBoxVisible] = useState(false);
  const [tinymceEditor, setTinymceEditor] = useState({insertContent(value:any){return value;}});

  const {
    type,
    api,
    search,
    content,
    picture,
    routes,
    formImages,
    formFiles,
    loading,
    dispatch,
    pageRandom
  } = props;

  const [form] = Form.useForm();
  const [searchPictureForm] = Form.useForm();
  const [checkPictureForm] = Form.useForm();
  
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

  const parseValues = (values:any,items:any) => {
    items.map((item:any,key:any) => {
      if(item.component == 'image') {
        if(item.mode == "multiple") {
          // 多图
          if(formImages[item.name]) {
            let list:any = [];
            let multipleImages:any = [];
            multipleImages = formImages[item.name];
            multipleImages.map((fileInfo:any,fileKey:any) => {
              let getFileInfo:any = [];
              getFileInfo['id'] = fileInfo.id;
              getFileInfo['name'] = fileInfo.name;
              getFileInfo['size'] = fileInfo.size;
              getFileInfo['url'] = fileInfo.url;
              list[fileKey] = fileInfo.id;
            })
            values[item.name] = list;
          } else {
            values[item.name] = [];
          }
        } else {
          // 单图
          if(formImages[item.name]) {
            values[item.name] = formImages[item.name]['id'];
          } else {
            values[item.name] = 0;
          }
        }
      }

      if(item.component == 'file') {
        if(item.mode == "multiple") {
          // 多文件
          if(formFiles[item.name]) {
            let list:any = [];
            let files:any = [];
            files = formFiles[item.name];
            files.map((fileInfo:any,fileKey:any) => {
              let getFileInfo:any = [];
              getFileInfo['id'] = fileInfo.id;
              getFileInfo['name'] = fileInfo.name;
              getFileInfo['size'] = fileInfo.size;
              getFileInfo['url'] = fileInfo.url;
              list[fileKey] = fileInfo.id;
            })
            values[item.name] = list;
          } else {
            values[item.name] = [];
          }
        } else {
          // 单文件
          if(formFiles[item.name]) {
            values[item.name] = formFiles[item.name][0]['id'];
          } else {
            values[item.name] = 0;
          }
        }
      }

      if(item.component == 'datetime') {
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
        if (values[item.name]) {
          if(values[item.name].level) {
            values[item.name] = values[item.name].level.content;
          }
        }
      }

    })

    return values;
  };

  const onFinish = (values:any) => {
    
    if(content.body.form.tab) {
      content.body.form.tab.map((tab:any,key:any) => {
        values = parseValues(values,tab.items);
      })
    } else {
      values = parseValues(values,content.body.form.items);
    }

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

  const getPictures = (page:any = 1,search:any = null) => {
    dispatch({
      type: 'picture/info',
      payload: {
        actionUrl: 'admin/picture/getLists',
        page:page,
        ...search
      }
    });
  };

  const insertPicture = (e:any) => {
    if(tinymceEditor) {
      const checkPictures = checkPictureForm.getFieldValue('checkPictures');

      if(checkPictures) {
        let html = '';
        checkPictures.map((item:any) => {
          picture.lists.map((pictureItem:any) => {
            if(pictureItem.id==item) {
              html = html+'<img src="'+pictureItem.path+'" />'
            }
          })
        })
        tinymceEditor.insertContent(html);
      }
    }

    checkPictureForm.resetFields();
    changePictureBoxVisible(false);
  };

  const closePictureBox = (e:any) => {
    changePictureBoxVisible(false);
  };

  const handleCancel = () => {
    changePreviewVisible(false);
    changePreviewImage('');
  };

  const editorExecCommand = (content:any, editor:any) => {
    if(sessionStorage['editorCommand'] == 'multipleimage') {
      changePictureBoxVisible(true);
      getPictures();
      setTinymceEditor(editor);
      checkPictureForm.resetFields();
      sessionStorage.removeItem('editorCommand');
    }
  };

  const onSearchPicture = (values:any) => {

    if (values['pictureSearchDate']) {
      if (values['pictureSearchDate'][0] && values['pictureSearchDate'][1]) {
        // 时间标准化
        let dateStart = values['pictureSearchDate'][0].format('YYYY-MM-DD HH:mm:ss');
        let dateEnd = values['pictureSearchDate'][1].format('YYYY-MM-DD HH:mm:ss');
        // 先清空对象
        values['pictureSearchDate'] = [];
        // 重新赋值对象
        values['pictureSearchDate'] = [dateStart, dateEnd];
      }
    }

    getPictures(1,values);
  };

  // 分页切换
  const changePagination = (page:any) => {
    getPictures(page);
  };

  const onSelectAllPictures = () => {
    let data:any = []
    picture.lists.map(function (item:any) {
      data.push(item.id)
    })

    let checkPictures = [];
    checkPictures = checkPictureForm.getFieldValue('checkPictures');
    if(checkPictures) {
      if(checkPictures.length == picture.lists.length) {
        checkPictureForm.resetFields();
      } else {
        checkPictureForm.setFieldsValue({'checkPictures':data});
      }
    } else {
      checkPictureForm.setFieldsValue({'checkPictures':data});
    }

  };

  const toggleChecked = (id:any) => {
    let checkPictures = checkPictureForm.getFieldValue('checkPictures');
    if(checkPictures) {
      let pos = checkPictures.indexOf(id);
      if (pos < 0) {
        checkPictures.push(id);
      } else {
        checkPictures.splice(pos, 1);
      }
    } else {
      checkPictures = [];
      checkPictures.push(id);
    }

    let data:any = []
    checkPictures.map(function (item:any) {
      data.push(item)
      console.log(item);
    })

    checkPictureForm.setFieldsValue({'checkPictures':data});
  };

  const onDeletePicture = (id:any = null) => {

    if(id == null) {
      message.error('请选择数据', 3);
      return false;
    }

    dispatch({
      type: 'picture/delete',
      payload: {
        actionUrl: 'admin/picture/delete',
        id:id
      },
      callback: (res:any) => {
        getPictures(1);
      }
    });
  };

  const onDeletePictures = (e:any) => {

    e.persist();

    let ids = null;

    ids = checkPictureForm.getFieldValue('checkPictures');

    if(ids == null) {
      message.error('请选择数据', 3);
      return false;
    }

    dispatch({
      type: 'picture/delete',
      payload: {
        actionUrl: 'admin/picture/delete',
        id:ids
      },
      callback: (res:any) => {
        getPictures(1);
      }
    });
  };

  const formItem = (items:any) => {
    let formItem = null;
    if(items) {
      formItem = 
      <span>
        {!!items && items.map((item:any) => {
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
                extra={item.extra}
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
                extra={item.extra}
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
                extra={item.extra}
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
                extra={item.extra}
              >
                <Select mode={item.mode} style={item.style ? item.style : []}>
                  {item.options.map((item:any) => {
                    return (<Option key={item.value} value={item.value}>{item.label}</Option>)
                  })}
                </Select>
              </Form.Item>
            )
          }
  
          if(item.component == "checkbox") {
            return (
              <Form.Item 
                key={item.name}
                label={item.label}
                name={item.name}
                rules={item.frontendRules}
                help={item.help ? item.help : undefined}
                extra={item.extra}
              >
                <Checkbox.Group style={item.style ? item.style : []}>
                  {!!item.options && item.options.map((item:any) => {
                  return (<Checkbox key={item.value} value={item.value}>{item.label}</Checkbox>)
                  })}
                </Checkbox.Group>
              </Form.Item>
            );
          }
  
          if(item.component == 'icon') {
            return (
              <Form.Item
                key={item.name}
                label={item.label}
                name={item.name}
                rules={item.frontendRules}
                help={item.help ? item.help : undefined}
                extra={item.extra}
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
  
          if(item.component == "datetime") {
            return (
              <Form.Item 
                key={item.name}
                label={item.label}
                name={item.name}
                help={item.help ? item.help : undefined}
                extra={item.extra}
                rules={item.frontendRules}
              >
                <DatePicker
                  showTime={...item.showTime}
                  size={item.size}
                  locale={locale}
                  format={item.format}
                  placeholder={item.placeholder}
                />
              </Form.Item>
            );
          }

          if(item.componentName == "datetimeRange") {
            return (
              <Form.Item 
                key={item.name}
                label={item.label}
                name={item.name}
                help={item.help ? item.help : undefined}
                extra={item.extra}
                rules={item.frontendRules}
              >
                <RangePicker
                  showTime={...item.showTime}
                  size={item.size}
                  locale={locale}
                  format={item.format}
                />
              </Form.Item>
            );
          }

          if(item.component == "textArea") {
            return (
              <Form.Item
                key={item.name}
                label={item.label}
                name={item.name}
                help={item.help ? item.help : undefined}
                extra={item.extra}
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
                valuePropName={"checkedKeys"}
                trigger={"onCheck"}
                rules={item.frontendRules}
                help={item.help ? item.help : undefined}
                extra={item.extra}
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
                help={item.help ? item.help : undefined}
                extra={item.extra}
              >
                <Editor
                  key={item.name}
                  init={{
                    language: 'zh_CN',
                    height: item.height ? item.height : 500 ,
                    width: item.width ? item.width :'100%',
                    plugins: [
                      'advlist autolink lists link charmap print preview anchor image',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount multipleimage'
                    ],
                    menu: {
                        insert: {title: '插入', items: 'multipleimage link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime'},
                    },
                    toolbar:
                      'undo redo | formatselect | bold italic backcolor | \
                      alignleft aligncenter alignright alignjustify | \
                      bullist numlist outdent indent | removeformat | help',
                    fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt'
                  }}
                  onExecCommand={editorExecCommand}
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

              return (
                <Form.Item 
                  key={item.name}
                  label={item.label}
                  name={item.name}
                  help={item.help ? item.help : undefined}
                  extra={item.extra}
                >
                  <Upload
                    name={'file'}
                    listType={"picture-card"}
                    fileList={formImages[item.name]}
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

                      dispatch({
                        type: 'form/updateImages',
                        payload: {
                          images : fileList,
                          itemName : item.name
                        }
                      });

                    }}
                  >
                    {formImages[item.name] >= 3 ? null : uploadButton}
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

              return (
                <Form.Item
                  key={item.name}
                  label={item.label}
                  help={item.help ? item.help : undefined}
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
                        console.log(file.type);
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

                          dispatch({
                            type: 'form/updateImages',
                            payload: {
                              images : info.file.response.data,
                              itemName : item.name
                            }
                          });

                        } else {
                          message.error(info.file.response.msg);
                        }
                      }
                    }}
                  >
                    {formImages[item.name] ? (
                      <img src={formImages[item.name].url} alt={formImages[item.name].name} width={80} />
                    ) : (uploadButton)}
                  </Upload>
                </Form.Item>
              );
            }
          }
  
          if(item.component=='file') {
            return (
              <Form.Item 
                label={item.label}
                help={item.help}
                extra={item.extra}
              >
                <Upload
                  name={'file'}
                  fileList={formFiles[item.name]}
                  multiple={true}
                  action={'/api/admin/file/upload'}
                  headers={{authorization: 'Bearer ' + sessionStorage['token']}}
                  beforeUpload = {(file:any) => {
                    let canUpload = false;
                    for(var i = 0; i < item.limitType.length; i++) {
                      console.log(file.type);
                      if(item.limitType[i] == file.type) {
                        canUpload = true;
                      }
                    }
                    if (!canUpload) {
                      message.error('请上传正确格式的文件!');
                      return false;
                    }
                    const isLtSize = file.size / 1024 / 1024 < item.limitSize;
                    if (!isLtSize) {
                      message.error('文件大小不可超过'+item.limitSize+'MB!');
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

                    dispatch({
                      type: 'form/updateFiles',
                      payload: {
                        files : fileList,
                        itemName : item.name
                      }
                    });

                  }}
                >
                  <Button>
                    <Iconfont type={'icon-upload'} /> {item.button}
                  </Button>
                </Upload>
              </Form.Item>
            );
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
      </span>
    }

    return formItem;
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
              {content.body.form.tab ?
                <div className={styles.container}>
                  <Form {...content.body.form.layout} form={form} onFinish={onFinish} initialValues={content.body.form.initialValues}>
                    <Tabs defaultActiveKey="1" tabBarExtraContent={<Button type="link" onClick={(e) => router.go(-1)}>返回上一页</Button>}>
                      {content.body.form.tab.map((tab:any,index:any) => {
                        return (
                          <TabPane tab={tab.title} key={(index+1).toString()}>
                            {formItem(tab.items)}
                          </TabPane>
                        )
                      })}
                    </Tabs>
                  </Form>
                </div>
              :
                <Card
                  size="small"
                  title={content.body.form.title}
                  bordered={false}
                  extra={<Button type="link" onClick={(e) => router.go(-1)}>返回上一页</Button>}
                >
                  <Form {...content.body.form.layout} form={form} onFinish={onFinish} initialValues={content.body.form.initialValues}>
                    {formItem(content.body.form.items)}
                  </Form>
                </Card>
              }
            </PageHeaderWrapper>
          :
            <span>
              <Form {...content.body.form.layout} form={form} onFinish={onFinish} initialValues={content.body.form.initialValues}>
                {formItem(content.body.form.items)}
              </Form>
            </span>
          }
        </span>
      : null}

      <Modal
        title="图片管理"
        visible={pictureBoxVisible}
        onOk={insertPicture}
        onCancel={closePictureBox}
        width={1100}
      >
        <Row gutter={20}>
          <Col span={4}>
            <Menu
              style={{ width: '100%' }}
              defaultSelectedKeys={['1']}
              mode="inline"
            >
              <Menu.Item key="0">所有图片</Menu.Item>
              {!!picture && picture.categorys.map((category:any) => {
                return(<Menu.Item key={category.id}>{category.title}</Menu.Item>)
              })}
            </Menu>
          </Col>
          <Col span={20}>
            <Row gutter={16}>
              <Col span={24}>
                <span style={{float:'left'}}>
                  <Form layout="inline" form={searchPictureForm} onFinish={onSearchPicture}>
                    <Form.Item>
                      <Button onClick={onSelectAllPictures}>
                        全选
                      </Button>
                    </Form.Item>
                    <Form.Item
                      name='pictureSearchDate'
                    >
                      <RangePicker />
                    </Form.Item>
                    <Form.Item
                      name='pictureSearchName'
                    >
                      <Input placeholder="文件名称" />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        htmlType="submit"
                        type="primary"
                      >
                        搜索
                      </Button>
                    </Form.Item>
                  </Form>
                </span>
                <span style={{float:'right'}}>
                  <Popconfirm
                    title="确认要删除这些数据吗？"
                    onConfirm={onDeletePictures}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button type="primary" danger>
                      删除
                    </Button>
                  </Popconfirm>
                  &nbsp;&nbsp;&nbsp;&nbsp;

                  <Upload
                    showUploadList={false}
                    name={'file'}
                    multiple={true}
                    action={'/api/admin/picture/upload'}
                    headers={{authorization: 'Bearer ' + sessionStorage['token']}}
                    onChange = {(info:any) => {
                      getPictures();
                    }}
                  >
                    <Button type="primary" icon={<UploadOutlined />}>
                      上传图片
                    </Button>
                  </Upload>
                </span>
              </Col>
            </Row>
            <Divider />
            <Form form={checkPictureForm}>
              <Form.Item
                name='checkPictures'
              >
                <Checkbox.Group style={{ width: '100%' }}>
                  <Row gutter={[16, 16]}>
                    {!!picture && picture.lists.map((item:any) => {
                      return(
                        <Col span={4}>
                          <Card

                            hoverable={true}
                            size={'small'}
                            style={{ width: '100%' }}
                            cover={
                              <img
                                onClick={() => toggleChecked(item.id)}
                                style={{objectFit: 'cover'}}
                                alt={item.name}
                                src={item.path}
                                width={'100%'}
                                height={120}
                              />
                            }
                            actions={[
                              <Checkbox value={item.id}>选择</Checkbox>,
                              <Popconfirm
                                title="确认要删除吗？"
                                onConfirm={() => onDeletePicture(item.id)}
                                okText="确定"
                                cancelText="取消"
                              >
                                <Iconfont type={'icon-delete'} /> 删除
                              </Popconfirm>,
                            ]}
                          >
                            <Meta
                              title={item.name}
                            />
                          </Card>
                        </Col>
                      )
                    })}
                  </Row>
                </Checkbox.Group>
              </Form.Item>
            </Form>
            <Divider />
            <Row>
              <Col span={24} style={{textAlign:'right'}}>
                {picture ?
                  <Pagination
                    style={{margin:'0 auto'}}
                    defaultCurrent={picture.pagination.defaultCurrent}
                    pageSize={picture.pagination.pageSize}
                    current={picture.pagination.current}
                    total={picture.pagination.total}
                    onChange={changePagination}
                  />
                :
                  null
                }
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>

    </Spin>
  );
};

function mapStateToProps(state:any) {
  const {
    content,
    routes,
    formImages,
    formFiles,
    loading,
    pageRandom
  } = state.form;

  const {
    picture,
  } = state.picture;

  return {
    content,
    picture,
    formImages,
    formFiles,
    routes,
    loading,
    pageRandom
  };
}

export default connect(mapStateToProps)(FormPage);