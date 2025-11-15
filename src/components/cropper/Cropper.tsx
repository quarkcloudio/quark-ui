import {
  ArrowDownOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ArrowUpOutlined,
  ColumnHeightOutlined,
  ColumnWidthOutlined,
  DragOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SelectOutlined
} from '@ant-design/icons';
import { Button, Col, Input, Modal, Row, Space } from 'antd';
import { useEffect, useRef, useState } from 'react';
import ReactCropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export interface CropperProps {
  aspectAutoButtonText?: string;
  cropBoxButtonText?: string;
  cropButtonText?: string;
  height?: number;
  initialAspectRatio?: number;
  moveButtonText?: string;
  onCancel?: (e: any) => void;
  onOk?: (value: any) => void;
  open?: boolean;
  resetButtonText?: string;
  rotateLeftButtonText?: string;
  rotateRightButtonText?: string;
  src?: string;
  title?: string;
  width?: number;
  zoomInButtonText?: string;
  zoomOutButtonText?: string;
}

const defaultProps = {
  aspectAutoButtonText: '自由',
  cropBoxButtonText: '裁剪框',
  cropButtonText: '裁剪',
  height: 400,
  initialAspectRatio: 16 / 9,
  moveButtonText: '画布',
  open: false,
  resetButtonText: '重置',
  rotateLeftButtonText: '左旋',
  rotateRightButtonText: '右旋',
  width: 980,
  zoomInButtonText: '放大',
  zoomOutButtonText: '放小'
} as CropperProps;

const Cropper = (props: CropperProps) => {
  const {
    aspectAutoButtonText,
    cropBoxButtonText,
    cropButtonText,
    height,
    initialAspectRatio,
    moveButtonText,
    onCancel,
    onOk,
    open,
    resetButtonText,
    rotateLeftButtonText,
    rotateRightButtonText,
    src,
    title,
    width,
    zoomInButtonText,
    zoomOutButtonText
  } = {
    ...defaultProps,
    ...props
  };

  const [isModalOpen, setIsModalOpen] = useState(open);
  const [imgSrc, setImgSrc] = useState(src);
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
    setImgSrc(src);
    setScaleX(1);
    setScaleY(1);
  }, [src]);

  const onCrop = async () => {
    onOk?.(cropper?.getCroppedCanvas()?.toDataURL());
  };

  return (
    <Modal
      footer={null}
      open={isModalOpen}
      title={title}
      width={width}
      onCancel={e => {
        onCancel?.(e);
      }}
    >
      <ReactCropper
        initialAspectRatio={initialAspectRatio}
        ref={cropperRef}
        src={imgSrc}
        style={{ height, width: '100%' }}
        onInitialized={setCropper}
      />
      <Row
        gutter={20}
        style={{ marginTop: 20 }}
      >
        <Col span={24}>
          <Space>
            <Input.Group compact>
              <Button
                icon={<DragOutlined />}
                size="small"
                onClick={() => cropper?.setDragMode('move')}
              >
                {moveButtonText}
              </Button>
              <Button
                icon={<SelectOutlined />}
                size="small"
                onClick={() => cropper?.setDragMode('crop')}
              >
                {cropBoxButtonText}
              </Button>
            </Input.Group>
            <Input.Group compact>
              <Button
                icon={<PlusCircleOutlined />}
                size="small"
                onClick={() => cropper?.zoom(0.1)}
              >
                {zoomInButtonText}
              </Button>
              <Button
                icon={<MinusCircleOutlined />}
                size="small"
                onClick={() => cropper?.zoom(-0.1)}
              >
                {zoomOutButtonText}
              </Button>
            </Input.Group>
            <Input.Group compact>
              <Button
                icon={<RotateLeftOutlined />}
                size="small"
                onClick={() => cropper?.rotate(45)}
              >
                {rotateLeftButtonText}
              </Button>
              <Button
                icon={<RotateRightOutlined />}
                size="small"
                onClick={() => cropper?.rotate(-45)}
              >
                {rotateRightButtonText}
              </Button>
            </Input.Group>
            <Input.Group compact>
              <Button size="small">
                <ArrowLeftOutlined onClick={() => cropper.move(-10, 0)} />
              </Button>
              <Button size="small">
                <ArrowRightOutlined onClick={() => cropper.move(10, 0)} />
              </Button>
              <Button size="small">
                <ArrowUpOutlined onClick={() => cropper.move(0, -10)} />
              </Button>
              <Button size="small">
                <ArrowDownOutlined onClick={() => cropper.move(0, 10)} />
              </Button>
            </Input.Group>
            <Input.Group compact>
              <Button size="small">
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
              <Button size="small">
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
                size="small"
                onClick={() => cropper?.setAspectRatio(16 / 9)}
              >
                16:9
              </Button>
              <Button
                size="small"
                onClick={() => cropper?.setAspectRatio(4 / 3)}
              >
                4:3
              </Button>
              <Button
                size="small"
                onClick={() => cropper?.setAspectRatio(1 / 1)}
              >
                1:1
              </Button>
              <Button
                size="small"
                onClick={() => cropper?.setAspectRatio(2 / 3)}
              >
                2:3
              </Button>
              <Button
                size="small"
                onClick={() => cropper?.setAspectRatio(Number.NaN)}
              >
                {aspectAutoButtonText}
              </Button>
            </Input.Group>
            <Button
              size="small"
              onClick={() => cropper?.reset()}
            >
              {resetButtonText}
            </Button>
            <Button
              size="small"
              type="primary"
              onClick={() => onCrop()}
            >
              {cropButtonText}
            </Button>
          </Space>
        </Col>
      </Row>
    </Modal>
  );
};

export default Cropper;
