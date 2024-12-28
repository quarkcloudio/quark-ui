import React, { useState, useEffect } from 'react';
import type { MenuProps } from 'antd';
import {
  Card,
  DatePicker,
  Form,
  Input,
  Button,
  Checkbox,
  Upload,
  message,
  Modal,
  Row,
  Col,
  Divider,
  Menu,
  Pagination,
  Popconfirm,
  Space,
  ConfigProvider,
} from 'antd';
import { UploadOutlined, createFromIconfontCN } from '@ant-design/icons';
import CropBox from '@/components/CropBox';
import { get, post } from '@/services/action';
const Iconfont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js',
});

export interface ImageBoxProps {
  title?: string;
  width?: number;
  open?: boolean;
  listAction?: string;
  deleteAction?: string;
  patchDeleteAction?: string;
  uploadAction?: string;
  cropAction?: string;
  selectedAllButtonText?: string;
  searchButtonText?: string;
  deleteButtonText?: string;
  popconfirmTitle?: string;
  popconfirmOkText?: string;
  popconfirmCancelText?: string;
  namePlaceholder?: string;
  uploadButtonText?: string;
  selectedButtonText?: string;
  cropButtonText?: string;
  onOk?: (value: any) => void;
  onCancel?: (e: any) => void;
}

const defaultProps = {
  width: 1100,
  open: false,
  listAction: '/api/admin/upload/image/getList',
  deleteAction: '/api/admin/upload/image/delete',
  patchDeleteAction: '/api/admin/upload/image/delete',
  uploadAction: '/api/admin/upload/image/handle',
  cropAction: '/api/admin/upload/image/crop',
  selectedAllButtonText: '全选',
  searchButtonText: '搜索',
  deleteButtonText: '删除',
  popconfirmTitle: '确认要删除吗？',
  popconfirmOkText: '确定',
  popconfirmCancelText: '取消',
  namePlaceholder: '文件名称',
  uploadButtonText: '上传图片',
  selectedButtonText: '选择',
  cropButtonText: '裁剪',
} as ImageBoxProps;

