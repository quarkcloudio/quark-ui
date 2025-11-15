import { PlusOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import { useState } from 'react';

import Cropper from '@/components/cropper/Cropper';
import { fetchCropperData } from '@/service/api';
import { localStg } from '@/utils/storage';

export interface ImageProps {
  action: string;
  button: string;
  cropAction: string;
  disabled?: boolean;
  limitNum: number;
  limitSize: number;
  limitType: [];
  limitWH: {
    height: null;
    width: null;
  };
  mode: string;
  onChange?: (value: any) => void;
  sizeErrorMsg: string;
  typeErrorMsg: string;
  value?: any;
}

const defaultProps = {
  action: '/api/admin/upload/image/handle',
  button: '上传图片',
  cropAction: '/api/admin/upload/image/crop',
  sizeErrorMsg: '图片大小不可超过',
  typeErrorMsg: '请上传正确格式的图片！'
} as ImageProps;

const ProFormImage = (props: ImageProps) => {
  let {
    action,
    button,
    cropAction,
    disabled,
    limitNum,
    limitSize,
    limitType,
    limitWH,
    mode,
    onChange,
    sizeErrorMsg,
    typeErrorMsg,
    value = null
  } = {
    ...defaultProps,
    ...props
  };

  const [getFileList, setGetFileList] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [imgId, setImgId] = useState('');

  if (limitWH.width && limitWH.height) {
    action = `${action}?limitW=${limitWH.width}&limitH=${limitWH.height}`;
  } else if (limitWH.width) {
    action = `${action}?limitW=${limitWH.width}`;
  } else if (limitWH.height) {
    action = `${action}?limitH=${limitWH.height}`;
  }

  const triggerChange = (changedValue: any) => {
    if (onChange) {
      onChange(changedValue);
    }
  };
  const onFileInfoChange = (newValue: any) => {
    triggerChange(newValue);
  };
  const onFileListChange = (newValue: any) => {
    setGetFileList(newValue || []);
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

  const uploadButton = (buttonText: string) => {
    return (
      <div>
        <PlusOutlined />
        <div>{buttonText}</div>
      </div>
    );
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
      message.error(typeErrorMsg);
      return false;
    }

    // 限制文件大小
    const isLtSize = file.size / 1024 / 1024 < limitSize;
    if (!isLtSize) {
      message.error(`${sizeErrorMsg + limitSize}MB!`);
      return false;
    }

    return true;
  };

  const onCrop = async (newValue: any) => {
    fetchCropperData(cropAction, {
      data: {
        file: newValue,
        id: imgId
      }
    }).then(() => {
      setIsModalOpen(false);
    });
  };

  const handlePreview = async (file: any) => {
    setIsModalOpen(true);
    setImgSrc(`${file.url}?timestamp${new Date().getTime()}`);
    setImgId(file.id);
  };

  return (
    <>
      {mode === 'single' ? (
        <Upload
          action={action}
          disabled={disabled}
          listType="picture-card"
          name="file"
          showUploadList={false}
          beforeUpload={(file: any) => {
            return checkUpload(file);
          }}
          headers={{
            authorization: `Bearer ${localStg.get('token')}`
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
          {(() => {
            if (!value) {
              return uploadButton(button);
            }
            if (typeof value === 'string') {
              return (
                <img
                  src={value}
                  style={{
                    height: '100%',
                    objectFit: 'contain',
                    padding: '8px',
                    width: '100%'
                  }}
                />
              );
            }
            return (
              <img
                alt={value.name}
                src={value.url}
                style={{
                  height: '100%',
                  objectFit: 'contain',
                  padding: '8px',
                  width: '100%'
                }}
              />
            );
          })()}
        </Upload>
      ) : (
        <Upload
          action={action}
          disabled={disabled}
          fileList={getFileList || value}
          listType="picture-card"
          multiple={true}
          name="file"
          beforeUpload={(file: any) => {
            return checkUpload(file);
          }}
          headers={{
            authorization: `Bearer ${localStg.get('token')}`
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
          {disabled && value && value.length ? null : uploadButton(button)}
        </Upload>
      )}
      <Cropper
        open={isModalOpen}
        src={imgSrc}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        onOk={(cropValue: any) => {
          onCrop(cropValue);
        }}
      />
    </>
  );
};

export default ProFormImage;
