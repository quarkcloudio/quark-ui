import React, { useState } from 'react';
import {
  Upload,
  Modal,
  Row,
  Col,
  Form,
  Button,
  ConfigProvider,
  Menu,
  DatePicker,
  Input,
  Popconfirm,
  Space,
  Checkbox,
  Card,
  Divider,
  Pagination,
} from 'antd';
import {
  PlusOutlined,
  UploadOutlined,
  createFromIconfontCN,
} from '@ant-design/icons';

const Iconfont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js', // 在 iconfont.cn 上生成
});

export interface ImageBoxrProps {
  button?: string;
  action?: string;
  value?: any;
  disabled?: boolean;
  onChange?: (value: any) => void;
}

const defaultProps = {
  button: '上传',
  disabled: false,
} as ImageBoxrProps;

const ImageBox: React.FC<ImageBoxrProps> = (props) => {
  const { button, action, value, onChange } = {
    ...defaultProps,
    ...props,
  };

  const triggerChange = (changedValue: any) => {
    if (onChange) {
      onChange(changedValue);
    }
  };

  return (
    <>
      <Upload
        name={'file'}
        listType="picture-card"
        openFileDialogOnClick={false}
      >
        <div
          onClick={() => {
            alert('xx');
          }}
        >
          <PlusOutlined />
          <div>{button}</div>
        </div>
      </Upload>
      <Modal
        title="图片管理"
        open={pictureBoxOpen}
        onOk={insertPicture}
        onCancel={closePictureBox}
        width={1100}
      >
        <Row gutter={20} style={{ marginTop: 20 }}>
          <Col span={4}>
            <ConfigProvider prefixCls="editor-menu">
              <Menu
                style={{ width: '100%' }}
                defaultSelectedKeys={['0']}
                mode="inline"
                items={menuItems}
              />
            </ConfigProvider>
          </Col>
          <Col span={20}>
            <Row gutter={16}>
              <Col span={24}>
                <Form
                  layout="inline"
                  form={searchPictureForm}
                  onFinish={onSearchPicture}
                  style={{ float: 'left' }}
                >
                  <Form.Item>
                    <Button onClick={onSelectAllPictures}>全选</Button>
                  </Form.Item>
                  <Form.Item name="pictureSearchDate">
                    <DatePicker.RangePicker />
                  </Form.Item>
                  <Form.Item name="pictureSearchName">
                    <Input placeholder="文件名称" />
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="submit" type="primary">
                      搜索
                    </Button>
                  </Form.Item>
                </Form>
                <Space style={{ float: 'right' }}>
                  <Popconfirm
                    title="确认要删除这些数据吗？"
                    onConfirm={onDeletePictures}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button type="primary" danger>
                      删除
                    </Button>
                  </Popconfirm>
                  <Upload
                    showUploadList={false}
                    name={'file'}
                    multiple={true}
                    action={'/api/admin/upload/image/handle'}
                    headers={{
                      authorization: 'Bearer ' + localStorage['token'],
                    }}
                    onChange={(info: any) => {
                      getPictures();
                    }}
                  >
                    <Button type="primary" icon={<UploadOutlined />}>
                      上传图片
                    </Button>
                  </Upload>
                </Space>
              </Col>
            </Row>
            <Divider />
            <Form form={checkPictureForm} style={{ width: '100%' }}>
              <Form.Item name="checkPictures" style={{ width: '100%' }}>
                <Checkbox.Group style={{ width: '100%', display: 'block' }}>
                  <Row gutter={[16, 16]}>
                    {!!picture &&
                      picture.lists.map((item: any, index: number) => {
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
                                  选择
                                </Checkbox>,
                                <span
                                  key="edit"
                                  onClick={() => {
                                    changeCropBoxOpen(true);
                                    setImgSrc(
                                      item.url +
                                        '?timestamp' +
                                        new Date().getTime(),
                                    );
                                    setImgId(item.id);
                                    setScaleX(1);
                                    setScaleY(1);
                                  }}
                                >
                                  <Iconfont type={'icon-edit'} /> 裁剪
                                </span>,
                                <Popconfirm
                                  key="popconfirm"
                                  title="确认要删除吗？"
                                  onConfirm={() => onDeletePicture(item.id)}
                                  okText="确定"
                                  cancelText="取消"
                                >
                                  <Iconfont type={'icon-delete'} /> 删除
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
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                {picture ? (
                  <Pagination
                    style={{ margin: '0 auto' }}
                    defaultCurrent={picture.pagination.defaultCurrent}
                    pageSize={picture.pagination.pageSize}
                    current={picture.pagination.current}
                    total={picture.pagination.total}
                    onChange={changePagination}
                  />
                ) : null}
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ImageBox;
