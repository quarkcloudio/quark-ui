import React, { Component } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './Style.less';
import { UploadOutlined } from '@ant-design/icons';
import {
  Spin,
  Card,
  Form,
  Input,
  Button,
  Upload,
  message,
} from 'antd';

interface IProps {
  dispatch:Dispatch<any>;
  submitting: boolean;
}

const { TextArea } = Input;

class SendPage extends Component<IProps> {

  formRef: React.RefObject<any> = React.createRef();

  state = {
    data:false,
    msg: '',
    url: '',
    status: '',
    loading: false
  };

  onFinish = (values:any) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'request/post',
      payload: {
        actionUrl: 'admin/sms/sendImportSms',
        ...values,
      },
    });
  };

  // 分页切换
  importData = (fileId:any) => {
    const { dispatch } = this.props;
    this.setState({loading: true});
    dispatch({
      type: 'request/get',
      payload: {
        actionUrl: 'admin/sms/import',
        fileId: fileId, // 分页数量
      },
      callback : (res:any) => {
        this.setState({loading: false});
        this.formRef.current.setFieldsValue({'phone':res.data});
        message.success(res.msg);
      }
    });
  };

  render() {

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };

    return (
      <PageHeaderWrapper title="发送短信">
        <Spin tip="上传中..." spinning={this.state.loading}>
          <Card
            title="发送短信"
            bordered={false}
            extra={<a href="javascript:history.go(-1)">返回上一页</a>}
          >
          <div className={styles.container}>
              <Form ref={this.formRef} onFinish={this.onFinish} style={{ marginTop: 8 }}>
                <Form.Item
                  label="手机号码"
                  name={'phone'}
                  {...formItemLayout}
                >
                  <TextArea style={{ width:400 }} autoSize={{ minRows: 4, maxRows: 15 }}/>
                </Form.Item>
                <Form.Item {...formItemLayout} label="导入手机号">
                  <Upload
                    showUploadList = {false}
                    name={'file'}
                    action={'/api/admin/file/upload'}
                    headers={{authorization: 'Bearer ' + sessionStorage['token']}}
                    beforeUpload = {(file) => {
                      let canUpload = false;
                      let limitType = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
                      for(var i = 0; i < limitType.length; i++) {
                        if(limitType[i] == file.type) {
                          canUpload = true;
                        }
                      }
                      if (!canUpload) {
                        message.error('请上传xlsx格式的文件!');
                        return false;
                      }
                      const isLtSize = file.size / 1024 / 1024 < 200;
                      if (!isLtSize) {
                        message.error('文件大小不可超过'+200+'MB!');
                        return false;
                      }
                      return true;
                    }}
                    onChange = {(info) => {
                      if (info.file.status === 'done') {
                        this.importData(info.file.response.data.id)
                      } else if (info.file.status === 'error') {
                        message.error('上传失败！');
                      }
                    }}
                  >
                    <Button ><UploadOutlined /> 上传Excel文件</Button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  label="短信内容"
                  name={'content'}
                  {...formItemLayout}
                >
                  <TextArea style={{ width:400 }} rows={4} />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                </Form.Item>
              </Form>
          </div>
        </Card>
      </Spin>
    </PageHeaderWrapper>
    );
  }
}

function mapStateToProps(state:any) {
  const { submitting } = state.request;
  return {
    submitting
  };
}

export default connect(mapStateToProps)(SendPage);