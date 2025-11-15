import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message } from 'antd';
import { useState } from 'react';

import { localStg } from '@/utils/storage';

export interface FileProps {
  action: string;
  button: string;
  limitNum: number;
  limitSize: number;
  limitType: [];
  onChange?: (value: any) => void;
  value?: any;
}

const ProFormFile = (props: FileProps) => {
  const { action, button, limitNum, limitSize, limitType, onChange, value = null } = props;
  const [getFileList, setGetFileList] = useState(undefined);

  const triggerChange = (changedValue: any) => {
    if (onChange) {
      onChange(changedValue);
    }
  };

  const onFileListChange = (newValue: any) => {
    setGetFileList(newValue);
    const fileList: any = [];
    newValue.forEach((file: any, key: number) => {
      const fileInfo = {
        id: null,
        name: null,
        size: null,
        status: '',
        uid: null,
        url: null
      };
      fileInfo.uid = file.uid;
      fileInfo.id = file.id;
      fileInfo.name = file.name;
      fileInfo.url = file.url;
      fileInfo.size = file.size;
      fileInfo.status = 'done';
      fileList[key] = fileInfo;
    });
    triggerChange(fileList);
  };

  const uploadButton = (title: string) => {
    return <Button icon={<UploadOutlined />}>{title}</Button>;
  };

  // 判断是否符合上传条件
  const checkUpload = (file: any) => {
    let canUpload = false;

    console.log('当前文件类型：', file.type);
    for (const type of limitType) {
      if (file.type.includes(type)) {
        canUpload = true;
        break; // 找到匹配项后提前退出循环
      }
    }

    if (!canUpload) {
      message.error('请上传正确格式的文件!');
      return false;
    }

    const isLtSize = file.size / 1024 / 1024 < limitSize;
    if (!isLtSize) {
      message.error(`文件大小不可超过${limitSize}MB!`);
      return false;
    }

    return true;
  };

  return (
    <Upload
      action={action}
      fileList={getFileList || value}
      multiple={true}
      name="file"
      beforeUpload={(file: any) => {
        return checkUpload(file);
      }}
      headers={{
        authorization: `Bearer ${localStg.get('token')}`
      }}
      onChange={(info: any) => {
        let fileList = info.fileList;

        // 限制上传数量
        fileList = fileList.slice(-limitNum);

        // 只保存上传成功的数据
        fileList = fileList.filter((file: any) => {
          if (file.response) {
            return file.response.type === 'success';
          }
          if (file.status) {
            return true;
          }
          return false;
        });

        // 重组数据
        fileList = fileList.map((file: any) => {
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
      {uploadButton(button)}
    </Upload>
  );
};

export default ProFormFile;
