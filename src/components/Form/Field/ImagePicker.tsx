import React, { useState } from 'react';
import { Upload, Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ImageBox from '@/components/ImageBox';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface DraggableUploadListItemProps {
  originNode: React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  >;
  file: any;
}

const DraggableUploadListItem = ({
  originNode,
  file,
}: DraggableUploadListItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: file.id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: 'move',
    width: '100%',
    height: '100%',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={isDragging ? 'is-dragging' : ''}
      {...attributes}
      {...listeners}
    >
      {file.status === 'error' && isDragging
        ? originNode.props.children
        : originNode}
    </div>
  );
};

export interface ImagePickerProps {
  button?: string;
  value?: any;
  limitNum?: number;
  disabled?: boolean;
  onChange?: (value: any) => void;
}

const defaultProps = {
  button: '上传',
  disabled: false,
} as ImagePickerProps;

const ImagePicker: React.FC<ImagePickerProps> = (props) => {
  const { button, value, limitNum, disabled, onChange } = {
    ...defaultProps,
    ...props,
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState(value || []);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const triggerChange = (changedValue: any) => {
    if (onChange) {
      onChange(changedValue);
    }
  };

  const handlePreview = async (file: any) => {
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }: any) => {
    if (limitNum) {
      newFileList = newFileList.slice(-limitNum);
    }
    setFileList(newFileList);
    triggerChange(newFileList);
  };

  const sensor = useSensor?.(PointerSensor, {
    activationConstraint: { distance: 10 },
  });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setFileList((prev: any) => {
        const activeIndex = prev.findIndex((i: any) => i.id === active.id);
        const overIndex = prev.findIndex((i: any) => i.id === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  return (
    <>
      <ImageBox
        open={isModalOpen}
        onCancel={(e) => setIsModalOpen(false)}
        onOk={(value: any) => {
          setIsModalOpen(false);
          if (limitNum) {
            value = value.slice(-limitNum);
          }
          setFileList(value);
          triggerChange(value);
        }}
      />
      <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
        <SortableContext
          items={fileList?.map?.((i: any) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <Upload
            name={'file'}
            disabled={disabled}
            listType="picture-card"
            fileList={fileList}
            openFileDialogOnClick={false}
            onPreview={handlePreview}
            onChange={handleChange}
            itemRender={(originNode, file) => (
              <DraggableUploadListItem originNode={originNode} file={file} />
            )}
          >
            {limitNum && fileList.length >= limitNum ? null : (
              <div
                onClick={() => {
                  setIsModalOpen(true);
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <div>
                  <PlusOutlined />
                  <div>{button}</div>
                </div>
              </div>
            )}
          </Upload>
        </SortableContext>
      </DndContext>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default ImagePicker;
