import React, { useState, useRef } from 'react';
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
} from 'antd';
import {
  UploadOutlined,
  createFromIconfontCN,
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
import { get, post } from '@/services/action';
import { Editor } from '@tinymce/tinymce-react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
const { Meta } = Card;
const { RangePicker } = DatePicker;
const Iconfont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js', // 在 iconfont.cn 上生成
});

const EditorPage: React.FC<any> = ({ value, onChange, height, width }) => {
  // 上传图片文件
  const [pictureBoxOpen, changepictureBoxOpen] = useState(false);
  const [cropBoxOpen, changecropBoxOpen] = useState(false);
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

  const [tinymceEditor, setTinymceEditor] = useState({
    insertContent(value: any) {
      return value;
    },
  });

  const [picture, setPictureState] = useState({
    lists: [],
    categorys: [],
    pagination: {
      defaultCurrent: 1,
      pageSize: 10,
      current: 1,
      total: undefined,
    },
  });

  const triggerChange = (changedValue: any) => {
    if (onChange) {
      onChange(changedValue);
    }
  };

  const onContentChange = (content: any) => {
    triggerChange(content);
  };

  const [searchPictureForm] = Form.useForm();
  const [checkPictureForm] = Form.useForm();

  const getPictures = async (page: any = 1, search: any = null) => {
    const result = await get({
      url: '/api/admin/upload/image/getList',
      data: {
        page: page,
        ...search,
      },
    });
    setPictureState(result.data);
  };

  const insertPicture = (e: any) => {
    if (tinymceEditor) {
      const checkPictures = checkPictureForm.getFieldValue('checkPictures');

      if (checkPictures) {
        let html = '';
        checkPictures.forEach((item: any) => {
          picture.lists.forEach((pictureItem: any) => {
            if (pictureItem.id === item) {
              html = html + '<img src="' + pictureItem.url + '" />';
            }
          });
        });
        tinymceEditor.insertContent(html);
      }
    }

    checkPictureForm.resetFields();
    changepictureBoxOpen(false);
  };

  const closePictureBox = (e: any) => {
    changepictureBoxOpen(false);
  };

  const editorExecCommand = (content: any, editor: any) => {
    if (sessionStorage['editorCommand'] === 'multipleimage') {
      changepictureBoxOpen(true);
      getPictures();
      setTinymceEditor(editor);
      checkPictureForm.resetFields();
      sessionStorage.removeItem('editorCommand');
    }
  };

  const onSearchPicture = (values: any) => {
    if (values['pictureSearchDate']) {
      if (values['pictureSearchDate'][0] && values['pictureSearchDate'][1]) {
        // 时间标准化
        let dateStart = values['pictureSearchDate'][0].format(
          'YYYY-MM-DD HH:mm:ss',
        );
        let dateEnd = values['pictureSearchDate'][1].format(
          'YYYY-MM-DD HH:mm:ss',
        );
        // 先清空对象
        values['pictureSearchDate'] = [];
        // 重新赋值对象
        values['pictureSearchDate'] = [dateStart, dateEnd];
      }
    }

    getPictures(1, values);
  };

  // 分页切换
  const changePagination = (page: any) => {
    getPictures(page);
  };

  const onSelectAllPictures = () => {
    let data: any = [];
    picture.lists.forEach(function (item: any) {
      data.push(item.id);
    });

    let checkPictures = [];
    checkPictures = checkPictureForm.getFieldValue('checkPictures');
    if (checkPictures) {
      if (checkPictures.length === picture.lists.length) {
        checkPictureForm.resetFields();
      } else {
        checkPictureForm.setFieldsValue({ checkPictures: data });
      }
    } else {
      checkPictureForm.setFieldsValue({ checkPictures: data });
    }
  };

  const toggleChecked = (id: any) => {
    let checkPictures = checkPictureForm.getFieldValue('checkPictures');
    if (checkPictures) {
      let pos = checkPictures.indexOf(id);
      if (pos < 0) {
        checkPictures.push(id);
      } else {
        checkPictures.splice(pos, 1);
      }
    } else {
      checkPictures = [];
      checkPictures.push(id);
    }

    let data: any = [];
    checkPictures.forEach(function (item: any) {
      data.push(item);
    });

    checkPictureForm.setFieldsValue({ checkPictures: data });
  };

  const onDeletePicture = async (id: any = null) => {
    if (id === null) {
      message.error('请选择数据', 3);
      return false;
    }

    const result = await post({
      url: '/api/admin/upload/image/delete',
      data: {
        id: id,
      },
    });

    if (result.status === 'error') {
      message.error(result.msg, 3);
    }

    getPictures(1);
    return true;
  };

  const onDeletePictures = async (e: any) => {
    e.persist();

    let ids = null;

    ids = checkPictureForm.getFieldValue('checkPictures');

    if (ids === null) {
      message.error('请选择数据', 3);
      return false;
    }

    const result = await post({
      url: '/api/admin/upload/image/delete',
      data: {
        id: ids,
      },
    });

    if (result.status === 'error') {
      message.error(result.msg, 3);
    }

    getPictures(1);
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

    if (result.status === 'success') {
      changecropBoxOpen(false);
      message.success(result.msg);
    } else {
      message.error(result.msg, 3);
    }

    getPictures(1);
  };

  const closeCropBox = (e: any) => {
    changecropBoxOpen(false);
  };

  let menuItems: MenuProps['items'] = [
    {
      key: 0,
      label: '所有图片',
    },
  ];

  picture.categorys.forEach((item: any) => {
    menuItems?.push({
      key: item.id,
      label: item.title,
    });
  });

  return (
    <span>
      <Editor
        value={value}
        onEditorChange={onContentChange}
        init={{
          language: 'zh_CN',
          height: height ? height : 500,
          width: width ? width : '100%',
          plugins: [
            'advlist autolink lists link charmap print preview anchor image',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount multipleimage formatpainter indent2em',
          ],
          menu: {
            insert: {
              title: '插入',
              items:
                'multipleimage link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime',
            },
          },
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist indent2em outdent indent | removeformat formatpainter | help',
          fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
          font_formats:
            "微软雅黑='微软雅黑';宋体='宋体';楷体='楷体';黑体='黑体';隶书='隶书';Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings",
          relative_urls: false,
          remove_script_host: true,
          file_picker_callback: function (callback, value, meta) {
            //文件分类
            let filetype =
              '.pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4';
            //后端接收上传文件的地址
            let upurl = '/api/admin/upload/file/handle';
            //为不同插件指定文件类型及后端地址
            switch (meta.filetype) {
              case 'image':
                filetype = '.jpg, .jpeg, .png, .gif';
                upurl = '/api/admin/upload/image/handle';
                break;
              case 'media':
                filetype = '.mp3, .mp4';
                upurl = '/api/admin/upload/file/handle';
                break;
              case 'file':
              default:
            }
            //模拟出一个input用于添加本地文件
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', filetype);
            input.click();
            input.onchange = function () {
              if (input.files !== null) {
                const file = input.files[0];
                const xhr: any = new XMLHttpRequest();
                xhr.withCredentials = false;
                xhr.open('POST', upurl);
                xhr.setRequestHeader(
                  'authorization',
                  'Bearer ' + sessionStorage['token'],
                );
                xhr.onload = function () {
                  if (xhr.status !== 200) {
                    alert('HTTP Error: ' + xhr.status);
                    return;
                  }
                  const result = JSON.parse(xhr.responseText);
                  if (result.status === 'error') {
                    alert(result.msg);
                    return;
                  }
                  callback(result.data.url, {
                    text: result.data.name,
                    title: result.data.name,
                  });
                };
                const formData = new FormData();
                formData.append('file', file, file.name);
                xhr.send(formData);
              }
            };
          },
        }}
        onExecCommand={editorExecCommand}
      />

      <Modal
        title="图片管理"
        open={pictureBoxOpen}
        onOk={insertPicture}
        onCancel={closePictureBox}
        width={1100}
      >
        <Row gutter={20}>
          <Col span={4}>
            <Menu
              style={{ width: '100%' }}
              defaultSelectedKeys={['1']}
              mode="inline"
              items={menuItems}
            />
          </Col>
          <Col span={20}>
            <Row gutter={16}>
              <Col span={24}>
                <span style={{ float: 'left' }}>
                  <Form
                    layout="inline"
                    form={searchPictureForm}
                    onFinish={onSearchPicture}
                  >
                    <Form.Item>
                      <Button onClick={onSelectAllPictures}>全选</Button>
                    </Form.Item>
                    <Form.Item name="pictureSearchDate">
                      <RangePicker />
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
                </span>
                <span style={{ float: 'right' }}>
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
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Upload
                    showUploadList={false}
                    name={'file'}
                    multiple={true}
                    action={'/api/admin/upload/image/handle'}
                    headers={{
                      authorization: 'Bearer ' + sessionStorage['token'],
                    }}
                    onChange={(info: any) => {
                      getPictures();
                    }}
                  >
                    <Button type="primary" icon={<UploadOutlined />}>
                      上传图片
                    </Button>
                  </Upload>
                </span>
              </Col>
            </Row>
            <Divider />
            <Form form={checkPictureForm} style={{ width: '100%' }}>
              <Form.Item name="checkPictures" style={{ width: '100%' }}>
                <Checkbox.Group style={{ width: '100%',display:'block' }}>
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
                                    changecropBoxOpen(true);
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
                              <Meta title={item.name} />
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

      <Modal
        title="图片裁剪"
        open={cropBoxOpen}
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
    </span>
  );
};

export default EditorPage;
