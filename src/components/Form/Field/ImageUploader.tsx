import React, { useState } from 'react';
import { post } from '@/services/action';
import { Upload, message } from 'antd';
import CropBox from '@/components/CropBox';
import { PlusOutlined } from '@ant-design/icons';

export interface ImageUploaderProps {
  button: string;
  action: string;
  cropAction: string;
  limitType: [];
  limitSize: number;
  limitNum: number;
  limitWH: {
    width: null;
    height: null;
  };
  mode: string;
  value?: any;
  disabled?: boolean;
  typeErrorMsg: string;
  sizeErrorMsg: string;
  onChange?: (value: any) => void;
}

const defaultProps = {
  button: '上传图片',
  action: '/api/admin/upload/image/handle',
  cropAction: '/api/admin/upload/image/crop',
  typeErrorMsg: '请上传正确格式的图片！',
  sizeErrorMsg: '图片大小不可超过',
} as ImageUploaderProps;

const ImageUploader: React.FC<ImageUploaderProps> = (props) => {
  let {
    button,
    action,
    cropAction,
    limitType,
    limitSize,
    limitNum,
    limitWH,
    mode,
    value = null,
    disabled,
    typeErrorMsg,
    sizeErrorMsg,
    onChange,
  } = {
    ...defaultProps,
    ...props,
  };

  const [getFileList, setGetFileList] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [imgId, setImgId] = useState('');

  if (limitWH.width && limitWH.height) {
    action = action + '?limitW=' + limitWH.width + '&limitH=' + limitWH.height;
  } else if (limitWH.width) {
    action = action + '?limitW=' + limitWH.width;
  } else if (limitWH.height) {
    action = action + '?limitH=' + limitWH.height;
  }

  const triggerChange = (changedValue: any) => {
    if (onChange) {
      onChange(changedValue);
    }
  };
  const onFileInfoChange = (value: any) => {
    triggerChange(value);
  };
  const onFileListChange = (value: any) => {
    setGetFileList(value || []);
    let fileList: any = [];
    value.forEach((file: any, key: number) => {
      let fileInfo = {
        uid: null,
        id: null,
        name: null,
        url: null,
        size: null,
        status: '',
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

  const uploadButton = (button: string) => {
    return (
      <div>
        <PlusOutlined />
        <div>{button}</div>
      </div>
    );
  };

  // 判断是否符合上传条件
  const checkUpload = (file: any) => {
    let canUpload = false;

    console.log('当前文件类型：', file.type);
    for (let i = 0; i < limitType.length; i++) {
      if (file.type.indexOf(limitType[i]) !== -1) {
        canUpload = true;
      }
    }

    if (!canUpload) {
      message.error(typeErrorMsg);
      return false;
    }

    // 限制文件大小
    const isLtSize = file.size / 1024 / 1024 < limitSize;
    if (!isLtSize) {
      message.error(sizeErrorMsg + limitSize + 'MB!');
      return false;
    }

    return true;
  };

  const onCrop = async (value: any) => {
    const result = await post({
      url: cropAction,
      data: {
        id: imgId,
        file: value,
      },
    });

    if (result.type === 'success') {
      message.success(result.content);
      setIsModalOpen(false);
    } else {
      message.error(result.content, 3);
    }
  };

  const handlePreview = async (file: any) => {
    setIsModalOpen(true);
    setImgSrc(file.url + '?timestamp' + new Date().getTime());
    setImgId(file.id);
  };

  return (
    <>
      {mode === 'single' ? (
        <Upload
          name={'file'}
          listType="picture-card"
          showUploadList={false}
          action={action}
          disabled={disabled}
          headers={{
            authorization:
              'Bearer ' + localStorage[process.env.UMI_APP_TOKEN ?? 'token'],
          }}
          beforeUpload={(file: any) => {
            return checkUpload(file);
          }}
          onChange={(info: any) => {
            if (info.file.status === 'done') {
              if (info.file.response.type === 'success') {
                onFileInfoChange(info.file.response.data);
              } else {
                message.error(info.file.response.content);
              }
            }
          }}
        >
          {value ? (
            typeof value === 'string' ? (
              <img
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  padding: '8px',
                }}
                src={value}
              />
            ) : (
              <img
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  padding: '8px',
                }}
                src={value.url}
                alt={value.name}
              />
            )
          ) : (
            uploadButton(button)
          )}
        </Upload>
      ) : (
        <Upload
          name={'file'}
          fileList={getFileList || value}
          multiple={true}
          listType="picture-card"
          action={action}
          disabled={disabled}
          headers={{
            authorization:
              'Bearer ' + localStorage[process.env.UMI_APP_TOKEN ?? 'token'],
          }}
          beforeUpload={(file: any) => {
            return checkUpload(file);
          }}
          onPreview={handlePreview}
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
              } else {
                return false;
              }
            });

            // 重组数据
            fileList = fileList.map((file: any, key: number) => {
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
          {disabled && value && value.length ? null : uploadButton(button)}
        </Upload>
      )}
      <CropBox
        open={isModalOpen}
        src={imgSrc}
        onOk={(value) => {
          onCrop(value);
        }}
        onCancel={(e) => {
          setIsModalOpen(false);
        }}
      />
    </>
  );
};

export default ImageUploader;
