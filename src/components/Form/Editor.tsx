import React, { useState } from 'react';
import { get, post } from '@/services/action';
import { Editor } from '@tinymce/tinymce-react';
import { UploadOutlined, createFromIconfontCN } from '@ant-design/icons';
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
} from 'antd';

const { Meta } = Card;
const { RangePicker } = DatePicker;

const Iconfont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js', // 在 iconfont.cn 上生成
});

const EditorPage: React.FC<any> = ({ value, onChange, height, width }) => {
  // 上传图片文件
  const [pictureBoxVisible, changePictureBoxVisible] = useState(false);
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
      actionUrl: 'admin/picture/getLists',
      page: page,
      ...search,
    });
    setPictureState(result.data);
  };

  const insertPicture = (e: any) => {
    if (tinymceEditor) {
      const checkPictures = checkPictureForm.getFieldValue('checkPictures');

      if (checkPictures) {
        let html = '';
        checkPictures.map((item: any) => {
          picture.lists.map((pictureItem: any) => {
            if (pictureItem.id == item) {
              html = html + '<img src="' + pictureItem.path + '" />';
            }
          });
        });
        tinymceEditor.insertContent(html);
      }
    }

    checkPictureForm.resetFields();
    changePictureBoxVisible(false);
  };

  const closePictureBox = (e: any) => {
    changePictureBoxVisible(false);
  };

  const editorExecCommand = (content: any, editor: any) => {
    if (sessionStorage['editorCommand'] == 'multipleimage') {
      changePictureBoxVisible(true);
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
    picture.lists.map(function (item: any) {
      data.push(item.id);
    });

    let checkPictures = [];
    checkPictures = checkPictureForm.getFieldValue('checkPictures');
    if (checkPictures) {
      if (checkPictures.length == picture.lists.length) {
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
    checkPictures.map(function (item: any) {
      data.push(item);
      console.log(item);
    });

    checkPictureForm.setFieldsValue({ checkPictures: data });
  };

  const onDeletePicture = async (id: any = null) => {
    if (id == null) {
      message.error('请选择数据', 3);
      return false;
    }

    const result = await post({
      actionUrl: 'admin/picture/delete',
      id: id,
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

    if (ids == null) {
      message.error('请选择数据', 3);
      return false;
    }

    const result = await post({
      actionUrl: 'admin/picture/delete',
      id: ids,
    });

    if (result.status === 'error') {
      message.error(result.msg, 3);
    }

    getPictures(1);
    return true;
  };

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
            var filetype =
              '.pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4';
            //后端接收上传文件的地址
            var upurl = '/api/admin/file/upload';
            //为不同插件指定文件类型及后端地址
            switch (meta.filetype) {
              case 'image':
                filetype = '.jpg, .jpeg, .png, .gif';
                upurl = '/api/admin/picture/upload';
                break;
              case 'media':
                filetype = '.mp3, .mp4';
                upurl = '/api/admin/file/upload';
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
              const file = this.files[0];
              const xhr: any = new XMLHttpRequest();
              xhr.withCredentials = false;
              xhr.open('POST', upurl);
              xhr.setRequestHeader(
                'authorization',
                'Bearer ' + sessionStorage['token'],
              );
              xhr.onload = function () {
                if (xhr.status != 200) {
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
            };
          },
        }}
        onExecCommand={editorExecCommand}
      />

      <Modal
        title="图片管理"
        visible={pictureBoxVisible}
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
            >
              <Menu.Item key="0">所有图片</Menu.Item>
              {!!picture &&
                picture.categorys.map((category: any) => {
                  return (
                    <Menu.Item key={category.id}>{category.title}</Menu.Item>
                  );
                })}
            </Menu>
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
                    action={'/api/admin/picture/upload'}
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
            <Form form={checkPictureForm}>
              <Form.Item name="checkPictures">
                <Checkbox.Group style={{ width: '100%' }}>
                  <Row gutter={[16, 16]}>
                    {!!picture &&
                      picture.lists.map((item: any) => {
                        return (
                          <Col span={4}>
                            <Card
                              hoverable={true}
                              size={'small'}
                              style={{ width: '100%' }}
                              cover={
                                <img
                                  onClick={() => toggleChecked(item.id)}
                                  style={{ objectFit: 'cover' }}
                                  alt={item.name}
                                  src={item.path}
                                  width={'100%'}
                                  height={120}
                                />
                              }
                              actions={[
                                <Checkbox value={item.id}>选择</Checkbox>,
                                <Popconfirm
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
    </span>
  );
};

export default EditorPage;
