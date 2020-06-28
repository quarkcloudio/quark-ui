import React, { Component } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { MinusCircleOutlined,PlusOutlined } from '@ant-design/icons';
import { parse } from 'qs';

import {
  Space,
  Card,
  Form,
  Input,
  Button,
  InputNumber,
  Switch,
  Select,
  Radio,
} from 'antd';

const Option = Select.Option;
const RadioGroup = Radio.Group;

interface IProps {
  dispatch:Dispatch<any>;
  submitting: boolean;
}

const { TextArea } = Input;

class EditPage extends Component<any> {

  formRef: React.RefObject<any> = React.createRef();

  state = {
    goodsTypes:[],
  };

  // 当挂在模板时，初始化数据
  componentDidMount() {
    // 获得url参数
    let params = parse(window.location.href.split('?')[1])
    let { search } = params;
    // loading
    this.setState({ loading: true });

    this.props.dispatch({
      type: 'request/get',
      payload: {
        actionUrl: 'admin/goodsSpecification/edit',
        ...search
      },
      callback: (res:any) => {
        if (res) {
          this.setState({
            goodsTypes: res.data.goods_types
          });

          this.formRef.current.setFieldsValue(res.data.goods_attribute);
        }
      },
    });
  }

  onFinish = (values:any) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'request/post',
      payload: {
        actionUrl: 'admin/goodsSpecification/save',
        ...values,
      },
    });
  };

  render() {

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 22 },
      },
    };

    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        span: 12,
        offset: 2,
      },
    };

    let state = {
      loading: false,
    };

    return (
      <PageHeaderWrapper title="编辑商品规格">
        <Card
          size="small"
          title="编辑商品规格"
          bordered={false}
          extra={<a href="javascript:history.go(-1)">返回上一页</a>}
        >
        <div>
          <Form
            ref={this.formRef}
            onFinish={this.onFinish}
            style={{ marginTop: 8 }}
          >
            <Form.Item
              style={{display:'none'}}
              name={'id'}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="商品类型"
              name={`goods_type_id`}
            >
              <Select style={{ width: 200 }}>
                <Option value={0}>{'请选择类型'}</Option>
                {!!this.state.goodsTypes &&
                  this.state.goodsTypes.map((option:any) => {
                    return <Option value={option.id}>{option.name}</Option>;
                  })}
              </Select>
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="规格名称"
              name={'name'}
            >
              <Input style={{ width: 400 }} placeholder="请输入规格名称" />
            </Form.Item>
            <Form.Item {...formItemLayout} name={'description'} label="规格描述">
              <TextArea
                style={{ width: 400 }}
                placeholder="请输入规格描述"
              />
            </Form.Item>
            <Form.Item {...formItemLayout} name={'style'} label="显示样式">
              <RadioGroup>
                <Radio value={1}>{'多选'}</Radio>
              </RadioGroup>
            </Form.Item>

            <Form.List name="attribute_values">
              {(fields, { add, remove }) => {
                return (
                  <div>
                    {fields.map((field,index) => (
                      <Form.Item
                      {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                      label={index === 0 ? '规格值' : ''}
                      style={{ margin: 0 }}
                      >
                        <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                          <Form.Item
                            style={{display:'none'}}
                            {...field}
                            name={[field.name, 'id']}
                            fieldKey={[field.fieldKey, 'id']}
                          >
                            <Input/>
                          </Form.Item>
                          <Form.Item
                            {...field}
                            name={[field.name, 'vname']}
                            fieldKey={[field.fieldKey, 'vname']}
                          >
                            <Input placeholder="请输入规格可选值" />
                          </Form.Item>
                          <Form.Item
                            {...field}
                            name={[field.name, 'sort']}
                            fieldKey={[field.fieldKey, 'sort']}
                          >
                            <InputNumber placeholder="排序" />
                          </Form.Item>
                          <Form.Item
                            {...field}
                          >
                            <MinusCircleOutlined
                              onClick={() => {
                                remove(field.name);
                              }}
                            />
                          </Form.Item>
                        </Space>
                      </Form.Item>
                    ))}

                    <Form.Item {...formItemLayoutWithOutLabel}>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                        style={{ width: '400px' }}
                        block
                      >
                        <PlusOutlined /> 添加规格值
                      </Button>
                    </Form.Item>
                  </div>
                );
              }}
            </Form.List>
            <Form.Item {...formItemLayout} name={'sort'} label="排序">
              <InputNumber min={0} max={10000} style={{ width: 200 }} placeholder="排序" />
            </Form.Item>
            <Form.Item {...formItemLayout} name={'status'} valuePropName={'checked'} label="状态">
              <Switch checkedChildren="正常" unCheckedChildren="禁用"/>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
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

export default connect(mapStateToProps)(EditPage);