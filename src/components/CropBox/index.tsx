import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, Modal, Row, Col, Space } from 'antd';
import {
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

export interface CropBoxProps {
  title?: string;
  width?: number;
  height?: number;
  src?: string;
  open?: boolean;
  initialAspectRatio?: number;
  moveButtonText?: string;
  cropBoxButtonText?: string;
  zoomInButtonText?: string;
  zoomOutButtonText?: string;
  rotateLeftButtonText?: string;
  rotateRightButtonText?: string;
  aspectAutoButtonText?: string;
  resetButtonText?: string;
  cropButtonText?: string;
  onOk?: (value: any) => void;
  onCancel?: (e: any) => void;
}

const defaultProps = {
  width: 980,
  height: 400,
  open: false,
  initialAspectRatio: 16 / 9,
  moveButtonText: '画布',
  cropBoxButtonText: '裁剪框',
  zoomInButtonText: '放大',
  zoomOutButtonText: '放小',
  rotateLeftButtonText: '左旋',
  rotateRightButtonText: '右旋',
  aspectAutoButtonText: '自由',
  resetButtonText: '重置',
  cropButtonText: '裁剪',
} as CropBoxProps;

const CropBox: React.FC<CropBoxProps> = (props) => {
  const {
    title,
    width,
    height,
    src,
    open,
    initialAspectRatio,
    moveButtonText,
    cropBoxButtonText,
    zoomInButtonText,
    zoomOutButtonText,
    rotateLeftButtonText,
    rotateRightButtonText,
    aspectAutoButtonText,
    resetButtonText,
    cropButtonText,
    onOk,
    onCancel,
  } = {
    ...defaultProps,
    ...props,
  };

  const [isModalOpen, setIsModalOpen] = useState(open);
  const [imgSrc, setSrc] = useState(src);
  const cropperRef = useRef<HTMLImageElement>(null);
  const [cropper, setCropper] = useState<any>();
  const [scaleX, setScaleX] = useState<any>(1);
  const [scaleY, setScaleY] = useState<any>(1);

  useEffect(() => {
    setIsModalOpen(open);
    setScaleX(1);
    setScaleY(1);
  }, [open]);

  useEffect(() => {
    setSrc(src);
    setScaleX(1);
    setScaleY(1);
  }, [src]);

  const onCrop = async () => {
    onOk?.(cropper?.getCroppedCanvas()?.toDataURL());
  };

  return (
    <Modal
      title={title}
      open={isModalOpen}
      onCancel={(e) => {
        onCancel?.(e);
      }}
      width={width}
      footer={null}
    >
      <Cropper
        src={imgSrc}
        style={{ height: height, width: '100%' }}
        onInitialized={setCropper}
        initialAspectRatio={initialAspectRatio}
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
                {moveButtonText}
              </Button>
              <Button
                icon={<SelectOutlined />}
                size={'small'}
                onClick={() => cropper?.setDragMode('crop')}
              >
                {cropBoxButtonText}
              </Button>
            </Input.Group>
            <Input.Group compact>
              <Button
                icon={<PlusCircleOutlined />}
                size={'small'}
                onClick={() => cropper?.zoom(0.1)}
              >
                {zoomInButtonText}
              </Button>
              <Button
                icon={<MinusCircleOutlined />}
                size={'small'}
                onClick={() => cropper?.zoom(-0.1)}
              >
                {zoomOutButtonText}
              </Button>
            </Input.Group>
            <Input.Group compact>
              <Button
                icon={<RotateLeftOutlined />}
                size={'small'}
                onClick={() => cropper?.rotate(45)}
              >
                {rotateLeftButtonText}
              </Button>
              <Button
                icon={<RotateRightOutlined />}
                size={'small'}
                onClick={() => cropper?.rotate(-45)}
              >
                {rotateRightButtonText}
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
                {aspectAutoButtonText}
              </Button>
            </Input.Group>
            <Button size={'small'} onClick={() => cropper?.reset()}>
              {resetButtonText}
            </Button>
            <Button size={'small'} onClick={() => onCrop()} type="primary">
              {cropButtonText}
            </Button>
          </Space>
        </Col>
      </Row>
    </Modal>
  );
};

export default CropBox;
