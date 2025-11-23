import { PlusOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ConfigProvider, Image, Upload } from 'antd';
import React, { useEffect, useState } from 'react';

interface DraggableUploadListItemProps {
  file: any;
  originNode: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

const DraggableUploadListItem = ({ file, originNode }: DraggableUploadListItemProps) => {
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    id: file.id
  });

  const style: React.CSSProperties = {
    cursor: 'move',
    height: '100%',
    transform: CSS.Translate.toString(transform),
    transition,
    width: '100%'
  };

  return (
    <div
      className={isDragging ? 'is-dragging' : ''}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {file.status === 'error' && isDragging ? originNode.props.children : originNode}
    </div>
  );
};

export interface ImagePickerProps {
  button?: string;
  disabled?: boolean;
  limitNum?: number;
  mode?: string;
  // default, small
  onChange?: (value: any) => void;
  size?: string;
  value?: any;
}

const defaultProps = {
  button: '上传',
  disabled: false,
  mode: 'single',
  size: 'default'
} as ImagePickerProps;

const ImagePicker: React.FC<ImagePickerProps> = props => {
  let { button, disabled, limitNum, mode, onChange, size, value } = {
    ...defaultProps,
    ...props
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState(() => {
    if (mode === 'single' && value) {
      return [value];
    }
    return value || [];
  });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  if (mode === 'single') {
    limitNum = 1;
  }

  useEffect(() => {
    setFileList(() => {
      if (mode === 'single' && value) {
        return [value];
      }
      return value || [];
    });
  }, [value]);

  const triggerChange = (changedValue: any) => {
    if (mode === 'single' && changedValue) {
      onChange?.(changedValue?.[0]);
      return;
    }
    onChange?.(changedValue);
  };

  const handlePreview = async (file: any) => {
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }: any) => {
    let finalFileList = newFileList;
    if (limitNum) {
      finalFileList = finalFileList.slice(-limitNum);
    }
    setFileList(finalFileList);
    triggerChange(finalFileList);
  };

  const sensor = useSensor?.(PointerSensor, {
    activationConstraint: { distance: 10 }
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
      <ImageManager
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={(newValue: any) => {
          setIsModalOpen(false);
          let finalFileList = newValue;
          if (limitNum) {
            finalFileList = newValue.slice(-limitNum);
          }
          setFileList(finalFileList);
          triggerChange(finalFileList);
        }}
      />
      <DndContext
        sensors={[sensor]}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={fileList?.map?.((i: any) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <ConfigProvider
            theme={
              size === 'small'
                ? {
                    token: {
                      controlHeightLG: 25,
                      paddingXS: 5
                    }
                  }
                : undefined
            }
          >
            <Upload
              disabled={disabled}
              fileList={fileList}
              listType="picture-card"
              name="file"
              openFileDialogOnClick={false}
              style={size === 'small' ? { width: 30 } : undefined}
              itemRender={(originNode, file) => (
                <DraggableUploadListItem
                  file={file}
                  originNode={originNode}
                />
              )}
              onChange={handleChange}
              onPreview={handlePreview}
            >
              {limitNum && fileList.length >= limitNum ? null : (
                <div
                  style={{
                    display: 'grid',
                    height: '100%',
                    placeItems: 'center',
                    width: '100%'
                  }}
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                >
                  <div>
                    <PlusOutlined />
                    <div>{button}</div>
                  </div>
                </div>
              )}
            </Upload>
          </ConfigProvider>
        </SortableContext>
      </DndContext>
      {previewImage && (
        <Image
          src={previewImage}
          wrapperStyle={{ display: 'none' }}
          preview={{
            afterOpenChange: visible => !visible && setPreviewImage(''),
            onVisibleChange: visible => setPreviewOpen(visible),
            visible: previewOpen
          }}
        />
      )}
    </>
  );
};

export default ImagePicker;
