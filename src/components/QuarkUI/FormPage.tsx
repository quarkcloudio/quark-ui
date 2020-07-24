import React, { useContext, useState, useEffect, useRef } from 'react';
import styles from './FormPage.less';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { history } from 'umi';
import Editor from '@/components/Form/Editor';
import { Map, Marker } from 'react-amap';
import Autocomplete from 'react-amap-plugin-autocomplete';

import {
  UploadOutlined,
  MinusCircleOutlined,
  PlusOutlined,
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
  Popconfirm,
  TimePicker,
  Space
} from 'antd';

import locale from 'antd/es/date-picker/locale/zh_CN';

const Iconfont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js', // 在 iconfont.cn 上生成
});

const { SubMenu } = Menu;
const { Meta } = Card;
const { TextArea } = Input;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const { TreeNode } = Tree;
const TimeRangePicker = TimePicker.RangePicker;

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
  formSearchOptions:any;
  formMapPosition:any;
  routes:any;
  loading: boolean;
  dispatch: Dispatch<any>;
  pageRandom:string;
}

const FormPage: React.SFC<FormPageProps> = props => {

  // 上传图片文件
  const [previewVisible, changePreviewVisible] = useState(false);
  const [previewImage, changePreviewImage] = useState('');

  const {
    type,
    api,
    search,
    content,
    routes,
    formImages,
    formFiles,
    formSearchOptions,
    formMapPosition,
    loading,
    dispatch,
    pageRandom
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

      if(item.component == 'map') {
        if(formMapPosition[item.name]) {
          values[item.name] = formMapPosition[item.name];
        } else {
          values[item.name] = 0;
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

  const handleCancel = () => {
    changePreviewVisible(false);
    changePreviewImage('');
  };

  const normFile = (e:any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const formItemRender = (items:any) => {
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
  
          if(item.component == 'display') {
            return (
              <Form.Item
                label={item.label}
              >
                <span
                  style={item.style ? item.style : []}
                >
                  {item.value}
                </span>
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
  
          if(item.component == "map") {
            const markerEvents = {
              dragend: (instance:any) => {
                dispatch({
                  type: 'form/updateMapPosition',
                  payload: {
                    longitude : instance.lnglat.lng,
                    latitude : instance.lnglat.lat,
                    itemName : item.name
                  }
                });
              }
            }

            // on select item
            const onMapSelect = (e:any) => {
              if(e.poi.location) {
                dispatch({
                  type: 'form/updateMapPosition',
                  payload: {
                    longitude : e.poi.location.lng,
                    latitude : e.poi.location.lat,
                    itemName : item.name
                  }
                });
              }
            }

            return (

              <Form.Item 
                key={item.name}
                label={item.label}
                rules={item.frontendRules}
                help={item.help ? item.help : undefined}
                extra={item.extra}
              >
                <Form.Item
                  style={{ display: 'inline-block', width: '188px' }}
                >
                  <Input addonBefore="经度" value={formMapPosition ? formMapPosition[item.name].longitude: null } size={item.size} />
                </Form.Item>
                <span
                  style={{ display: 'inline-block', width: '24px', lineHeight: '32px', textAlign: 'center' }}
                >
                  -
                </span>
                <Form.Item
                  style={{ display: 'inline-block', width: '188px' }}
                >
                  <Input addonBefore="纬度"  value={formMapPosition ? formMapPosition[item.name].latitude: null } size={item.size} />
                </Form.Item>
                <div style={item.style}>
                  <Map 
                    center={{longitude: formMapPosition ? formMapPosition[item.name].longitude: null, latitude: formMapPosition ? formMapPosition[item.name].latitude: null }}
                    plugins={[
                      'ToolBar',
                    ]}
                    amapkey={item.key}
                    zoom={item.zoom}
                  >
                    <Autocomplete 
                      options={[]}
                      onSelect={(e:any)=>onMapSelect(e)}
                      style={{
                        'position':'absolute',
                        'top':20,
                        'right':10,
                        'borderRadius':4,
                        'border':'1px solid #1890FF',
                        'height':34,
                        'width':200,
                        'color':'rgba(0, 0, 0, 0.65)',
                        'padding':'4px 11px'
                      }}
                      placeholder='请输入关键字'
                    />
                    <Marker
                      events={markerEvents}
                      position= {{longitude: formMapPosition ? formMapPosition[item.name].longitude: null, latitude: formMapPosition ? formMapPosition[item.name].latitude: null }}
                      visible={true}
                      clickable={true}
                      draggable={true}
                    />
                  </Map>
                </div>
              </Form.Item>
            );
          }

          if(item.component == "cascader") {
            return (
              <Form.Item
                key={item.name}
                label={item.label}
                name={item.name}
                rules={item.frontendRules}
                help={item.help ? item.help : undefined}
                extra={item.extra}
              >
                <Cascader
                  size={item.size}
                  options={item.options}
                  style={item.style}
                  placeholder={item.placeholder}
                />
              </Form.Item>
            );
          }

          if(item.component == "search") {

            let timeout:any = null;

            // on select item
            const onInputSearch = (value:any) => {
              if(value) {
                if (timeout) {
                  clearTimeout(timeout);
                  timeout = null;
                }

                timeout = setTimeout(function() {
                  dispatch({
                    type: 'form/updateSearchOptions',
                    payload: {
                      actionUrl : item.url,
                      itemName : item.name,
                      search:value
                    }
                  });
                }, 300);
              }
            }

            if(item.mode) {
              return (
                <Form.Item 
                  key={item.name}
                  label={item.label}
                  name={item.name}
                  rules={item.frontendRules}
                  help={item.help ? item.help : undefined}
                  extra={item.extra}
                >
                  <Select
                    showSearch
                    defaultActiveFirstOption={false}
                    mode={item.mode} 
                    size={item.size} 
                    filterOption={false}
                    onSearch={(value:any)=>onInputSearch(value)}
                    placeholder={item.placeholder}
                    style={item.style ? item.style : []}
                  >
                    {!!formSearchOptions[item.name] && formSearchOptions[item.name].map((option:any) => {
                      return (<Option key={option.value} value={option.value}>{option.label}</Option>)
                    })}
                  </Select>
                </Form.Item>
              );
            } else {
              return (
                <Form.Item 
                  key={item.name}
                  label={item.label}
                  name={item.name}
                  rules={item.frontendRules}
                  help={item.help ? item.help : undefined}
                  extra={item.extra}
                >
                  <Select
                    showSearch
                    defaultActiveFirstOption={false}
                    mode={item.mode}
                    size={item.size}
                    filterOption={false}
                    onSearch={(value:any)=>onInputSearch(value)}
                    placeholder={item.placeholder}
                    style={item.style ? item.style : []}
                  >
                    {!!formSearchOptions[item.name] && formSearchOptions[item.name].map((option:any) => {
                      return (<Option key={option.value} value={option.value}>{option.label}</Option>)
                    })}
                  </Select>
                </Form.Item>
              );
            }
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
                  showTime={{...item.showTime}}
                  size={item.size}
                  locale={locale}
                  format={item.format}
                  placeholder={item.placeholder}
                />
              </Form.Item>
            );
          }

          if(item.component == "datetimeRange") {
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
                  showTime={{...item.showTime}}
                  size={item.size}
                  locale={locale}
                  format={item.format}
                />
              </Form.Item>
            );
          }

          if(item.component == "timeRange") {
            return (
              <Form.Item 
                key={item.name}
                label={item.label}
                name={item.name}
                help={item.help ? item.help : undefined}
                extra={item.extra}
                rules={item.frontendRules}
              >
                <TimeRangePicker
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
                  height={item.height}
                  width={item.width}
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

          if(item.component == 'list') {
            return (
              <Form.Item
                key={item.name}
                label={item.label}
                rules={item.frontendRules}
                help={item.help ? item.help : undefined}
                extra={item.extra}
              >
                <Form.List key={item.name} name={item.name}>
                  {(fields, { add, remove }) => {
                    return (
                      <div>
                        {fields.map(field => (
                          <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                            {formListItemRender(item.items,field)}
                            <MinusCircleOutlined
                              onClick={() => {
                                remove(field.name);
                              }}
                            />
                          </Space>
                        ))}

                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => {
                              add();
                            }}
                            block
                          >
                            <PlusOutlined /> {item.button}
                          </Button>
                        </Form.Item>
                      </div>
                    );
                  }}
                </Form.List>
              </Form.Item>
            )
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

  const formListItemRender = (items:any,field:any) => {
    let formItem = null;
    if(items) {
      formItem = 
      <span>
        {!!items && items.map((item:any) => {

          if(item.component == 'input') {
            return (
              <Form.Item
                key={item.name}
                label={item.label}
                name={[field.name, item.name]}
                fieldKey={[field.fieldKey, item.name]}
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
                name={[field.name, item.name]}
                fieldKey={[field.fieldKey, item.name]}
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
  
          if(item.component == "cascader") {
            return (
              <Form.Item
                key={item.name}
                label={item.label}
                name={[field.name, item.name]}
                fieldKey={[field.fieldKey, item.name]}
                rules={item.frontendRules}
                help={item.help ? item.help : undefined}
                extra={item.extra}
              >
                <Cascader
                  size={item.size}
                  options={item.options}
                  style={item.style}
                  placeholder={item.placeholder}
                />
              </Form.Item>
            );
          }

          if(item.component == "search") {

            let timeout:any = null;

            // on select item
            const onInputSearch = (value:any) => {
              if(value) {
                if (timeout) {
                  clearTimeout(timeout);
                  timeout = null;
                }

                timeout = setTimeout(function() {
                  dispatch({
                    type: 'form/updateSearchOptions',
                    payload: {
                      actionUrl : item.url,
                      itemName : item.name,
                      search:value
                    }
                  });
                }, 300);
              }
            }

            if(item.mode) {
              return (
                <Form.Item 
                  key={item.name}
                  label={item.label}
                  name={[field.name, item.name]}
                  fieldKey={[field.fieldKey, item.name]}
                  rules={item.frontendRules}
                  help={item.help ? item.help : undefined}
                  extra={item.extra}
                >
                  <Select
                    showSearch
                    defaultActiveFirstOption={false}
                    mode={item.mode} 
                    size={item.size} 
                    filterOption={false}
                    onSearch={(value:any)=>onInputSearch(value)}
                    placeholder={item.placeholder}
                    style={item.style ? item.style : []}
                  >
                    {!!formSearchOptions[item.name] && formSearchOptions[item.name].map((option:any) => {
                      return (<Option key={option.value} value={option.value}>{option.label}</Option>)
                    })}
                  </Select>
                </Form.Item>
              );
            } else {
              return (
                <Form.Item 
                  key={item.name}
                  label={item.label}
                  name={[field.name, item.name]}
                  fieldKey={[field.fieldKey, item.name]}
                  rules={item.frontendRules}
                  help={item.help ? item.help : undefined}
                  extra={item.extra}
                >
                  <Select
                    showSearch
                    defaultActiveFirstOption={false}
                    mode={item.mode}
                    size={item.size}
                    filterOption={false}
                    onSearch={(value:any)=>onInputSearch(value)}
                    placeholder={item.placeholder}
                    style={item.style ? item.style : []}
                  >
                    {!!formSearchOptions[item.name] && formSearchOptions[item.name].map((option:any) => {
                      return (<Option key={option.value} value={option.value}>{option.label}</Option>)
                    })}
                  </Select>
                </Form.Item>
              );
            }
          }

          if(item.component == 'radio') {
            return (
              <Form.Item
                key={item.name}
                label={item.label}
                name={[field.name, item.name]}
                fieldKey={[field.fieldKey, item.name]}
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
                name={[field.name, item.name]}
                fieldKey={[field.fieldKey, item.name]}
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
                name={[field.name, item.name]}
                fieldKey={[field.fieldKey, item.name]}
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
                name={[field.name, item.name]}
                fieldKey={[field.fieldKey, item.name]}
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
                name={[field.name, item.name]}
                fieldKey={[field.fieldKey, item.name]}
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
                name={[field.name, item.name]}
                fieldKey={[field.fieldKey, item.name]}
                help={item.help ? item.help : undefined}
                extra={item.extra}
                rules={item.frontendRules}
              >
                <DatePicker
                  showTime={{...item.showTime}}
                  size={item.size}
                  locale={locale}
                  format={item.format}
                  placeholder={item.placeholder}
                />
              </Form.Item>
            );
          }

          if(item.component == "datetimeRange") {
            return (
              <Form.Item 
                key={item.name}
                label={item.label}
                name={[field.name, item.name]}
                fieldKey={[field.fieldKey, item.name]}
                help={item.help ? item.help : undefined}
                extra={item.extra}
                rules={item.frontendRules}
              >
                <RangePicker
                  showTime={{...item.showTime}}
                  size={item.size}
                  locale={locale}
                  format={item.format}
                />
              </Form.Item>
            );
          }

          if(item.component == "timeRange") {
            return (
              <Form.Item 
                key={item.name}
                label={item.label}
                name={[field.name, item.name]}
                fieldKey={[field.fieldKey, item.name]}
                help={item.help ? item.help : undefined}
                extra={item.extra}
                rules={item.frontendRules}
              >
                <TimeRangePicker
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
                name={[field.name, item.name]}
                fieldKey={[field.fieldKey, item.name]}
                help={item.help ? item.help : undefined}
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
                  name={[field.name, item.name]}
                  fieldKey={[field.fieldKey, item.name]}
                  valuePropName="fileList"
                  help={item.help ? item.help : undefined}
                  extra={item.extra}
                >
                  <Upload
                    listType={"picture-card"}
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
                  name={[field.name, item.name]}
                  fieldKey={[field.fieldKey, item.name]}
                  valuePropName="fileList"
                  help={item.help ? item.help : undefined}
                  extra={item.extra}
                >
                  <Upload
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
                name={[field.name, item.name]}
                fieldKey={[field.fieldKey, item.name]}
                valuePropName="fileList"
                getValueFromEvent={normFile}
                help={item.help}
                extra={item.extra}
              >
                <Upload
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
                    <Tabs defaultActiveKey="1" tabBarExtraContent={<Button type="link" onClick={(e) => history.go(-1)}>返回上一页</Button>}>
                      {content.body.form.tab.map((tab:any,index:any) => {
                        return (
                          <TabPane tab={tab.title} key={(index+1).toString()}>
                            {formItemRender(tab.items)}
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
                  extra={<Button type="link" onClick={(e) => history.go(-1)}>返回上一页</Button>}
                >
                  <Form {...content.body.form.layout} form={form} onFinish={onFinish} initialValues={content.body.form.initialValues}>
                    {formItemRender(content.body.form.items)}
                  </Form>
                </Card>
              }
            </PageHeaderWrapper>
          :
            <span>
              <Form {...content.body.form.layout} form={form} onFinish={onFinish} initialValues={content.body.form.initialValues}>
                {formItemRender(content.body.form.items)}
              </Form>
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
    formImages,
    formFiles,
    formSearchOptions,
    formMapPosition,
    loading,
    pageRandom
  } = state.form;

  return {
    content,
    formImages,
    formFiles,
    formSearchOptions,
    formMapPosition,
    routes,
    loading,
    pageRandom
  };
}

export default connect(mapStateToProps)(FormPage);