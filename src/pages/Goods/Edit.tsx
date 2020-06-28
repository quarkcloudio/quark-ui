import React, { useContext, useState, useEffect, useRef, Component } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './Style.less';
import { MinusCircleOutlined,PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/zh-cn';
import zhCN from 'antd/es/locale/zh_CN';
import Editor from '@/components/Form/Editor';
import { parse } from 'qs';
import { history } from 'umi';

import {
  Card,
  Row,
  Col,
  InputNumber,
  DatePicker,
  Tabs,
  Switch,
  Tag,
  Form,
  Select,
  Input,
  Button,
  Checkbox,
  Radio,
  Upload,
  message,
  Modal,
  Steps,
  Cascader,
  TreeSelect,
  Divider,
  Typography,
  Table,
  Popconfirm,
  Affix,
  Space,
  ConfigProvider
} from 'antd';

const EditableContext = React.createContext<any>();

const EditableRow: React.FC<any> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell: React.FC<any> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async e => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {

    let rules = undefined;
    let editableCellClass = styles.editableCellValueWrap;
    let editableRowInput = styles.editableRowInput;

    if(dataIndex == 'goods_price' || dataIndex == 'stock_num') {
      rules = [
        {
          required: true,
          message: `${title}必填`
        }
      ];
    }

    if(dataIndex == 'goods_sn' || dataIndex == 'goods_barcode') {
      editableCellClass = styles.bigEditableCellValueWrap;
      editableRowInput = styles.bigEditableRowInput;
    }

    childNode = editing ? (
      <Form.Item
        className={editableRowInput}
        name={dataIndex}
        rules={rules}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className={editableCellClass}
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const {  RangePicker } = DatePicker;
const { TextArea } = Input;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { Step } = Steps;
const { TreeNode } = TreeSelect;
const { Title } = Typography;

interface IProps {
  dispatch:Dispatch<any>;
  submitting: boolean;
}

class CreatePage extends Component<any> {
  formRef: React.RefObject<any> = React.createRef();

  handleChangeStatus = (key:any) => {
    let dataSource = [...this.state.dataSource];
    dataSource[key-1]['status'] = dataSource[key-1]['status']==0 ? 1 :0 ;
    this.setState({ dataSource: dataSource});
  };

  handleSave = (row:any) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

  state = {
    msg: '',
    url: '',
    data: {
      categorys:[],
      shops:[],
      goodsUnits:[],
    },
    status: '',
    goodsMode:1,
    showFreightInfo:true,
    showSpecialInfo:false,
    shopId:'',
    categoryId:'',
    systemGoodsAttributes:false,
    goodsAttributes:false,
    checkedGoodsAttributes:[],
    loading: false,
    unitLoading:false,
    layoutLoading:false,
    columns:[],
    dataSource:false,
    checkedGoodsAttributeValues:[],
    coverId:false,
    fileId:false,
  };

  // 当挂在模板时，初始化数据
  componentDidMount() {
    // 获得url参数
    let params = parse(window.location.href.split('?')[1])
    let { search } = params;

    this.setState({ loading: true });

    this.props.dispatch({
      type: 'request/get',
      payload: {
        actionUrl: 'admin/goods/edit',
        ...search,
      },
      callback: (res:any) => {
        if (res) {
          let showFreightInfo = true;
          let showSpecialInfo = false;

          if (res.data.goods_mode == 1) {
            let showFreightInfo = true;
            let showSpecialInfo = false;
          } else if (res.data.goods_mode == 2) {
            let showFreightInfo = false;
            let showSpecialInfo = true;
          } else if (res.data.goods_mode == 3) {
            let showFreightInfo = false;
            let showSpecialInfo = true;
          }

          this.setState({
            loading: false,
            data: res.data,
            coverId: res.data.cover_id,
            fileId: res.data.file_id,
            showFreightInfo: showFreightInfo,
            showSpecialInfo: showSpecialInfo,
            systemGoodsAttributes: res.data.systemGoodsAttributes,
            goodsAttributes: res.data.goodsAttributes,
            checkedGoodsAttributes: res.data.checkedGoodsAttributes,
            checkedGoodsAttributeValues: res.data.checkedGoodsAttributeValues,
            goodsSkus: res.data.goodsSkus
          });

          this.formRef.current.setFieldsValue(res.data);

          this.initGoodsAttributeValue();
        }
      },
    });
  }

  reload = (e:any) => {
    // unitLoading
    this.setState({ unitLoading: true, layoutLoading: true });

    // 获得url参数
    let params = parse(window.location.href.split('?')[1])
    let { search } = params;

    this.props.dispatch({
      type: 'request/get',
      payload: {
        actionUrl: 'admin/goods/edit',
        ...search,
      },
      callback: (res:any) => {
        if (res) {
          this.setState({ data: res.data, unitLoading: false, layoutLoading: false });
        }
      },
    });
  };

  onFinish = (values:any) => {

    let dataSource = [];
    this.state.dataSource.map((row:any) => {
      let getRow = { ...row };
      dataSource.push(getRow);
    });

    values['goods_skus'] = this.state.dataSource;
    values['cover_id'] = this.state.coverId;
    values['file_id'] = this.state.fileId;
    this.props.dispatch({
      type: 'request/post',
      payload: {
        actionUrl: 'admin/goods/save',
        ...values,
      },
    });
  };

  onGoodsModeChange = (e:any) => {
    if(e.target.value == 1) {
      this.setState({
        showFreightInfo: true,
        showSpecialInfo: false,
      });
    } else if(e.target.value == 2) {
      this.setState({
        showFreightInfo: false,
        showSpecialInfo: true,
      });
    } else if(e.target.value == 3) {
      this.setState({
        showFreightInfo: false,
        showSpecialInfo: true,
      });
    }
  };

  onShopChange = (value:any) => {
    this.setState({
      shopId: value,
    });
  };

  onCategoryChange = (value:any) => {

    this.setState({
      categoryId: value[value.length-1],
    });

    this.props.dispatch({
      type: 'request/get',
      payload: {
        actionUrl: 'admin/goods/attribute',
        categoryId: value[value.length-1],
        shopId: this.state.shopId,
      },
      callback: (res:any) => {
        if (res) {
          this.setState({ 
            systemGoodsAttributes: res.data.systemGoodsAttributes,
            shopGoodsAttributes: res.data.shopGoodsAttributes,
            goodsAttributes:res.data.goodsAttributes
          });
        }
      }
    });

  };

  onGoodsAttributeChange = (value:any) => {
    this.setState({
      checkedGoodsAttributes: value,
    });
  };

  onGoodsAttributeValueChange = (goodsAttributeValues:any, goodsAttributeId:any) => {
    let checkedGoodsAttributeValues:any = [];

    this.state.checkedGoodsAttributes.map((checkedGoodsAttribute:any) => {
      let getCheckedGoodsAttributeValues:any = [];

      if (goodsAttributeId == checkedGoodsAttribute) {
        getCheckedGoodsAttributeValues['value'] = goodsAttributeValues;
      } else {
        getCheckedGoodsAttributeValues['value'] = this.formRef.current.getFieldValue(
          'goodsAttribute' + checkedGoodsAttribute,
        );
      }

      if (getCheckedGoodsAttributeValues['value'] != undefined) {
        getCheckedGoodsAttributeValues['id'] = checkedGoodsAttribute;
        checkedGoodsAttributeValues.push(getCheckedGoodsAttributeValues);
      }
    });

    let getColumns = [];

    let col = {
      title: 'ID',
      dataIndex: 'id',
    };
    getColumns.push(col);

    let tempCheckedGoodsAttributeValues:any = [];

    if (this.state.checkedGoodsAttributes) {
      this.state.goodsAttributes.map((value:any) => {
        if (this.state.checkedGoodsAttributes.indexOf(value.id) != -1) {
          console.log(checkedGoodsAttributeValues);
          checkedGoodsAttributeValues.map((value1:any, index:any) => {
            if (value.id == value1['id'] && value1['value'].length != 0) {
              col = {
                title: value.name,
                dataIndex: value.id,
              };
              getColumns.push(col);
              tempCheckedGoodsAttributeValues.push(value1['value']);
            }
          });
        }
      });
    }

    let defaultColumns = [
      {
        title: '市场价',
        dataIndex: 'market_price',
        editable: true,
      },
      {
        title: '成本价',
        dataIndex: 'cost_price',
        editable: true,
      },
      {
        title: '店铺价',
        dataIndex: 'goods_price',
        editable: true,
      },
      {
        title: '库存',
        dataIndex: 'stock_num',
        editable: true,
      },
      {
        title: '商品货号',
        dataIndex: 'goods_sn',
        editable: true,
      },
      {
        title: '商品条形码',
        dataIndex: 'goods_barcode',
        editable: true,
      },
      {
        title: '操作',
        dataIndex: 'status',
        render: (text:any, record:any) =>
          text != 0 ? (
            <Popconfirm
              title="确定要禁用吗？"
              onConfirm={() => this.handleChangeStatus(record.key)}
            >
              <a>禁用</a>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="确定要启用吗？"
              onConfirm={() => this.handleChangeStatus(record.key)}
            >
              <a>启用</a>
            </Popconfirm>
          ),
      },
    ];

    defaultColumns.map(value => {
      getColumns.push(value);
    });

    let columns = getColumns.map((col:any) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record:any) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    let dataSource:any = [];
    let dataSourceLength = 0;

    let descarteValues:any = this.descartes(tempCheckedGoodsAttributeValues);

    if (descarteValues.length != 0) {
      descarteValues.map((descarteValue:any) => {
        dataSourceLength = dataSourceLength + 1;

        let colValue:any = [];
        colValue['id'] = dataSourceLength;
        colValue['key'] = dataSourceLength;
        colValue['status'] = 1;

        this.state.goodsSkus.map((goodsSku:any) => {
          if (goodsSku.goods_attribute_info.sort().toString() == descarteValue.sort().toString()) {
            colValue['market_price'] = goodsSku['market_price'];
            colValue['cost_price'] = goodsSku['cost_price'];
            colValue['goods_price'] = goodsSku['goods_price'];
            colValue['stock_num'] = goodsSku['stock_num'];
            colValue['goods_sn'] = goodsSku['goods_sn'];
            colValue['goods_barcode'] = goodsSku['goods_barcode'];
            colValue['status'] = goodsSku['status'];
          }
        });

        if (descarteValue.length != undefined) {
          descarteValue.map((mapDescarteValue:any) => {
            this.state.goodsAttributes.map((goodsAttribute:any) => {
              goodsAttribute.vname.map((vname:any) => {
                if (vname.id == mapDescarteValue) {
                  colValue[goodsAttribute.id] = vname.vname;
                  colValue['goodsAttribute_' + goodsAttribute.id] =
                    'goodsAttribute_id:' +
                    goodsAttribute.id +
                    ';goodsAttribute_name:' +
                    goodsAttribute.name +
                    ';goodsAttribute_value_id:' +
                    vname.id +
                    ';goodsAttribute_value_name:' +
                    vname.vname;
                }
              });
            });
          });
        }

        dataSource.push(colValue);
      });
    } else {
      tempCheckedGoodsAttributeValues.map((descarteValue:any, index:any) => {
        if (descarteValue.length != undefined) {
          descarteValue.sort().map((mapDescarteValue:any) => {
            dataSourceLength = dataSourceLength + 1;

            let colValue:any = [];
            colValue['id'] = dataSourceLength;
            colValue['key'] = dataSourceLength;
            colValue['status'] = 1;
            this.state.goodsSkus.map((goodsSku:any) => {
              if (
                goodsSku.goods_attribute_info.sort().toString() == descarteValue.sort().toString()
              ) {
                colValue['market_price'] = goodsSku['market_price'];
                colValue['cost_price'] = goodsSku['cost_price'];
                colValue['goods_price'] = goodsSku['goods_price'];
                colValue['stock_num'] = goodsSku['stock_num'];
                colValue['goods_sn'] = goodsSku['goods_sn'];
                colValue['goods_barcode'] = goodsSku['goods_barcode'];
                colValue['status'] = goodsSku['status'];
              }
            });

            this.state.goodsAttributes.map((goodsAttribute:any) => {
              goodsAttribute.vname.map((vname:any) => {
                if (vname.id == mapDescarteValue) {
                  colValue[goodsAttribute.id] = vname.vname;
                  colValue['goodsAttribute_' + goodsAttribute.id] =
                  'goodsAttribute_id:' +
                  goodsAttribute.id +
                  ';goodsAttribute_name:' +
                  goodsAttribute.name +
                  ';goodsAttribute_value_id:' +
                  vname.id +
                  ';goodsAttribute_value_name:' +
                  vname.vname;
                  dataSource.push(colValue);
                }
              });
            });
          });
        }
      });
    }

    this.setState({
      dataSource: dataSource,
      columns: columns,
      checkedGoodsAttributeValues: checkedGoodsAttributeValues,
    });
  };

  initGoodsAttributeValue = () => {
    let checkedGoodsAttributeValues = this.state.data.checkedGoodsAttributeValues;

    let getColumns = [];

    let col = {
      title: 'ID',
      dataIndex: 'id',
    };
    getColumns.push(col);

    let tempCheckedGoodsAttributeValues:any = [];

    if (this.state.checkedGoodsAttributes) {
      this.state.goodsAttributes.map((value:any) => {
        if (this.state.checkedGoodsAttributes.indexOf(value.id) != -1) {
          checkedGoodsAttributeValues.map((value1:any, index:any) => {
            if (value.id == value1['id'] && value1['value'].length != 0) {
              col = {
                title: value.name,
                dataIndex: value.id,
              };
              getColumns.push(col);
              tempCheckedGoodsAttributeValues.push(value1['value']);
            }
          });
        }
      });
    }

    let defaultColumns = [
      {
        title: '市场价',
        dataIndex: 'market_price',
        editable: true,
      },
      {
        title: '成本价',
        dataIndex: 'cost_price',
        editable: true,
      },
      {
        title: '店铺价',
        dataIndex: 'goods_price',
        editable: true,
      },
      {
        title: '库存',
        dataIndex: 'stock_num',
        editable: true,
      },
      {
        title: '商品货号',
        dataIndex: 'goods_sn',
        editable: true,
      },
      {
        title: '商品条形码',
        dataIndex: 'goods_barcode',
        editable: true,
      },
      {
        title: '操作',
        dataIndex: 'status',
        render: (text:any, record:any) =>
          text != 0 ? (
            <Popconfirm
              title="确定要禁用吗？"
              onConfirm={() => this.handleChangeStatus(record.key)}
            >
              <a>禁用</a>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="确定要启用吗？"
              onConfirm={() => this.handleChangeStatus(record.key)}
            >
              <a>启用</a>
            </Popconfirm>
          ),
      },
    ];

    defaultColumns.map(value => {
      getColumns.push(value);
    });

    let columns = getColumns.map((col:any) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record:any) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    let dataSource:any = [];
    let dataSourceLength = 0;

    let descarteValues:any = this.descartes(tempCheckedGoodsAttributeValues);

    if (descarteValues.length != 0) {
      descarteValues.map((descarteValue:any) => {
        dataSourceLength = dataSourceLength + 1;

        let colValue:any = [];
        colValue['id'] = dataSourceLength;
        colValue['key'] = dataSourceLength;
        this.state.goodsSkus.map((goodsSku:any) => {
          if (goodsSku.goods_attribute_info.sort().toString() == descarteValue.sort().toString()) {
            colValue['market_price'] = goodsSku['market_price'];
            colValue['cost_price'] = goodsSku['cost_price'];
            colValue['goods_price'] = goodsSku['goods_price'];
            colValue['stock_num'] = goodsSku['stock_num'];
            colValue['goods_sn'] = goodsSku['goods_sn'];
            colValue['goods_barcode'] = goodsSku['goods_barcode'];
            colValue['status'] = goodsSku['status'];
          }
        });

        if (descarteValue.length != undefined) {
          descarteValue.map((mapDescarteValue:any) => {
            this.state.goodsAttributes.map((goodsAttribute:any) => {
              goodsAttribute.vname.map((vname:any) => {
                if (vname.id == mapDescarteValue) {
                  colValue[goodsAttribute.id] = vname.vname;
                  colValue['goodsAttribute_' + goodsAttribute.id] =
                    'goodsAttribute_id:' +
                    goodsAttribute.id +
                    ';goodsAttribute_name:' +
                    goodsAttribute.name +
                    ';goodsAttribute_value_id:' +
                    vname.id +
                    ';goodsAttribute_value_name:' +
                    vname.vname;
                }
              });
            });
          });
        }

        dataSource.push(colValue);
      });
    } else {
      if (checkedGoodsAttributeValues != undefined) {

        tempCheckedGoodsAttributeValues.map((descarteValue:any, index:any) => {

          if (descarteValue.length != undefined) {

            descarteValue.sort().map((mapDescarteValue:any) => {
              dataSourceLength = dataSourceLength + 1;

              let colValue:any = [];
              colValue['id'] = dataSourceLength;
              colValue['key'] = dataSourceLength;

              this.state.goodsSkus.map((goodsSku:any) => {
                if (
                  goodsSku.goods_attribute_info.sort().toString() == mapDescarteValue.toString()
                ) {
                  colValue['market_price'] = goodsSku['market_price'];
                  colValue['cost_price'] = goodsSku['cost_price'];
                  colValue['goods_price'] = goodsSku['goods_price'];
                  colValue['stock_num'] = goodsSku['stock_num'];
                  colValue['goods_sn'] = goodsSku['goods_sn'];
                  colValue['goods_barcode'] = goodsSku['goods_barcode'];
                  colValue['status'] = goodsSku['status'];
                }
              });

              this.state.goodsAttributes.map((goodsAttribute:any) => {
                goodsAttribute.vname.map((vname:any) => {
                  if (vname.id == mapDescarteValue) {
                    colValue[goodsAttribute.id] = vname.vname;
                    colValue['goodsAttribute_' + goodsAttribute.id] =
                    'goodsAttribute_id:' +
                    goodsAttribute.id +
                    ';goodsAttribute_name:' +
                    goodsAttribute.name +
                    ';goodsAttribute_value_id:' +
                    vname.id +
                    ';goodsAttribute_value_name:' +
                    vname.vname;
                    dataSource.push(colValue);
                  }
                });
              });
            });
          }
        });
      }
    }

    this.setState({
      dataSource: dataSource,
      columns: columns,
      checkedGoodsAttributeValues: checkedGoodsAttributeValues,
    });
  };

  descartes = (myArray:any) => {

    let i = 0;
    myArray.map((value:any) => {
      if(value && value.length>0) {
        i = i+1;
      }
    });

    if( i < 2 ) return [];

    return [].reduce.call(myArray, function(col:any, set:any) {
        var res = [];
        col.forEach(function(c:any) {
            set.forEach(function(s:any) {
                var t = [].concat( Array.isArray(c) ? c : [c] );
                t.push(s);
                res.push(t);
        })});
        return res;
    });
  }

  // todo
  getCheckedGoodsAttributeValues = (goodsAttributeId:any) => {
    var getCheckedGoodsAttributeValue:any = undefined;
    if (this.state.checkedGoodsAttributeValues) {
      this.state.checkedGoodsAttributeValues.map(checkedGoodsAttributeValue => {
        if (checkedGoodsAttributeValue['id'] == goodsAttributeId) {
          getCheckedGoodsAttributeValue = checkedGoodsAttributeValue['value'];
        }
      });
    }

    return getCheckedGoodsAttributeValue;
  };

  tabOnChange = (key:any) => {
    if (key == 2) {
      history.push('/goods/imageEdit?id=' + this.state.data.id);
    }
  };

  render() {

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 21 },
      },
    };

    const attrFormItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 22 },
      },
    };

    const goodsAttributeFormItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 21 },
      },
    };

    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 24, offset: 0 },
      },
    };

    let state = {
      loading: false,
    };

    // 单图片上传模式
    let uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );

    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      }
    };

    return (
      <ConfigProvider locale={zhCN}>
      <PageHeaderWrapper title="编辑商品">
        <div style={{background:'#fff',padding:'0 10px'}}>
        <Tabs
            defaultActiveKey="1"
            onChange={this.tabOnChange}
            tabBarExtraContent={
              <a href="javascript:history.go(-1)">返回上一页&nbsp;&nbsp;&nbsp;&nbsp;</a>
            }
          >
            <TabPane tab="编辑商品" key="1">
              <Form
                onFinish={this.onFinish}
                ref={this.formRef}
                initialValues={{
                  goods_mode:1,
                  pricing_mode:1,
                  stock_mode:1,
                  goods_moq:0,
                  top_layout_id:0,
                  bottom_layout_id:0,
                  packing_layout_id:0,
                  service_layout_id:0,
                  goods_weight:0,
                  goods_volume:0,
                  sort:0,
                  effective_type:1,
                  valid_period_type:1,
                  is_expired_refund:true,
                  status:true
                }}
                style={{ marginTop: 8 }}
              >
                <Form.Item
                  style={{display:'none'}}
                  name={'id'}
                >
                  <Input/>
                </Form.Item>
                <Form.Item {...formItemLayout} label="所属商家" name={'shop_id'}>
                  <Select
                    placeholder="请选择所属商家"
                    style={{ width: 400 }}
                    onChange={this.onShopChange}
                  >
                    {!!this.state.data.shops && this.state.data.shops.map((option:any) => {
                      return (<Option key={option.id} value={option.id}>{option.title}</Option>)
                    })}
                  </Select>
                </Form.Item>
                <Form.Item {...formItemLayout} label="商品分类" name={'goods_category_id'}>
                  <Cascader
                    style={{ width: 400 }}
                    options={this.state.data.categorys}
                    placeholder="请选择商品分类"
                    onChange={this.onCategoryChange}
                  />
                </Form.Item>
                <Form.Item {...formItemLayout} label="商品类别" name={'goods_mode'}>
                    <Radio.Group onChange={this.onGoodsModeChange}>
                      <Radio value={1}>实物商品（物流发货）</Radio>
                      <Radio value={2}>电子卡券（无需物流）</Radio>
                      <Radio value={3}>服务商品（无需物流）</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item {...formItemLayout} label="扩展分类" name={'other_category_ids'}>
                    <TreeSelect
                      treeData={this.state.data.categorys}
                      showSearch
                      style={{ width: 400 }}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      placeholder="请选择扩展分类"
                      allowClear
                      multiple
                      treeDefaultExpandAll
                    >
                    </TreeSelect>
                </Form.Item>
                <Form.Item {...formItemLayout} label="商品名称" name={'goods_name'}>
                    <Input style={{ width: 400 }} placeholder="请输入规格名称" />
                </Form.Item>
                <Form.Item {...formItemLayout} label="关键词" name={'keywords'}>
                    <Input style={{ width: 400 }} placeholder="请输入关键词" />
                </Form.Item>
                <Form.Item {...formItemLayout} label="商品买点" name={'description'}>
                    <TextArea
                      style={{ width: 400 }}
                      placeholder="请输入商品买点"
                    />
                </Form.Item>
                <Form.Item {...formItemLayout} label="计价方式" name={'pricing_mode'}>
                    <Radio.Group>
                      <Radio value={1}>计件</Radio>
                      <Radio value={2}>计重</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item {...formItemLayout} label="商品单位">
                  <Space style={{ display: 'flex', marginBottom: 0 }} align="start">
                    <Form.Item name={'goods_unit_id'}>
                      <Select
                        placeholder="请选择商品单位"
                        style={{ width: 200 }}
                      >
                        {!!this.state.data.goodsUnits && this.state.data.goodsUnits.map((option:any) => {
                          return (<Option key={option.id} value={option.id}>{option.name}</Option>)
                        })}
                      </Select>
                    </Form.Item>
                    <Form.Item>
                      <Button href="#/admin/quark/engine?api=admin/goodsUnit/create&component=form" target="_blank" type="primary">新建商品单位</Button>
                      &nbsp;&nbsp;<Button onClick={this.reload} loading={this.state.unitLoading}>重新加载</Button>
                    </Form.Item>
                  </Space>
                </Form.Item>
                <Form.Item {...formItemLayout} label="商品品牌" name={'goods_brand_id'}>
                    <Select
                    placeholder="请选择商品品牌"
                    style={{ width: 200 }}
                    >
                      {!!this.state.data.goodsBrands && this.state.data.goodsBrands.map((option:any) => {
                        return (<Option key={option.id} value={option.id}>{option.name}</Option>)
                      })}
                    </Select>
                </Form.Item>
                <Form.Item {...formItemLayout} label="商品属性">
                  <div style={{background:'rgba(93,178,255,.1)',border:'1px solid #bce8f1',borderRadius:'2px',padding:'10px'}}>
                  {this.state.systemGoodsAttributes ? 
                    <div style={{width:'100%',borderBottom:'solid 1px #22baa0',lineHeight:'30px'}}>
                      <span style={{display:'inline-block',padding:'0px 10px',background:'#22baa0',color:'#fff',fontSize:'13px',fontWeight:700,lineHeight:'30px'}}>平台系统属性</span>
                    </div>
                  : null}

                      <div style={{marginTop:'20px'}}>
                        {!!this.state.systemGoodsAttributes && this.state.systemGoodsAttributes.map((systemGoodsAttribute:any) => {
                          if(systemGoodsAttribute.style == 1) {
                            // 多选
                            return (
                              <Form.Item
                                {...attrFormItemLayout}
                                label={systemGoodsAttribute.name}
                                name={'system_goods_attribute_'+systemGoodsAttribute.id}
                                initialValue={systemGoodsAttribute.goods_attribute_value_id}
                              >
                                <Checkbox.Group>
                                  {!!systemGoodsAttribute.vname && systemGoodsAttribute.vname.map((option:any) => {
                                    return (<Checkbox value={option.id}>{option.vname}</Checkbox>)
                                  })}
                                </Checkbox.Group>
                              </Form.Item>
                            )
                          }

                          if(systemGoodsAttribute.style == 2) {
                            // 单选
                            return (
                              <Form.Item
                                {...attrFormItemLayout}
                                label={systemGoodsAttribute.name}
                                name={'system_goods_attribute_'+systemGoodsAttribute.id}
                                initialValue={systemGoodsAttribute.goods_attribute_value_id}
                              >
                                <Select style={{ width: 200 }}>
                                  {!!systemGoodsAttribute.vname && systemGoodsAttribute.vname.map((option:any) => {
                                    return (<Option value={option.id}>{option.vname}</Option>)
                                  })}
                                </Select>
                              </Form.Item>
                            )
                          }

                          if(systemGoodsAttribute.style == 3) {
                            // 输入框
                            return (
                              <Form.Item
                                {...attrFormItemLayout}
                                label={systemGoodsAttribute.name}
                                name={'system_goods_attribute_'+systemGoodsAttribute.id}
                                initialValue={systemGoodsAttribute.goods_attribute_value_id}
                              >
                                <Input style={{ width: 200 }} />
                              </Form.Item>
                            )
                          }

                        })}
                      </div>

                      <div style={{width:'100%',borderBottom:'solid 1px #22baa0',lineHeight:'30px'}}>
                        <span style={{display:'inline-block',padding:'0px 10px',background:'#22baa0',color:'#fff',fontSize:'13px',fontWeight:700,lineHeight:'30px'}}>店铺自定义属性</span>
                      </div>
                      <div style={{marginTop:'20px'}}>
                        <Form.List name="goods_shop_spus">
                          {(fields, { add, remove }) => {
                            return (
                              <div>
                                {fields.map(field => (
                                  <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                                    <Form.Item
                                      {...field}
                                      style={{ width: '100px'}}
                                      name={[field.name, 'attribute_name']}
                                      fieldKey={[field.fieldKey, 'attribute_name']}
                                    >
                                      <Input placeholder="属性名" />
                                    </Form.Item>
                                    <Form.Item
                                      {...field}
                                      style={{ width: '400px'}}
                                      name={[field.name, 'attribute_value']}
                                      fieldKey={[field.fieldKey, 'attribute_value']}
                                    >
                                      <Input placeholder="属性值，多个值间用英文逗号分割" />
                                    </Form.Item>

                                    <MinusCircleOutlined
                                      onClick={() => {
                                        remove(field.name);
                                      }}
                                    />
                                  </Space>
                                ))}

                                <Form.Item>
                                  <Button
                                    type="primary"
                                    onClick={() => {
                                      add();
                                    }}
                                  >
                                    <PlusOutlined /> 添加自定义属性
                                  </Button>
                                </Form.Item>
                              </div>
                            );
                          }}
                        </Form.List>
                      </div>
                  </div>
                </Form.Item>
                <Form.Item {...formItemLayout} label="商品规格">
                  <div
                    style={{
                      background: 'rgba(93,178,255,.1)',
                      border: '1px solid #bce8f1',
                      borderRadius: '2px',
                      padding: '10px',
                    }}
                  >
                    {this.state.goodsAttributes ? (
                      <div style={{ marginTop: '20px' }}>
                        <Form.Item
                          {...goodsAttributeFormItemLayout}
                          label="选择规格"
                          name={'goodsAttribute'}
                          initialValue={this.state.checkedGoodsAttributes
                            ? this.state.checkedGoodsAttributes
                            : undefined}
                        >
                          <Checkbox.Group onChange={this.onGoodsAttributeChange}>
                            {!!this.state.goodsAttributes &&
                              this.state.goodsAttributes.map((goodsAttribute:any) => {
                                // 多选
                                return (
                                  <Checkbox value={goodsAttribute.id}>
                                    {goodsAttribute.name}
                                  </Checkbox>
                                );
                              })}
                          </Checkbox.Group>
                        </Form.Item>
                      </div>
                    ) : null}

                    <div style={{ marginTop: '20px' }}>
                      {!!this.state.goodsAttributes &&
                        this.state.goodsAttributes.map((goodsAttribute:any) => {
                          // 多选
                          if (
                            this.state.checkedGoodsAttributes.indexOf(goodsAttribute.id) != -1
                          ) {
                            return (
                              <Form.Item
                                {...attrFormItemLayout}
                                label={goodsAttribute.name}
                                name={'goodsAttribute' + goodsAttribute.id}
                                initialValue={this.getCheckedGoodsAttributeValues(
                                  goodsAttribute.id
                                )}
                              >
                                <Checkbox.Group
                                  onChange={value =>
                                    this.onGoodsAttributeValueChange(value, goodsAttribute.id)
                                  }
                                >
                                  {!!goodsAttribute.vname &&
                                    goodsAttribute.vname.map((option:any) => {
                                      return (
                                        <Checkbox value={option.id}>{option.vname}</Checkbox>
                                      );
                                    })}
                                </Checkbox.Group>
                              </Form.Item>
                            );
                          }
                        })}
                    </div>

                    {this.state.dataSource && this.state.goodsAttributes ? (
                      <div style={{ marginTop: '20px', background: '#fff' }}>
                        <Table
                          components={components}
                          rowClassName={styles.editableRow}
                          bordered
                          dataSource={this.state.dataSource}
                          columns={this.state.columns}
                          pagination={false}
                        />
                      </div>
                    ) : null}
                  </div>
                </Form.Item>
                <Form.Item {...formItemLayout} label="最小起订量" name={'goods_moq'}>
                  <InputNumber style={{ width: 200 }} placeholder="最小起订量" />
                </Form.Item>
                <Form.Item {...formItemLayout} label="店铺价" name={'goods_price'}>
                  <InputNumber step={0.01} style={{ width: 200 }} placeholder="请输入店铺价" />
                </Form.Item>
                <Form.Item {...formItemLayout} label="市场价" name={'market_price'}>
                  <InputNumber step={0.01} style={{ width: 200 }} placeholder="请输入市场价" />
                </Form.Item>
                <Form.Item {...formItemLayout} label="成本价" name={'cost_price'}>
                  <InputNumber step={0.01} style={{ width: 200 }} placeholder="请输入成本价" />
                </Form.Item>
                <Form.Item {...formItemLayout} label="商品库存" name={'stock_num'}>
                  <InputNumber style={{ width: 200 }} placeholder="请输入商品库存" />
                </Form.Item>
                <Form.Item {...formItemLayout} label="库存警告数量" name={'warn_num'}>
                  <InputNumber style={{ width: 200 }} placeholder="请输入库存警告数量" />
                </Form.Item>
                <Form.Item {...formItemLayout} label="商品货号" name={'goods_sn'}>
                  <Input style={{ width: 400 }} placeholder="请输入商品货号" />
                </Form.Item>
                <Form.Item {...formItemLayout} label="商品条形码" name={'goods_barcode'}>
                  <Input style={{ width: 400 }} placeholder="请输入商品条形码" />
                </Form.Item>
                <Form.Item {...formItemLayout} label="商品库位码" name={'goods_stockcode'}>
                  <Input style={{ width: 400 }} placeholder="请输入商品库位码" />
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="商品主图"
                >
                  <Upload
                    name={'file'}
                    listType={"picture-card"}
                    showUploadList={false}
                    action={'/api/admin/picture/upload'}
                    headers={{authorization: 'Bearer ' + sessionStorage['token']}}
                    beforeUpload = {(file) => {
                      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                        message.error('请上传jpg或png格式的图片!');
                        return false;
                      }
                      const isLt2M = file.size / 1024 / 1024 < 2;
                      if (!isLt2M) {
                        message.error('图片大小不可超过2MB!');
                        return false;
                      }
                      return true;
                    }}
                    onChange = {(info) => {
                      if (info.file.status === 'done') {
                        // Get this url from response in real world.
                        if (info.file.response.status === 'success') {
                          let fileList = [];
                          if (info.file.response) {
                            info.file.url = info.file.response.data.url;
                            info.file.uid = info.file.response.data.id;
                            info.file.id = info.file.response.data.id;
                          }
                          fileList[0] = info.file;
                          this.setState({ coverId: fileList });
                        } else {
                          message.error(info.file.response.msg);
                        }
                      }
                    }}
                  >
                    {this.state.coverId ? (
                      <img src={this.state.coverId[0]['url']} alt="avatar" width={80} />
                    ) : (uploadButton)}
                  </Upload>
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="主图视频"
                >
                  <Upload
                    name={'file'}
                    fileList={[]}
                    multiple={false}
                    action={'/api/admin/file/upload'}
                    headers={{authorization: 'Bearer ' + sessionStorage['token']}}
                    beforeUpload = {(file) => {
                      let canUpload = false;
                      let limitType = ['video/x-flv','video/mp4','video/x-msvideo','video/webm','video/mpeg','video/ogg']
                      for(var i = 0; i < limitType.length; i++) {
                        if(limitType[i] == file.type) {
                          canUpload = true;
                        }
                      }
                      if (!canUpload) {
                        message.error('请上传正确格式的文件!');
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
                      let fileList = info.fileList;
                      fileList = fileList.slice(-1);
                      fileList = fileList.map((file) => {
                        if (file.response) {
                          if(file.response.status === 'success') {
                            file.url = file.response.data.url;
                            file.uid = file.response.data.id;
                            file.id = file.response.data.id;
                          }
                        }
                        return file;
                      });
    
                      fileList = fileList.filter((file) => {
                        if (file.response) {
                          return file.response.status === 'success';
                        }
                        return true;
                      });
    
                      fileList[0] = info.file;
                      this.setState({ fileId: fileList });

                    }}
                  >
                    <Button>
                      <PlusOutlined /> 上传视频
                    </Button>
                  </Upload>
                </Form.Item>
                <Form.Item {...formItemLayout} label="商品内容">
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="电脑端" key="1">
                        <Form.Item name={'pc_content'}>
                          <Editor />
                        </Form.Item>
                    </TabPane>
                    <TabPane tab="手机端" key="2">
                        <Form.Item name={'mobile_content'}>
                          <Editor />
                        </Form.Item>
                    </TabPane>
                  </Tabs>
                </Form.Item>

                <Form.Item {...formItemLayout} label="详情版式">
                  <Space style={{ display: 'flex', marginBottom: 0 }} align="start">
                    <Form.Item name={'top_layout_id'} label="顶部模板">
                      <Select
                        placeholder="请选择顶部模板"
                        style={{ width: 200 }}
                      >
                        <Option key={0} value={0}>不使用</Option>
                        {!!this.state.data.topLayouts && this.state.data.topLayouts.map((option:any) => {
                          return (<Option key={option.id} value={option.id}>{option.layout_name}</Option>)
                        })}
                      </Select>
                    </Form.Item>
                    <Form.Item name={'bottom_layout_id'} label={'底部模板'}>
                      <Select
                        placeholder="请选择底部模板"
                        style={{ width: 200 }}
                      >
                        <Option  key={0} value={0}>不使用</Option>
                        {!!this.state.data.bottomLayouts && this.state.data.bottomLayouts.map((option:any) => {
                          return (<Option key={option.id} value={option.id}>{option.layout_name}</Option>)
                        })}
                      </Select>
                    </Form.Item>
                  </Space>
                  <Space style={{ display: 'flex', marginBottom: 0 }} align="start">
                    <Form.Item name={'packing_layout_id'} label={'包装清单版式'}>
                      <Select
                        placeholder="请选择包装清单版式"
                        style={{ width: 200 }}
                      >
                        <Option  key={0} value={0}>不使用</Option>
                        {!!this.state.data.packingLayouts && this.state.data.packingLayouts.map((option:any) => {
                          return (<Option key={option.id} value={option.id}>{option.layout_name}</Option>)
                        })}
                      </Select>
                    </Form.Item>
                    <Form.Item name={'service_layout_id'} label={'售后保障版式'}>
                      <Select
                        placeholder="请选择售后保障版式"
                        style={{ width: 200 }}
                      >
                        <Option  key={0} value={0}>不使用</Option>
                        {!!this.state.data.serviceLayouts && this.state.data.serviceLayouts.map((option:any) => {
                          return (<Option key={option.id} value={option.id}>{option.layout_name}</Option>)
                        })}
                      </Select>
                    </Form.Item>
                  </Space>
                  <Button href="#/admin/quark/engine?api=admin/goodsLayout/create&component=form" target="_blank" type="primary">新建详情版式</Button>
                  &nbsp;&nbsp;<Button onClick={this.reload} loading={this.state.layoutLoading}>重新加载</Button>
                </Form.Item>
                <span style={{display:this.state.showFreightInfo?'block':'none'}}>
                <Form.Item {...formItemLayout} label="物流重量(Kg)">
                  <Space style={{ display: 'flex', marginBottom: 0 }} align="start">
                    <Form.Item name={'goods_weight'}>
                      <InputNumber style={{ width: 200 }} placeholder="物流重量" />
                    </Form.Item>
                    <Form.Item>
                      &nbsp;Kg
                    </Form.Item>
                  </Space>
                </Form.Item>
                <Form.Item {...formItemLayout} label="物流体积(m³)">
                  <Space style={{ display: 'flex', marginBottom: 0 }} align="start">
                    <Form.Item name={'goods_volume'}>
                      <InputNumber style={{ width: 200 }} placeholder="物流体积" />
                    </Form.Item>
                    <Form.Item>
                      &nbsp;m³
                    </Form.Item>
                  </Space>
                </Form.Item>
                </span>
                <span style={{display:this.state.showSpecialInfo?'block':'none'}}>
                <Form.Item {...formItemLayout} label="兑换生效期" name={'effective_type'}>
                  <Radio.Group>
                    <Space style={{ display: 'flex', marginBottom: 0 }} align="start">
                      <Form.Item>
                        <Radio value={1}>付款完成立即生效</Radio>
                      </Form.Item>
                    </Space>
                    <Space style={{ display: 'flex', marginBottom: 0 }} align="start">
                      <Form.Item>
                        <Radio value={2}>付款完成</Radio>
                      </Form.Item>
                      <Form.Item name={'effective_hour'}>
                        <InputNumber style={{ width: 60 }} />
                      </Form.Item>
                      &nbsp;&nbsp;小时后生效
                    </Space>
                    <Space style={{ display: 'flex', marginBottom: 0 }} align="start">
                      <Form.Item>
                        <Radio value={3}>付款完成次日生效</Radio>
                      </Form.Item>
                    </Space>
                  </Radio.Group>
                </Form.Item>
                <Form.Item {...formItemLayout} label="使用有效期" name={'valid_period_type'}>
                    <Radio.Group>
                      <Space style={{ display: 'flex', marginBottom: 0 }} align="start">
                        <Form.Item>
                          <Radio value={1}>长期有效</Radio>
                        </Form.Item>
                      </Space>
                      <Space style={{ display: 'flex', marginBottom: 0 }} align="start">
                        <Form.Item>
                          <Radio value={2}>日期范围内有效</Radio>
                        </Form.Item>
                        <Form.Item name={'add_time'}>
                          <RangePicker
                            showTime={{
                              hideDisabledOptions: true,
                              defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                            }}
                            format="YYYY-MM-DD HH:mm:ss"
                          />
                        </Form.Item>
                      </Space>
                      <Space style={{ display: 'flex', marginBottom: 0 }} align="start">
                        <Form.Item>
                          <Radio value={3}> 自购买之日起，</Radio>
                        </Form.Item>
                        <Form.Item name={'valid_period_hour'}>
                          <InputNumber style={{ width: 60 }} />&nbsp;&nbsp;小时内有效
                        </Form.Item>
                      </Space>
                      <Space style={{ display: 'flex', marginBottom: 0 }} align="start">
                        <Form.Item>
                          <Radio value={4}> 自购买之日起，</Radio>
                        </Form.Item>
                        <Form.Item name={'valid_period_day'}>
                          <InputNumber style={{ width: 60 }} />&nbsp;&nbsp;天内有效
                        </Form.Item>
                      </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Item {...formItemLayout} label="支持过期退款" name={'is_expired_refund'} valuePropName={'checked'}>
                    <Switch checkedChildren="是" unCheckedChildren="否" />
                </Form.Item>
                </span>
                <Form.Item {...formItemLayout} label="排序" name={'sort'}>
                    <InputNumber style={{ width: 200 }} placeholder="排序" />
                </Form.Item>
                <Form.Item {...formItemLayout} label="库存计数" name={'stock_mode'} help="①拍下减库存：买家拍下商品即减少库存，存在恶拍风险。热销商品如需避免超卖可选此方式
  ②付款减库存：买家拍下并完成付款方可减少库存，存在超卖风险。如需减少恶拍、提高回款效率，可选此方式；货到付款时将在卖家确认订单时减库存
  ③出库减库存：卖家发货时减库存，如果库存充实，需要确保线上库存与线下库存保持一致，可选此方式">
                  <Radio.Group>
                    <Radio value={1}>拍下减库存</Radio>
                    <Radio value={2}>付款减库存</Radio>
                    <Radio value={3}>出库减库存</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item {...formItemLayout} label="状态" name={'status'} valuePropName={'checked'} >
                  <Switch checkedChildren="出售中" unCheckedChildren="已下架" />
                </Form.Item>
                <Affix offsetBottom={20}>
                  <Form.Item wrapperCol={{ span: 12, offset: 10 }}>
                    <Button href="#/admin/quark/engine?api=admin/goods/index&component=table">返回商品列表</Button>
                    &nbsp;&nbsp;
                    <Button type="primary" htmlType="submit">
                      确认提交
                    </Button>
                  </Form.Item>
                </Affix>
              </Form>
            </TabPane>
            <TabPane tab="编辑图片" key="2"></TabPane>
          </Tabs>
        </div>
      </PageHeaderWrapper>
      </ConfigProvider>
    );
  }
}

function mapStateToProps(state:any) {
  const { submitting } = state.request;
  return {
    submitting
  };
}

export default connect(mapStateToProps)(CreatePage);