import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export interface FileUploader {
  title: string;
  action: string;
  limitType: [];
  limitSize: number;
  limitNum: number;
  value?: any;
  onChange?:(value: any) => void;
}

const FileUploader: React.FC<FileUploader> = ({ title, action, limitType, limitSize, limitNum, value = null, onChange }) => {
  const [getFileList, setGetFileList] = useState(undefined);
  
  const triggerChange = (changedValue:any) => {
    if (onChange) {
      onChange({...value, ...changedValue });
    }
  };

  const onFileListChange = (value:any) => {
    setGetFileList(value);
    let fileList:any = [];
    value.map((file: any,key: number) => {
      let fileInfo = {
        uid:null,
        id:null,
        name:null,
        url:null,
        size:null,
        status:''
      };
      if (file.response) {
        fileInfo.uid = file.response.data.id;
        fileInfo.id = file.response.data.id;
        fileInfo.name = file.response.data.name;
        fileInfo.url = file.response.data.url;
        fileInfo.size = file.response.data.size;
        fileInfo.status = 'done';
      }
      fileList[key] = fileInfo;
    });
    triggerChange({ ...fileList });
  };

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
    for (var i = 0; i < limitType.length; i++) {
      if (file.type.indexOf(limitType[i]) != -1) {
        canUpload = true;
      }
    }

    // 返回错误信息
    if (!canUpload) {
      message.error('请上传正确格式的文件!');
      return false;
    }

    // 限制文件大小
    const isLtSize = file.size / 1024 / 1024 < limitSize;

    // 返回错误信息
    if (!isLtSize) {
      message.error('文件大小不可超过' + limitSize + 'MB!');
      return false;
    }

    // 全部通过，返回true
    return true;
  }

  return (
    <Upload
      name={'file'}
      fileList={getFileList || value}
      multiple={true}
      action={action}
      headers={{
        authorization: 'Bearer ' + sessionStorage['token']
      }}
      beforeUpload={(file: any) => {
        return checkUpload(file);
      }}
      onChange={(info: any) => {
        let fileList = info.fileList;

        // 限制上传数量
        fileList = fileList.slice(-limitNum);

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
        fileList = fileList.map((file: any,key: number) => {
          if (file.response) {
            file.id = file.response.data.id;
            file.name = file.response.data.name;
            file.url = file.response.data.url;
            file.size = file.response.data.size;
          }
          return file;
        });

        onFileListChange(fileList);
      }}
    >
      {uploadButton(title)}
    </Upload>
  );
}

export default FileUploader;