const ImageBox: React.FC<ImageBoxProps> = (props) => {
  const {
    title,
    width,
    open,
    listAction,
    deleteAction,
    patchDeleteAction,
    uploadAction,
    cropAction,
    selectedAllButtonText,
    searchButtonText,
    deleteButtonText,
    popconfirmTitle,
    popconfirmOkText,
    popconfirmCancelText,
    namePlaceholder,
    uploadButtonText,
    selectedButtonText,
    cropButtonText,
    onOk,
    onCancel,
  } = {
    ...defaultProps,
    ...props,
  };

  const [isModalOpen, setIsModalOpen] = useState(open);
  const [isCropBoxModalOpen, setIsCropBoxModalOpen] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [dataSource, setDataSource] = useState({
    lists: [],
    categorys: [],
    pagination: {
      defaultCurrent: 1,
      pageSize: 10,
      current: 1,
      total: undefined,
    },
  });
  const [searchForm] = Form.useForm();
  const [checkedForm] = Form.useForm();

  useEffect(() => {
    setIsModalOpen(open);
    checkedForm.resetFields();
    searchForm.resetFields();
    getList();
  }, [open]);

  const getList = async (page: any = 1, search: any = null) => {
    const result = await get({
      url: listAction,
      data: {
        page: page,
        categoryId: categoryId,
        ...search,
      },
    });
    setDataSource(result.data);
  };

  const onSearch = (values: any) => {
    if (values?.cteatetime) {
      values['cteatetime'] = [
        values?.cteatetime?.[0]?.format('YYYY-MM-DD HH:mm:ss'),
        values?.cteatetime?.[1]?.format('YYYY-MM-DD HH:mm:ss'),
      ];
    }
    getList(1, values);
  };

  const onSelectAll = () => {
    let data: any = [];
    dataSource.lists.forEach(function (item: any) {
      data.push(item.id);
    });
    let checkedItems = checkedForm.getFieldValue('checkedItems');
    if (checkedItems && checkedItems.length === dataSource.lists.length) {
      checkedForm.resetFields();
      return;
    }
    checkedForm.setFieldsValue({ checkedItems: data });
  };

  const toggleChecked = (id: any) => {
    let checkedItems = checkedForm.getFieldValue('checkedItems');
    if (checkedItems) {
      let pos = checkedItems.indexOf(id);
      if (pos < 0) {
        checkedItems.push(id);
      } else {
        checkedItems.splice(pos, 1);
      }
    } else {
      checkedItems = [];
      checkedItems.push(id);
    }
    let data: any = [];
    checkedItems.forEach(function (item: any) {
      data.push(item);
    });
    checkedForm.setFieldsValue({ checkedItems: data });
  };

  const onDelete = async (id: any = null) => {
    const result = await post({
      url: deleteAction,
      data: {
        id: id,
      },
    });
    if (result.type === 'error') {
      message.error(result.content, 3);
    }
    getList();
  };

  const onPatchDelete = async (e: any) => {
    e.persist();
    let ids = checkedForm.getFieldValue('checkedItems');
    const result = await post({
      url: patchDeleteAction,
      data: {
        id: ids,
      },
    });
    if (result.type === 'error') {
      message.error(result.content, 3);
    }
    getList();
  };

  let menuItems: MenuProps['items'] = [];
  dataSource.categorys.forEach((item: any) => {
    menuItems?.push({
      key: item.id,
      label: item.title,
    });
  });

  const onMenuClick: MenuProps['onClick'] = (e) => {
    searchForm.resetFields();
    setCategoryId(e.key);
    getList();
  };

  const onCrop = async (imgId: any, file: any) => {
    const result = await post({
      url: cropAction,
      data: {
        id: imgId,
        file: file,
      },
    });
    if (result.type === 'success') {
      setIsCropBoxModalOpen(false);
      message.success(result.content);
    } else {
      message.error(result.content, 3);
    }
    getList();
  };

  return (
    <>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={() => {
          let items: any = [];
          const checkedItems = checkedForm.getFieldValue('checkedItems');
          if (checkedItems) {
            checkedItems.forEach((item: any) => {
              dataSource.lists.forEach((dataItem: any) => {
                if (dataItem.id === item) {
                  items.push(dataItem);
                }
              });
            });
          }
          onOk?.(items);
        }}
        onCancel={onCancel}
        width={width}
      >
        <Row gutter={20} style={{ marginTop: 30 }}>
          {menuItems?.length > 0 && (
            <Col span={4}>
              <ConfigProvider prefixCls="editor-menu">
                <Menu
                  style={{ width: '100%' }}
                  defaultSelectedKeys={['0']}
                  mode="inline"
                  items={menuItems}
                  onClick={onMenuClick}
                />
              </ConfigProvider>
            </Col>
          )}
          <Col span={menuItems?.length > 0 ? 20 : 24}>
            <Row gutter={16}>
              <Col span={24}>
                <Form
                  layout="inline"
                  form={searchForm}
                  onFinish={onSearch}
                  style={{ float: 'left' }}
                >
                  <Form.Item>
                    <Button onClick={onSelectAll}>
                      {selectedAllButtonText}
                    </Button>
                  </Form.Item>
                  <Form.Item name="cteatetime">
                    <DatePicker.RangePicker />
                  </Form.Item>
                  <Form.Item name="name">
                    <Input placeholder={namePlaceholder} />
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="submit" type="primary">
                      {searchButtonText}
                    </Button>
                  </Form.Item>
                </Form>
                <Space style={{ float: 'right' }}>
                  <Popconfirm
                    title={popconfirmTitle}
                    onConfirm={onPatchDelete}
                    okText={popconfirmOkText}
                    cancelText={popconfirmCancelText}
                  >
                    <Button type="primary" danger>
                      {deleteButtonText}
                    </Button>
                  </Popconfirm>
                  <Upload
                    showUploadList={false}
                    name={'file'}
                    multiple={true}
                    action={uploadAction}
                    headers={{
                      authorization: 'Bearer ' + localStorage['token'],
                    }}
                    onChange={(info: any) => {
                      getList();
                    }}
                  >
                    <Button type="primary" icon={<UploadOutlined />}>
                      {uploadButtonText}
                    </Button>
                  </Upload>
                </Space>
              </Col>
            </Row>
            <Divider />
            <Form form={checkedForm} style={{ width: '100%' }}>
              <Form.Item name="checkedItems" style={{ width: '100%' }}>
                <Checkbox.Group style={{ width: '100%', display: 'block' }}>
                  <Row gutter={[16, 16]}>
                    {dataSource?.lists?.map((item: any, index: number) => {
                      return (
                        <Col key={index} span={6}>
                          <Card
                            hoverable={true}
                            size={'small'}
                            style={{ width: '100%' }}
                            cover={
                              <img
                                onClick={() => toggleChecked(item.id)}
                                style={{ objectFit: 'cover' }}
                                alt={item.name}
                                src={item.url}
                                width={'100%'}
                                height={120}
                              />
                            }
                            actions={[
                              <Checkbox key="checkbox" value={item.id}>
                                {selectedButtonText}
                              </Checkbox>,
                              <>
                                <CropBox
                                  open={isCropBoxModalOpen}
                                  src={cropImageSrc}
                                  onOk={(value) => {
                                    onCrop(item.id, value);
                                  }}
                                  onCancel={(e) => {
                                    setIsCropBoxModalOpen(false);
                                  }}
                                />
                                <div
                                  key="edit"
                                  onClick={() => {
                                    setIsCropBoxModalOpen(true);
                                    setCropImageSrc(
                                      item.url +
                                        '?timestamp' +
                                        new Date().getTime(),
                                    );
                                  }}
                                >
                                  <Iconfont type={'icon-edit'} />{' '}
                                  {cropButtonText}
                                </div>
                              </>,
                              <Popconfirm
                                key="popconfirm"
                                title={popconfirmTitle}
                                onConfirm={() => onDelete(item.id)}
                                okText={popconfirmOkText}
                                cancelText={popconfirmCancelText}
                              >
                                <Iconfont type={'icon-delete'} />{' '}
                                {deleteButtonText}
                              </Popconfirm>,
                            ]}
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
                    style={{ margin: '0 auto', float: 'right' }}
                    defaultCurrent={dataSource.pagination.defaultCurrent}
                    pageSize={dataSource.pagination.pageSize}
                    current={dataSource.pagination.current}
                    total={dataSource.pagination.total}
                    onChange={(page) => getList(page)}
                  />
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ImageBox;
