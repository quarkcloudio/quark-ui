import React, { useState, useEffect } from 'react';
import { Upload, Form, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export interface ImageUploader {
  form: any;
  name: string;
  label: string;
  title: string;
  action: string;
  value?: any;
  limitType: [];
  limitSize: number;
  limitNum: number;
  mode: string;
  extra?: string;
  help?: string;
}

const ImageUploader: React.FC<ImageUploader> = (props) => {

  const [fileList, setFileList] = useState([]);
  const [fileInfo, setFileInfo] = useState({
    id:undefined,
    url:undefined,
    size:undefined,
    name:undefined
  });

  useEffect(() => {
    if(props.mode === 'single') {
      setFileInfo(props.value);
      let itemValue = {};
      itemValue[props.name] = props.value
      props.form.setFieldsValue({...itemValue});
    } else {
      setFileList(props.value);
      let itemValue = {};
      itemValue[props.name] = props.value
      props.form.setFieldsValue({...itemValue});
    }
  }, []);

  const uploadButton = (title:string) => {
    return(
    <div>
      <PlusOutlined />
      <div>{title}</div>
    </div>
    )
  }

  // 判断是否符合上传条件
  const checkUpload = (file:any) => {
    let canUpload = false;

    // 限制文件格式
    for (var i = 0; i < props.limitType.length; i++) {
      if (file.type.indexOf(props.limitType[i]) != -1) {
        canUpload = true;
      }
    }

    // 返回错误信息
    if (!canUpload) {
      message.error('请上传正确格式的图片!');
      return false;
    }

    // 限制文件大小
    const isLtSize = file.size / 1024 / 1024 < props.limitSize;

    // 返回错误信息
    if (!isLtSize) {
      message.error('图片大小不可超过' + props.limitSize + 'MB!');
      return false;
    }

    // 全部通过，返回true
    return true;
  }

  return (
    <>
      {props.mode === 'single' ?
        <Form.Item label={props.label} extra={props.extra} help={props.help}>
          <Upload
            name={'file'}
            listType="picture-card"
            showUploadList={false}
            action={props.action}
            headers={{
              authorization: 'Bearer ' + sessionStorage['token']
            }}
            beforeUpload={(file: any) => {
              return checkUpload(file);
            }}
            onChange={(info: any) => {
              if (info.file.status === 'done') {
                if (info.file.response.status === 'success') {
                  setFileInfo(info.file.response.data);
                  let itemValue = {};
                  itemValue[props.name] = info.file.response.data;
                  props.form.setFieldsValue({...itemValue});
                } else {
                  message.error(info.file.response.msg);
                }
              }
            }}
          >
            {fileInfo ? (
              <img
                src={fileInfo.url}
                alt={fileInfo.name}
                width={80}
              />
            ) : uploadButton(props.title)}
          </Upload>
        </Form.Item>
      :
        <Form.Item label={props.label} extra={props.extra} help={props.help}>
          <Upload
            name={'file'}
            fileList={fileList}
            multiple={true}
            listType="picture-card"
            action={props.action}
            headers={{
              authorization: 'Bearer ' + sessionStorage['token']
            }}
            beforeUpload={(file: any) => {
              return checkUpload(file);
            }}
            onChange={(info: any) => {
              let fileList = info.fileList;

              // 限制上传数量
              fileList = fileList.slice(-props.limitNum);

              // 只保存上传成功的数据
              fileList = fileList.filter((file: any) => {
                if (file.response) {
                  return file.response.status === 'success';
                }
                if (file.status) {
                  return true;
                } else {
                  return false;
                }
              });

              // 重组数据
              let getFileList:any = [];
              fileList = fileList.map((file: any,key: number) => {
                if (file.response) {
                  file.id = file.response.data.id;
                  file.name = file.response.data.name;
                  file.url = file.response.data.url;
                  file.size = file.response.data.size;
                  let fileInfo = {
                    id:null,
                    name:null,
                    url:null,
                    size:null,
                  };
                  fileInfo.id = file.response.data.id;
                  fileInfo.name = file.response.data.name;
                  fileInfo.url = file.response.data.url;
                  fileInfo.size = file.response.data.size;
                  if(fileInfo) {
                    getFileList[key] = fileInfo;
                  }
                }
                return file;
              });

              setFileList(fileList);

              let itemValue = {};
              itemValue[props.name] = getFileList
              props.form.setFieldsValue({...itemValue});
            }}
          >
            {uploadButton(props.title)}
          </Upload>
        </Form.Item>
      }
      <span style={{display:'none'}}>
        <Form.Item label={props.label} name={props.name}>
          <Input/>
        </Form.Item>
      </span>
    </>
  );
}

export default ImageUploader;