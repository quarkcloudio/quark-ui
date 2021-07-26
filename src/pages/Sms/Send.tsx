import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './Style.less';
import { UploadOutlined } from '@ant-design/icons';
import { post, get } from '@/services/action';
import Layout from '@/components/Layout';
import {
  Spin,
  Card,
  Form,
  Input,
  Button,
  Upload,
  message,
} from 'antd';

const { TextArea } = Input;

const SendPage: React.FC<{}> = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values:any) => {
    const result = await post({
      actionUrl: 'admin/sms/sendImportSms',
      ...values
    });

    if(result.status === 'success') {
      message.success(result.msg);
    } else {
      message.error(result.msg);
    }
  };

  const importData = async (fileId:any) => {
    setLoading(true);
    const result = await get({
      actionUrl: 'admin/sms/import',
      fileId: fileId,
    });

    if(result.status === 'success') {
      form.setFieldsValue({'phone':result.data});
      message.success(result.msg);
    } else {
      message.error(result.msg);
    }

    setLoading(false);
  };

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
    <Layout cache={true}>
      <PageHeaderWrapper title="发送短信">
        <Spin tip="上传中..." spinning={loading}>
          <Card
            title="发送短信"
            bordered={false}
            extra={<a href="javascript:history.go(-1)">返回上一页</a>}
          >
            <div className={styles.container}>
              <Form form={form} onFinish={onFinish} style={{ marginTop: 8 }}>
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
                        importData(info.file.response.data.id);
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
                <Form.Item wrapperCol={{ span: 12, offset: 4 }}>
                  <Button type="primary" htmlType="submit">
                    发送
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Card>
        </Spin>
      </PageHeaderWrapper>
    </Layout>
  );
}

export default SendPage;