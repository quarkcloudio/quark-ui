import { UploadOutlined, createFromIconfontCN } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {
  Button,
  Card,
  Checkbox,
  Col,
  ConfigProvider,
  DatePicker,
  Divider,
  Form,
  Input,
  Menu,
  Modal,
  Pagination,
  Popconfirm,
  Row,
  Space,
  Upload
} from 'antd';
import React, { useEffect, useState } from 'react';

import Cropper from '@/components/cropper/Cropper';
import { fetchImageBatchDelete, fetchImageCrop, fetchImageDelete, fetchImageList } from '@/service/api';
import { localStg } from '@/utils/storage';

const Iconfont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js'
});

export interface ImageManagerProps {
  cropAction?: string;
  cropButtonText?: string;
  deleteAction?: string;
  deleteButtonText?: string;
  listAction?: string;
  namePlaceholder?: string;
  onCancel?: (e: any) => void;
  onOk?: (value: any) => void;
  open?: boolean;
  patchDeleteAction?: string;
  popconfirmCancelText?: string;
  popconfirmOkText?: string;
  popconfirmTitle?: string;
  searchButtonText?: string;
  selectedAllButtonText?: string;
  selectedButtonText?: string;
  title?: string;
  uploadAction?: string;
  uploadButtonText?: string;
  width?: number;
}

const defaultProps = {
  cropAction: '/api/admin/upload/image/crop',
  cropButtonText: '裁剪',
  deleteAction: '/api/admin/upload/image/delete',
  deleteButtonText: '删除',
  listAction: '/api/admin/upload/image/getList',
  namePlaceholder: '文件名称',
  open: false,
  patchDeleteAction: '/api/admin/upload/image/delete',
  popconfirmCancelText: '取消',
  popconfirmOkText: '确定',
  popconfirmTitle: '确认要删除吗？',
  searchButtonText: '搜索',
  selectedAllButtonText: '全选',
  selectedButtonText: '选择',
  uploadAction: '/api/admin/upload/image/handle',
  uploadButtonText: '上传图片',
  width: 1100
} as ImageManagerProps;

