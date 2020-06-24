import React, { Component } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { MinusCircleOutlined,PlusOutlined } from '@ant-design/icons';
import { parse } from 'qs';

import {
  message,
  Form,
  Input,
  Button,
  Select,
  Radio,
  Steps,
  Upload,
  Modal
} from 'antd';

const Option = Select.Option;
const RadioGroup = Radio.Group;
const { Step } = Steps;
const { TextArea } = Input;

class ImageCreate extends Component<any> {

  formRef: React.RefObject<any> = React.createRef();

  state = {
    goodsId:false,
    fileList:[],
    previewImage:undefined,
    previewVisible:false
  };

  // 当挂在模板时，初始化数据
  componentDidMount() {

    // 获得url参数
    const params = this.props.location.query;

    // loading
    this.setState({loading:true,goodsId:params.id});
  }

  onFinish = (values:any) => {
    values['file_list'] = this.state.fileList;
    values['goods_id'] = this.state.goodsId;
    this.props.dispatch({
      type: 'request/post',
      payload: {
        actionUrl: 'admin/goods/imageStore',
        ...values,
      },
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

    let state = {
      loading: false,
    };

    // 多图片上传模式
    let uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );

    const handleCancel = () => {
      this.setState({
        previewImage : undefined,
        previewVisible : false,
      });
    };

    return (
      <PageHeaderWrapper title="上传商品图片">
        <div style={{background:'#fff',padding:'20px'}}>
          <Steps current={1} style={{width:'100%',margin:'30px auto'}}>
            <Step title="填写商品详情" />
            <Step title="上传商品图片" />
            <Step title="商品发布成功" />
          </Steps>
          <div className="steps-content" style={{width:'100%',margin:'40px auto'}}>
            <Form
              onFinish={this.onFinish}
              ref={this.formRef}
              style={{ marginTop: 8 }}
            >
              <Form.Item
                {...formItemLayout}
              >
                <Upload
                  name={'file'}
                  listType={"picture-card"}
                  fileList={this.state.fileList}
                  multiple={true}
                  onPreview={(file) => {
                    this.setState({
                      previewImage : file.url || file.thumbUrl,
                      previewVisible : true,
                    })
                  }}
                  action={'/api/admin/picture/upload'}
                  headers={{authorization: 'Bearer ' + sessionStorage['token']}}
                  beforeUpload = {(file) => {
                    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                      message.error('请上传jpg或png格式的图片!');
                      return false;
                    }
                    const isLtSize = file.size / 1024 / 1024 < 2;
                    if (!isLtSize) {
                      message.error('图片大小不可超过2MB!');
                      return false;
                    }
                    return true;
                  }}
                  onChange = {(info) => {
                    let fileList = info.fileList;
                    fileList = fileList.slice(-5);
                    fileList = fileList.map((file) => {
                      if (file.response) {
                        file.url = file.response.data.url;
                        file.uid = file.response.data.id;
                        file.id = file.response.data.id;
                      }
                      return file;
                    });
  
                    fileList = fileList.filter((file) => {
                      if (file.response) {
                        return file.response.status === 'success';
                      }
                      return true;
                    });
  
                    this.setState({
                      fileList : fileList,
                    });
                  }}
                >
                  {this.state.fileList.length >= 5 ? null : uploadButton}
                </Upload>
                <Modal
                  visible={this.state.previewVisible}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img style={{ width: '100%' }} src={this.state.previewImage} />
                </Modal>
              </Form.Item>
              <Form.Item wrapperCol={{ span: 12, offset: 10 }}>
                <Button type="primary" htmlType="submit">
                  下一步，确认商品发布
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
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

export default connect(mapStateToProps)(ImageCreate);