import React, { useContext, useState, useEffect, useRef } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { history } from 'umi';
import { Editor } from '@tinymce/tinymce-react';

import {
  UploadOutlined,
  createFromIconfontCN,
} from '@ant-design/icons';

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
  Popconfirm
} from 'antd';

const { Meta } = Card;
const { RangePicker } = DatePicker;

const Iconfont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1615691_3pgkh5uyob.js', // 在 iconfont.cn 上生成
});

const EditorPage: React.SFC<any> = ({ value, onChange , height, width, picture, dispatch }) => {

  // 上传图片文件
  const [pictureBoxVisible, changePictureBoxVisible] = useState(false);
  const [tinymceEditor, setTinymceEditor] = useState({insertContent(value:any){return value;}});

  const triggerChange = (changedValue:any) => {
    if (onChange) {
      onChange(changedValue);
    }
  };

  const onContentChange = (content:any) => {
    triggerChange(content);
  };

  const [searchPictureForm] = Form.useForm();
  const [checkPictureForm] = Form.useForm();

  const getPictures = (page:any = 1,search:any = null) => {
    dispatch({
      type: 'picture/info',
      payload: {
        actionUrl: 'admin/picture/getLists',
        page:page,
        ...search
      }
    });
  };

  const insertPicture = (e:any) => {
    if(tinymceEditor) {
      const checkPictures = checkPictureForm.getFieldValue('checkPictures');

      if(checkPictures) {
        let html = '';
        checkPictures.map((item:any) => {
          picture.lists.map((pictureItem:any) => {
            if(pictureItem.id==item) {
              html = html+'<img src="'+pictureItem.path+'" />'
            }
          })
        })
        tinymceEditor.insertContent(html);
      }
    }

    checkPictureForm.resetFields();
    changePictureBoxVisible(false);
  };

  const closePictureBox = (e:any) => {
    changePictureBoxVisible(false);
  };

  const editorExecCommand = (content:any, editor:any) => {
    if(sessionStorage['editorCommand'] == 'multipleimage') {
      changePictureBoxVisible(true);
      getPictures();
      setTinymceEditor(editor);
      checkPictureForm.resetFields();
      sessionStorage.removeItem('editorCommand');
    }
  };

  const onSearchPicture = (values:any) => {

    if (values['pictureSearchDate']) {
      if (values['pictureSearchDate'][0] && values['pictureSearchDate'][1]) {
        // 时间标准化
        let dateStart = values['pictureSearchDate'][0].format('YYYY-MM-DD HH:mm:ss');
        let dateEnd = values['pictureSearchDate'][1].format('YYYY-MM-DD HH:mm:ss');
        // 先清空对象
        values['pictureSearchDate'] = [];
        // 重新赋值对象
        values['pictureSearchDate'] = [dateStart, dateEnd];
      }
    }

    getPictures(1,values);
  };

  // 分页切换
  const changePagination = (page:any) => {
    getPictures(page);
  };

  const onSelectAllPictures = () => {
    let data:any = []
    picture.lists.map(function (item:any) {
      data.push(item.id)
    })

    let checkPictures = [];
    checkPictures = checkPictureForm.getFieldValue('checkPictures');
    if(checkPictures) {
      if(checkPictures.length == picture.lists.length) {
        checkPictureForm.resetFields();
      } else {
        checkPictureForm.setFieldsValue({'checkPictures':data});
      }
    } else {
      checkPictureForm.setFieldsValue({'checkPictures':data});
    }

  };

  const toggleChecked = (id:any) => {
    let checkPictures = checkPictureForm.getFieldValue('checkPictures');
    if(checkPictures) {
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

    let data:any = []
    checkPictures.map(function (item:any) {
      data.push(item)
      console.log(item);
    })

    checkPictureForm.setFieldsValue({'checkPictures':data});
  };

  const onDeletePicture = (id:any = null) => {

    if(id == null) {
      message.error('请选择数据', 3);
      return false;
    }

    dispatch({
      type: 'picture/delete',
      payload: {
        actionUrl: 'admin/picture/delete',
        id:id
      },
      callback: (res:any) => {
        getPictures(1);
      }
    });
  };

  const onDeletePictures = (e:any) => {

    e.persist();

    let ids = null;

    ids = checkPictureForm.getFieldValue('checkPictures');

    if(ids == null) {
      message.error('请选择数据', 3);
      return false;
    }

    dispatch({
      type: 'picture/delete',
      payload: {
        actionUrl: 'admin/picture/delete',
        id:ids
      },
      callback: (res:any) => {
        getPictures(1);
      }
    });
  };

  return (
      <span>
        <Editor
          value={value}
          onEditorChange={onContentChange}
          init={{
            language: 'zh_CN',
            height: height ? height : 500 ,
            width: width ? width :'100%',
            plugins: [
              'advlist autolink lists link charmap print preview anchor image',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount multipleimage'
            ],
            menu: {
                insert: {title: '插入', items: 'multipleimage link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime'},
            },
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help',
            fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
            relative_urls : false,
            remove_script_host : true,
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
              {!!picture && picture.categorys.map((category:any) => {
                return(<Menu.Item key={category.id}>{category.title}</Menu.Item>)
              })}
            </Menu>
          </Col>
          <Col span={20}>
            <Row gutter={16}>
              <Col span={24}>
                <span style={{float:'left'}}>
                  <Form layout="inline" form={searchPictureForm} onFinish={onSearchPicture}>
                    <Form.Item>
                      <Button onClick={onSelectAllPictures}>
                        全选
                      </Button>
                    </Form.Item>
                    <Form.Item
                      name='pictureSearchDate'
                    >
                      <RangePicker />
                    </Form.Item>
                    <Form.Item
                      name='pictureSearchName'
                    >
                      <Input placeholder="文件名称" />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        htmlType="submit"
                        type="primary"
                      >
                        搜索
                      </Button>
                    </Form.Item>
                  </Form>
                </span>
                <span style={{float:'right'}}>
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
                    headers={{authorization: 'Bearer ' + sessionStorage['token']}}
                    onChange = {(info:any) => {
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
              <Form.Item
                name='checkPictures'
              >
                <Checkbox.Group style={{ width: '100%' }}>
                  <Row gutter={[16, 16]}>
                    {!!picture && picture.lists.map((item:any) => {
                      return(
                        <Col span={4}>
                          <Card
                            hoverable={true}
                            size={'small'}
                            style={{ width: '100%' }}
                            cover={
                              <img
                                onClick={() => toggleChecked(item.id)}
                                style={{objectFit: 'cover'}}
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
                            <Meta
                              title={item.name}
                            />
                          </Card>
                        </Col>
                      )
                    })}
                  </Row>
                </Checkbox.Group>
              </Form.Item>
            </Form>
            <Divider />
            <Row>
              <Col span={24} style={{textAlign:'right'}}>
                {picture ?
                  <Pagination
                    style={{margin:'0 auto'}}
                    defaultCurrent={picture.pagination.defaultCurrent}
                    pageSize={picture.pagination.pageSize}
                    current={picture.pagination.current}
                    total={picture.pagination.total}
                    onChange={changePagination}
                  />
                :
                  null
                }
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
      </span>
  );
};

function mapStateToProps(state:any) {

  const {
    picture,
  } = state.picture;

  return {
    picture
  };
}

export default connect(mapStateToProps)(EditorPage);