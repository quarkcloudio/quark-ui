import React, { useState, useRef } from 'react';
import { post } from '@/services/action';
import { Input, Button, Upload, message, Modal, Row, Col, Space } from 'antd';
import {
  PlusOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  SelectOutlined,
  DragOutlined,
  ColumnWidthOutlined,
  ColumnHeightOutlined,
} from '@ant-design/icons';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export interface ImageUploaderProps {
  button: string;
  action: string;
  limitType: [];
  limitSize: number;
  limitNum: number;
  limitWH: {
    width: null;
    height: null;
  };
  mode: string;
  value?: any;
  onChange?: (value: any) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  button,
  action,
  limitType,
  limitSize,
  limitNum,
  limitWH,
  mode,
  value = null,
  onChange,
}) => {
  const [getFileList, setGetFileList] = useState(undefined);
  // 上传图片文件
  const [pictureBoxVisible, changePictureBoxVisible] = useState(false);
  const [cropBoxVisible, changeCropBoxVisible] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [imgId, setImgId] = useState('');

  const cropperRef = useRef<HTMLImageElement>(null);
  const [cropper, setCropper] = useState<any>(undefined);
  const [scaleX, setScaleX] = useState<any>(1);
  const [scaleY, setScaleY] = useState<any>(1);
  const onCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
  };

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
    setGetFileList(value);
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

    // 限制文件格式
    for (let i = 0; i < limitType.length; i++) {
      if (file.type.indexOf(limitType[i]) !== -1) {
        canUpload = true;
      }
    }

    // 返回错误信息
    if (!canUpload) {
      message.error('请上传正确格式的图片!');
      return false;
    }

    // 限制文件大小
    const isLtSize = file.size / 1024 / 1024 < limitSize;

    // 返回错误信息
    if (!isLtSize) {
      message.error('图片大小不可超过' + limitSize + 'MB!');
      return false;
    }

    // 全部通过，返回true
    return true;
  };

  const onSubmitCrop = async () => {
    const result = await post({
      url: '/api/admin/upload/image/crop',
      data: {
        id: imgId,
        file: cropper.getCroppedCanvas().toDataURL(),
      },
    });

    if (result.type === 'success') {
      message.success(result.content);
      changeCropBoxVisible(false);
    } else {
      message.error(result.content, 3);
    }
  };

  const handlePreview = async (file: any) => {
    changeCropBoxVisible(true);
    setImgSrc(file.url + '?timestamp' + new Date().getTime());
    setImgId(file.id);
  };

  const closeCropBox = (e: any) => {
    changeCropBoxVisible(false);
  };

  return (
    <>
      {mode === 'single' ? (
        <Upload
          name={'file'}
          listType="picture-card"
          showUploadList={false}
          action={action}
          headers={{
            authorization: 'Bearer ' + localStorage['token'],
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
              <img src={value} width={80} />
            ) : (
              <img src={value.url} alt={value.name} width={80} />
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
          headers={{
            authorization: 'Bearer ' + localStorage['token'],
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
          {uploadButton(button)}
        </Upload>
      )}
      <Modal
        title="查看图片"
        open={cropBoxVisible}
        onOk={onSubmitCrop}
        onCancel={closeCropBox}
        width={980}
        footer={null}
      >
        <Cropper
          src={imgSrc}
          style={{ height: 400, width: '100%' }}
          onInitialized={setCropper}
          initialAspectRatio={16 / 9}
          crop={onCrop}
          ref={cropperRef}
        />
        <Row gutter={20} style={{ marginTop: 20 }}>
          <Col span={24}>
            <Space>
              <Input.Group compact>
                <Button
                  icon={<DragOutlined />}
                  size={'small'}
                  onClick={() => cropper?.setDragMode('move')}
                >
                  画布
                </Button>
                <Button
                  icon={<SelectOutlined />}
                  size={'small'}
                  onClick={() => cropper?.setDragMode('crop')}
                >
                  裁剪框
                </Button>
              </Input.Group>
              <Input.Group compact>
                <Button
                  icon={<PlusCircleOutlined />}
                  size={'small'}
                  onClick={() => cropper?.zoom(0.1)}
                >
                  放大
                </Button>
                <Button
                  icon={<MinusCircleOutlined />}
                  size={'small'}
                  onClick={() => cropper?.zoom(-0.1)}
                >
                  缩小
                </Button>
              </Input.Group>
              <Input.Group compact>
                <Button
                  icon={<RotateLeftOutlined />}
                  size={'small'}
                  onClick={() => cropper?.rotate(45)}
                >
                  左旋
                </Button>
                <Button
                  icon={<RotateRightOutlined />}
                  size={'small'}
                  onClick={() => cropper?.rotate(-45)}
                >
                  右旋
                </Button>
              </Input.Group>
              <Input.Group compact>
                <Button size={'small'}>
                  <ArrowLeftOutlined onClick={() => cropper.move(-10, 0)} />
                </Button>
                <Button size={'small'}>
                  <ArrowRightOutlined onClick={() => cropper.move(10, 0)} />
                </Button>
                <Button size={'small'}>
                  <ArrowUpOutlined onClick={() => cropper.move(0, -10)} />
                </Button>
                <Button size={'small'}>
                  <ArrowDownOutlined onClick={() => cropper.move(0, 10)} />
                </Button>
              </Input.Group>
              <Input.Group compact>
                <Button size={'small'}>
                  <ColumnWidthOutlined
                    onClick={() => {
                      if (scaleX === 1) {
                        cropper.scaleX(-1);
                        setScaleX(-1);
                      } else {
                        cropper.scaleX(1);
                        setScaleX(1);
                      }
                    }}
                  />
                </Button>
                <Button size={'small'}>
                  <ColumnHeightOutlined
                    onClick={() => {
                      if (scaleY === 1) {
                        cropper?.scaleY(-1);
                        setScaleY(-1);
                      } else {
                        cropper?.scaleY(1);
                        setScaleY(1);
                      }
                    }}
                  />
                </Button>
              </Input.Group>
              <Input.Group compact>
                <Button
                  size={'small'}
                  onClick={() => cropper?.setAspectRatio(16 / 9)}
                >
                  16:9
                </Button>
                <Button
                  size={'small'}
                  onClick={() => cropper?.setAspectRatio(4 / 3)}
                >
                  4:3
                </Button>
                <Button
                  size={'small'}
                  onClick={() => cropper?.setAspectRatio(1 / 1)}
                >
                  1:1
                </Button>
                <Button
                  size={'small'}
                  onClick={() => cropper?.setAspectRatio(2 / 3)}
                >
                  2:3
                </Button>
                <Button
                  size={'small'}
                  onClick={() => cropper?.setAspectRatio(NaN)}
                >
                  自由
                </Button>
              </Input.Group>
              <Button size={'small'} onClick={() => cropper?.reset()}>
                重置
              </Button>
              <Button
                size={'small'}
                onClick={() => onSubmitCrop()}
                type="primary"
              >
                裁剪
              </Button>
            </Space>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ImageUploader;