const ImageManager: React.FC<ImageManagerProps> = props => {
  const {
    cropAction,
    cropButtonText,
    deleteAction,
    deleteButtonText,
    listAction,
    namePlaceholder,
    onCancel,
    onOk,
    open,
    patchDeleteAction,
    popconfirmCancelText,
    popconfirmOkText,
    popconfirmTitle,
    searchButtonText,
    selectedAllButtonText,
    selectedButtonText,
    title,
    uploadAction,
    uploadButtonText,
    width
  } = {
    ...defaultProps,
    ...props
  };

  const [isModalOpen, setIsModalOpen] = useState(open);
  const [isCropBoxModalOpen, setIsCropBoxModalOpen] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [dataSource, setDataSource] = useState({
    categorys: [],
    list: [],
    pagination: {
      current: 1,
      defaultCurrent: 1,
      pageSize: 10,
      total: undefined
    }
  });
  const [searchForm] = Form.useForm();
  const [checkedForm] = Form.useForm();

  const getList = async (page: any = 1, search: any = null) => {
    const result: any = await fetchImageList(listAction || '', {
      categoryId,
      page,
      ...search
    });
    setDataSource(result.data);
  };

  useEffect(() => {
    setIsModalOpen(open);
    checkedForm.resetFields();
    searchForm.resetFields();
    getList();
  }, [open]);

  const onSearch = (values: any) => {
    if (values?.createtime) {
      values.createtime = [
        values?.createtime?.[0]?.format('YYYY-MM-DD HH:mm:ss'),
        values?.createtime?.[1]?.format('YYYY-MM-DD HH:mm:ss')
      ];
    }
    getList(1, values);
  };

  const onSelectAll = () => {
    const data: any = [];
    dataSource.list.forEach((item: any) => {
      data.push(item.id);
    });
    const checkedItems = checkedForm.getFieldValue('checkedItems');
    if (checkedItems && checkedItems.length === dataSource.list.length) {
      checkedForm.resetFields();
      return;
    }
    checkedForm.setFieldsValue({ checkedItems: data });
  };

  const toggleChecked = (id: any) => {
    let checkedItems = checkedForm.getFieldValue('checkedItems');
    if (checkedItems) {
      const pos = checkedItems.indexOf(id);
      if (pos < 0) {
        checkedItems.push(id);
      } else {
        checkedItems.splice(pos, 1);
      }
    } else {
      checkedItems = [];
      checkedItems.push(id);
    }
    const data: any = [];
    checkedItems.forEach((item: any) => {
      data.push(item);
    });
    checkedForm.setFieldsValue({ checkedItems: data });
  };

  const onDelete = async (id: any = null) => {
    fetchImageDelete(deleteAction || '', {
      id
    }).then(() => {
      getList();
    });
  };

  const onPatchDelete = async (e: any) => {
    e.persist();
    const ids = checkedForm.getFieldValue('checkedItems');
    fetchImageBatchDelete(patchDeleteAction || '', {
      id: ids
    }).then(() => {
      getList();
    });
  };

  const menuItems: MenuProps['items'] = [];
  dataSource.categorys.forEach((item: any) => {
    menuItems?.push({
      key: item.id,
      label: item.title
    });
  });

  const onMenuClick: MenuProps['onClick'] = e => {
    searchForm.resetFields();
    setCategoryId(e.key);
    getList();
  };

  const onCrop = async (imgId: any, file: any) => {
    fetchImageCrop(cropAction || '', {
      data: {
        file,
        id: imgId
      },
      url: cropAction
    }).then(() => {
      setIsCropBoxModalOpen(false);
      getList();
    });
  };

  return (
    <Modal
      open={isModalOpen}
      title={title}
      width={width}
      onCancel={onCancel}
      onOk={() => {
        const items: any = [];
        const checkedItems = checkedForm.getFieldValue('checkedItems');
        if (checkedItems) {
          checkedItems.forEach((item: any) => {
            dataSource.list.forEach((dataItem: any) => {
              if (dataItem.id === item) {
                delete dataItem.type;
                items.push(dataItem);
              }
            });
          });
        }
        onOk?.(items);
      }}
    >
      <Row
        gutter={20}
        style={{ marginTop: 30 }}
      >
        {menuItems?.length > 0 && (
          <Col span={4}>
            <ConfigProvider prefixCls="editor-menu">
              <Menu
                defaultSelectedKeys={['0']}
                items={menuItems}
                mode="inline"
                style={{ width: '100%' }}
                onClick={onMenuClick}
              />
            </ConfigProvider>
          </Col>
        )}
        <Col span={menuItems?.length > 0 ? 20 : 24}>
          <Row gutter={16}>
            <Col span={24}>
              <Form
                form={searchForm}
                layout="inline"
                style={{ float: 'left' }}
                onFinish={onSearch}
              >
                <Form.Item>
                  <Button onClick={onSelectAll}>{selectedAllButtonText}</Button>
                </Form.Item>
                <Form.Item name="createtime">
                  <DatePicker.RangePicker />
                </Form.Item>
                <Form.Item name="name">
                  <Input placeholder={namePlaceholder} />
                </Form.Item>
                <Form.Item>
                  <Button
                    htmlType="submit"
                    type="primary"
                  >
                    {searchButtonText}
                  </Button>
                </Form.Item>
              </Form>
              <Space style={{ float: 'right' }}>
                <Popconfirm
                  cancelText={popconfirmCancelText}
                  okText={popconfirmOkText}
                  title={popconfirmTitle}
                  onConfirm={onPatchDelete}
                >
                  <Button
                    danger
                    type="primary"
                  >
                    {deleteButtonText}
                  </Button>
                </Popconfirm>
                <Upload
                  action={uploadAction}
                  multiple={true}
                  name="file"
                  showUploadList={false}
                  headers={{
                    authorization: `Bearer ${localStg.get('token')}`
                  }}
                  onChange={() => {
                    getList();
                  }}
                >
                  <Button
                    icon={<UploadOutlined />}
                    type="primary"
                  >
                    {uploadButtonText}
                  </Button>
                </Upload>
              </Space>
            </Col>
          </Row>
          <Divider />
          <Form
            form={checkedForm}
            style={{ width: '100%' }}
          >
            <Form.Item
              name="checkedItems"
              style={{ width: '100%' }}
            >
              <Checkbox.Group style={{ display: 'block', width: '100%' }}>
                <Row gutter={[16, 16]}>
                  {dataSource?.list?.map((item: any, index: number) => {
                    return (
                      <Col
                        key={index}
                        span={6}
                      >
                        <Card
                          hoverable={true}
                          size="small"
                          style={{ width: '100%' }}
                          actions={[
                            <Checkbox
                              key="checkbox"
                              value={item.id}
                            >
                              {selectedButtonText}
                            </Checkbox>,
                            <>
                              <Cropper
                                open={isCropBoxModalOpen}
                                src={cropImageSrc}
                                onCancel={() => {
                                  setIsCropBoxModalOpen(false);
                                }}
                                onOk={(value: any) => {
                                  onCrop(item.id, value);
                                }}
                              />
                              <div
                                key="edit"
                                onClick={() => {
                                  const imageUrl = `${item.url}?timestamp${new Date().getTime()}`;
                                  setIsCropBoxModalOpen(true);
                                  setCropImageSrc(imageUrl);
                                }}
                              >
                                <Iconfont type="icon-edit" />
                                {cropButtonText}
                              </div>
                            </>,
                            <Popconfirm
                              cancelText={popconfirmCancelText}
                              key="popconfirm"
                              okText={popconfirmOkText}
                              title={popconfirmTitle}
                              onConfirm={() => onDelete(item.id)}
                            >
                              <Iconfont type="icon-delete" />
                              {deleteButtonText}
                            </Popconfirm>
                          ]}
                          cover={
                            <img
                              alt={item.name}
                              height={120}
                              src={item.url}
                              style={{ objectFit: 'cover' }}
                              width="100%"
                              onClick={() => toggleChecked(item.id)}
                            />
                          }
                        >
                          <Card.Meta title={item.name} />
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </Form>
          <Divider />
          {dataSource && (
            <Row>
              <Col span={24}>
                <Pagination
                  current={dataSource.pagination.current}
                  defaultCurrent={dataSource.pagination.defaultCurrent}
                  pageSize={dataSource.pagination.pageSize}
                  style={{ float: 'right', margin: '0 auto' }}
                  total={dataSource.pagination.total}
                  onChange={page => getList(page)}
                />
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Modal>
  );
};

export default ImageManager;
