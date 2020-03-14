import React, { useEffect,useState } from 'react';
import styles from './TablePage.less';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import router from 'umi/router';
import { 
  PlusCircleOutlined,
  ExportOutlined,
  UpOutlined,
  DownOutlined,
  MoreOutlined,
  ExclamationCircleOutlined,
  QrcodeOutlined,
  RedoOutlined,
  ImportOutlined
} from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/zh_CN';

import {
  Table,
  Divider,
  Card,
  Spin,
  Row,
  Col,
  InputNumber,
  DatePicker,
  Tabs,
  Switch,
  Form,
  Select,
  Input,
  Button,
  Checkbox,
  Radio,
  Upload,
  message,
  Modal,
  Tree,
  Cascader,
  Breadcrumb,
  Popconfirm,
  Dropdown,
  Menu,
  Tag,
  Popover,
  Typography
} from 'antd';

const IconMap:any = {
  export: <ExportOutlined />,
  plusCircle: <PlusCircleOutlined />,
  redo: <RedoOutlined />,
  import: <ImportOutlined />
};

const { Text } = Typography;
const { TextArea } = Input;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const { TreeNode } = Tree;
const InputGroup = Input.Group;
const { confirm } = Modal;

export interface TablePageProps {
  api:string;
  search:[];
  content:{
    title:string,
    subTitle:string,
    description:string,
    breadcrumb:any,
    body:{
      table:{
        title:string,
        columns:any,
        dataSource:any,
        pagination:any,
        actions:any,
        batchActions:any,
        extendActions:any,
        rowActions:any,
        disableSearch:any,
        disableAdvancedSearch:any,
        search:any
      }
    }
  };
  routes:any;
  loading:boolean;
  dispatch:Dispatch<any>;
}

const TablePage: React.SFC<TablePageProps> = props => {

  const {
    api,
    search,
    content,
    routes,
    loading,
    dispatch
  } = props;

  // 创建searchExpand状态，并将其初始化为“false”
  const [searchExpand, changeSearchExpand] = useState(false);

  // 创建selectedRowKeys状态，并将其初始化为“[]”
  const [selectedRowKeys, changeSelectedRowKey] = useState([]);

  // 创建actionName，并将其初始化为“”
  const [actionName, changeActionName] = useState('');

  // 创建modal显示状态，并将其初始化为“false”
  const [modalVisible, changeModalVisible] = useState(false);

  // 初始modal数据，并将其初始化为“[]”
  const [modalData, changeModalData] = useState({
    title:'',
    okText:'确定',
    cancelText:'取消',
    width:undefined,
    form:{
      action:null,
      layout:[],
      items:[],
      initialValues:[]
    }
  });

  // 创建modal显示状态，并将其初始化为“false”
  const [rowKey, changeRowKey] = useState(null);

  // 创建actionName，并将其初始化为“”
  const [batchActionSelect, changeBatchActionSelect] = useState('batchAction|');
  const [extendActionSelect, changeExtendActionSelect] = useState('extendAction|');

  var columns = [];

  if(content.body.table.columns) {
    content.body.table.columns.map((column:any,key:any) => {

      if(column.using) {
        column.render = (text:any, row:any) => (
          <span>
            {columnRender(column, text, row, column.using[text])}
          </span>
        );
      } else {
        column.render = (text:any, row:any) => (
          <span>
            {columnRender(column,text, row)}
          </span>
        );
      }

      if(column.key == 'actions') {
        column.render = (text:any, row:any) => (
          content.body.table.rowActions.showStyle == 'dropdown' ? 
            <Dropdown
              overlay={
                <Menu>
                  {content.body.table.rowActions.items.map((item:any) => {
                      return menuComponent(item,content.body.table.rowActions.style,row.key);
                  })}
                </Menu>
              }
              trigger={['click']}
            >
              <a onClick={e => e.preventDefault()} style={{ fontSize:16, fontWeight: 'bolder' }}>
                <MoreOutlined/>
              </a>
            </Dropdown>
          : 
          <span>
            {content.body.table.rowActions.items.map((item:any) => {
                return buttonComponent(item,content.body.table.rowActions.style,row.key);
            })}
          </span>
        );
      }

      columns[key] = column;
    })
  }

  const columnRender = (column:any, text:any, row:any,usingText:any = null) => {

    let columnRender = null;

    if(column.tag) {
      if(column.tag.__proto__=Object.prototype) {
        columnRender = <Tag color={column.tag[text]}>{usingText ? usingText : text}</Tag>
      } else {
        columnRender = <Tag color={column.tag}>{usingText ? usingText : text}</Tag>
      }
    } else {
      columnRender = usingText ? usingText : text;
    }

    if(column.image) {
      if(column.image.path != '') {
        columnRender = <img src={column.image.path} width={column.image.width} height={column.image.height} />
      } else {
        columnRender = <img src={columnRender} width={column.image.width} height={column.image.height} />
      }
    }

    if(column.qrcode) {
      let img:any = null;
      if(column.qrcode.content != '') {
        img = <img
                src={'https://api.qrserver.com/v1/create-qr-code/?size='+column.qrcode.width+'x'+column.qrcode.height+'&data='+column.qrcode.content}
                width={column.qrcode.width}
                height={column.qrcode.height}
              />
      } else {
        img = <img
                src={'https://api.qrserver.com/v1/create-qr-code/?size='+column.qrcode.width+'x'+column.qrcode.height+'&data='+columnRender}
                width={column.qrcode.width}
                height={column.qrcode.height}
              />
      }

      columnRender = <Popover placement="left" content={img}>
                      <QrcodeOutlined style={{cursor:'pointer',fontSize:'18px'}} />
                    </Popover>
    }

    if(column.link) {
      if(column.link == true) {
        columnRender = <a href={"#/admin/quark/engine?api="+api.replace(/\/index/g, '/edit')+"&component=form"+"&search[id]="+row.key}>
                        {columnRender}
                       </a>
      } else {
        columnRender = <a href={column.link}>{columnRender}</a>
      }
    }

    return columnRender;
  }

  // rowSelection
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys:any) => changeSelectedRowKey(selectedRowKeys)
  };

  const [searchForm] = Form.useForm();
  const [form] = Form.useForm();

  /**
   * constructor
   */
  useEffect(() => {
    dispatch({
      type: 'table/info',
      payload: {
        actionUrl: api,
      },
      callback: (res:any) => {
        changeSearchExpand(res.data.content.body.table.search.expand);
      }
    });
  }, [dispatch, api]); // eslint-disable-line 

  // 加载searchComponent数据
  const searchComponent = (item:any) => {
    switch(item.component) {
      case 'input':
        if(item.operator == 'between') {
          return (
            <Form.Item
              key={item.name}
              label={item.label}
            >
              <InputGroup compact>
                <Form.Item
                  key={item.name+'_start'}
                  name={item.name+'_start'}
                >
                  <Input
                    style={{
                      textAlign: 'center',
                      ...item.style
                    }}
                    placeholder={item.placeholder[0]}
                  />
                </Form.Item>
                <Input
                  style={{
                    width: 30,
                    borderLeft: 0,
                    borderRight: 0,
                    pointerEvents: 'none',
                    backgroundColor: '#fff'
                  }}
                  placeholder="~"
                  disabled
                />
                <Form.Item
                  key={item.name+'_end'}
                  name={item.name+'_end'}
                >
                  <Input
                    className={styles.searchInputRight}
                    style={{
                      textAlign: 'center',
                      ...item.style
                    }}
                    placeholder={item.placeholder[1]}
                  />
                </Form.Item>
              </InputGroup>
            </Form.Item>
          )
        } else {
          return (
            <Form.Item
              key={item.name}
              label={item.label}
              name={item.name}
            >
              <Input
                placeholder={item.placeholder}
                style={item.style ? item.style : []}
              />
            </Form.Item>
          )
        }

        break;
      case 'select':
        return (
          <Form.Item
            key={item.name}
            label={item.label}
            name={item.name}
          >
            <Select
              style={item.style ? item.style : []}
              placeholder={item.placeholder}
            >
              {!!item.options && item.options.map((option:any) => {
                return (
                  <Option key={option.value} value={option.value}>{option.label}</Option>
                )
              })}
            </Select>
          </Form.Item>
        )
        
        break;
      case 'multipleSelect':
        return (
          <Form.Item
            key={item.name}
            label={item.label}
            name={item.name}
          >
            <Select
              mode="multiple"
              style={item.style ? item.style : []}
              placeholder={item.placeholder}
            >
              {!!item.options && item.options.map((option:any) => {
                return (
                  <Option key={option.value} value={option.value}>{option.label}</Option>
                )
              })}
            </Select>
          </Form.Item>
        )

        break;

      case 'datetime':
        if(item.operator == 'between') {
          return (
            <Form.Item
              key={item.name}
              label={item.label}
              name={item.name}
            >
              <RangePicker
                locale={locale}
                showTime={{ format: 'HH:mm:ss' }}
                format={"YYYY-MM-DD HH:mm:ss"}
                style={item.style ? item.style : []}
              />
            </Form.Item>
          )
        } else {
          return (
            <Form.Item
              key={item.name}
              label={item.label}
              name={item.name}
            >
              <DatePicker
                locale={locale}
                showTime={{ format: 'HH:mm:ss' }}
                format={"YYYY-MM-DD HH:mm:ss"}
                placeholder={item.placeholder}
                style={item.style ? item.style : []}
              />
            </Form.Item>
          )
        }

        break;

      case 'inputGroup':
        return (
          <Form.Item
            key={item.name}
            label={item.label}
          >
            <InputGroup compact>
              <Form.Item
                key={item.name+"_start"}
                name={item.name+'_start'}
              >
                <Select
                  style={{ width : (item.style.width[0] ? item.style.width[0] : null)}}
                  defaultValue='all'
                >
                  {!!item.options && item.options.map((option:any) => {
                    return (
                      <Option key={option.value} value={option.value}>{option.label}</Option>
                    )
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                key={item.name+'_end'}
                name={item.name+'_end'}
              >
                <Input
                  style={{ width : (item.style.width[1] ? item.style.width[1] : null)}}
                  placeholder={item.placeholder}
                />
              </Form.Item>
            </InputGroup>
          </Form.Item>
        )
        break;

      default:
        console.log('component can not be null!');
    }
  };

  const onReset = () => {
    searchForm.resetFields();
  };

  const onSearch = (values:any) => {

    content.body.table.search.items.map((item:any,key:any) => {
      if(item.component == 'datetime') {
        if(item.operator == 'between') {
          if (values[item.name]) {
            if (values[item.name][0] && values[item.name][1]) {
              // 时间标准化
              let dateStart = values[item.name][0].format('YYYY-MM-DD HH:mm:ss');
              let dateEnd = values[item.name][1].format('YYYY-MM-DD HH:mm:ss');
              // 先清空对象
              values[item.name] = [];
              // 重新赋值对象
              values[item.name] = [dateStart, dateEnd];
            }
          }
        } else {
          values[item.name] = values[item.name].format('YYYY-MM-DD HH:mm:ss');
        }
      }
    })

    loadTableData(content.body.table.pagination.current,values,[],[]);
  };

  const modalOk = () =>{

    const values = form.getFieldsValue();

    let id = null;
    if(rowKey) {
      id = rowKey;
    } else {
      id = selectedRowKeys;
    }

    dispatch({
      type: 'form/submit',
      payload: {
        actionName: actionName,
        actionUrl: modalData.form.action,
        id: id,
        ...values
      },
      callback: (res:any) => {
        if(res.status == 'success') {
          form.resetFields();
          changeModalVisible(false);
          loadTableData(1,[],[],[]);
        }
      }
    });

  }

  const showModal = (actionName:any,modal:any,id:any=null) => {
    changeModalVisible(!modalVisible);
    changeActionName(actionName);
    changeRowKey(id);
    changeModalData(modal);
  }

  const modalCancel = () =>{
    changeModalVisible(false);
  }

  const onConfirm = (actionName:any,actionUrl:any,confirmProperty:any,id:any=null) => {

    confirm({
      title: confirmProperty.title,
      icon: <ExclamationCircleOutlined />,
      content: confirmProperty.content,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        action(actionName,actionUrl,id);
      },
    });
  }

  const action = (actionName:any,actionUrl:any,id:any = null,value:any = null) => {

    if(id == null) {
      id = selectedRowKeys;
    }

    dispatch({
      type: 'table/submit',
      payload: {
        actionName:actionName,
        actionUrl: actionUrl,
        id:id
      },
      callback: (res:any) => {
        loadTableData(content.body.table.pagination.current,[],[],[]);
      }
    });

  };

  // 刷新页面
  const refresh = () => {
    searchForm.resetFields();
    loadTableData(1,[],[],[]);
  };

  // 分页切换
  const changePagination = (pagination:any, filters:any, sorter:any) => {
    const search = searchForm.getFieldsValue();
    loadTableData(pagination.current,search,filters,sorter);
  };

  // 加载Table数据
  const loadTableData = (currentPage:any, search:any, filters:any, sorter:any) => {
    
    changeSelectedRowKey([]);
    changeBatchActionSelect('batchAction|');
    changeExtendActionSelect('extendAction|');

    dispatch({
      type: 'table/info',
      payload: {
        actionUrl: api,
        page: currentPage, // 当前页码
        search: search, // 搜索
        sorter: sorter, // 排序字段
        filters: filters, // 筛选
      }
    });
  };

  // 加载menuComponent数据
  const menuComponent = (item:any,style:any,id:any) => {

    let names= []; //定义一数组
    names=item.name.split("|"); //字符分割

    switch (names[1]) {
      case 'edit':
        return (
          <Menu.Item>
            <a
              key={item.name}
              style={style}
              href={item.url ? item.url : "#/admin/quark/engine?api="+api.replace(/\/index/g, '/edit')+"&component=form"+"&search[id]="+id}
            >
              {item.label}
            </a>
          </Menu.Item>
        );
        break;
    
      case 'show':
        return (
          <Menu.Item>
            <a
              key={item.name}
              style={style}
              href={item.url ? item.url : "#/admin/quark/engine?api="+api.replace(/\/index/g, '/show')+"&component=show"+"&search[id]="+id}
            >
              {item.label}
            </a>
          </Menu.Item>
        );
        break;

      default:
        let menu = null;
        if(item.modal) {
          menu =  <Menu.Item>
                    <a 
                      key={item.name}
                      style={style}
                      onClick={() => showModal(item.name,item.modal,id)}
                    >
                      {item.label}
                    </a>
                  </Menu.Item>

        } else if(item.confirm) {
          menu =  <Menu.Item>
                    <a
                      key={item.name}
                      style={style}
                      onClick={() => onConfirm(item.name,item.action,item.confirm,id)}
                    >
                      {item.label}
                    </a>
                  </Menu.Item>

        } else {
          menu =  <Menu.Item>
                    <a
                      key={item.name}
                      style={style}
                      onClick={() => action(item.name,item.action,id)}
                    >
                      {item.label}
                    </a>
                  </Menu.Item>
        }
  
        return menu;
        break;
    }
  };

  // 加载buttonComponent数据
  const buttonComponent = (item:any,style:any,id:any=null) => {

    let names= []; //定义一数组
    names=item.name.split("|"); //字符分割

    switch (names[1]) {
      case 'create':
        return (
          <Button
            key={item.name}
            style={{marginLeft:'8px',...style}}
            type={item.type}
            size={item.size}
            href={item.url ? item.url : "#/admin/quark/engine?api="+api.replace(/\/index/g, '/create')+"&component=form"}
            icon={item.icon && IconMap[item.icon]}
          >
            {item.label}
          </Button>
        );
        break;
    
      case 'refresh':
        return (
          <Button
            key={item.name}
            style={{marginLeft:'8px',...style}}
            type={item.type}
            size={item.size}
            onClick={() => refresh()}
            icon={item.icon && IconMap[item.icon]}
          >
            {item.label}
          </Button>
        );
        break;
      case 'edit':
        return (
          <Button
            key={item.name}
            style={{marginLeft:'8px',...style}}
            type={item.type}
            size={item.size}
            href={item.url ? item.url : "#/admin/quark/engine?api="+api.replace(/\/index/g, '/edit')+"&component=form"+"&search[id]="+id}
            icon={item.icon && IconMap[item.icon]}
          >
            {item.label}
          </Button>
        );
        break;
    
      case 'show':
        return (
          <Button
            key={item.name}
            style={{marginLeft:'8px',...style}}
            type={item.type}
            size={item.size}
            href={item.url ? item.url : "#/admin/quark/engine?api="+api.replace(/\/index/g, '/show')+"&component=show"+"&search[id]="+id}
            icon={item.icon && IconMap[item.icon]}
          >
            {item.label}
          </Button>
        );
        break;

      default:
        let button = null;
        if(item.modal) {
          button = <Button
                      key={item.name}
                      style={{marginLeft:'8px',...style}}
                      type={item.type}
                      size={item.size}
                      danger={item.danger}
                      onClick={() => showModal(item.name,item.modal,id)} icon={item.icon && IconMap[item.icon]}
                    >
                      {item.label}
                    </Button>
        } else if(item.popconfirm) {
          button = <Popconfirm
                      key={item.name}
                      title={item.popconfirm.title}
                      onConfirm={() => action(item.name,item.action,id)}
                      okText="确认"
                      cancelText="取消"
                    >
                      <Button 
                        key={item.name}
                        style={{marginLeft:'8px',...style}}
                        type={item.type}
                        size={item.size}
                        danger={item.danger}
                        href={item.url ? item.url : null} icon={item.icon && IconMap[item.icon]}
                      >
                        {item.label}
                      </Button>
                  </Popconfirm>
        } else if(item.confirm) {
          button = <Button 
                      key={item.name}
                      style={{marginLeft:'8px',...style}}
                      type={item.type}
                      size={item.size}
                      danger={item.danger}
                      onClick={() => onConfirm(item.name,item.action,item.confirm,id)}
                      icon={item.icon && IconMap[item.icon]}
                    >
                      {item.label}
                    </Button>
        } else {
          button = <Button
                      key={item.name}
                      style={{marginLeft:'8px',...style}}
                      type={item.type}
                      size={item.size}
                      danger={item.danger}
                      onClick={() => action(item.name,item.action,id)}
                      icon={item.icon && IconMap[item.icon]}
                    >
                      {item.label}
                    </Button>
        }
  
        return (
          button
        );
        break;
    }
  };

  const onSelectChange = (value:any) =>  {
    let values= []; //定义一数组
    values=value.split("|"); //字符分割
    if(values[0] == 'batchAction') {
      {content.body.table.batchActions.items.map((item:any) => {
        if(item.name == value) {
          if(item.confirm) {
            onConfirm(item.name,item.action,item.confirm)
          } else {
            action(item.name,item.action);
          }
        }
      })}
    }

    if(values[0] == 'extendAction') {
      {content.body.table.extendActions.items.map((item:any) => {
        if(item.name == value) {
          if(item.confirm) {
            onConfirm(item.name,item.action,item.confirm)
          } else {
            action(item.name,item.action);
          }
        }
      })}
    }
  }

  return (
    <Spin spinning={loading} tip="Loading..." style={{width:'100%',marginTop:'200px'}}>
      {content ?
      <PageHeaderWrapper
        title={content ? content.title : false}
        subTitle={content.subTitle}
        content={content.description}
        breadcrumb={{routes}}
      >
        <div className={styles.container}>
          <div className={styles.header}>
            <Row justify="start">
              <Col span={12}>
                <h5 className={styles.title}>{content.body.table.title}</h5>
              </Col>
              <Col span={12}>
                <div className={styles.right}>
                  {!!content.body.table.actions && content.body.table.actions.items.map((item:any) => {
                    return buttonComponent(item,content.body.table.batchActions.style);
                  })}
                </div>
              </Col>
            </Row>
          </div>
          <Divider style={{ marginBottom: 10,marginTop: 10 }} />
          <div className={styles.toolbar}>
            <Row justify="start">
              <Col span={8}>

                {!!content.body.table.batchActions && content.body.table.batchActions.showStyle == 'button' ?
                  <span>
                    {content.body.table.batchActions.items.map((item:any) => {
                        return buttonComponent(item,content.body.table.batchActions.style);
                    })}
                  </span>
                : null}
                {!!content.body.table.batchActions && content.body.table.batchActions.showStyle == 'select' ?
                  <Select
                    style={content.body.table.batchActions.style}
                    placeholder={content.body.table.batchActions.placeholder}
                    value={batchActionSelect}
                    onChange={onSelectChange}
                  >
                    {content.body.table.batchActions.items.map((item:any) => {
                      return <Option key={item.name} value={item.name}>{item.label}</Option>
                    })}
                  </Select>
                : null}

                {!!content.body.table.extendActions && content.body.table.extendActions.showStyle == 'button' ?
                  <span>
                    {content.body.table.extendActions.items.map((item:any) => {
                        return buttonComponent(item,content.body.table.batchActions.style);
                    })}
                  </span>
                : null}

                {!!content.body.table.extendActions && content.body.table.extendActions.showStyle == 'select' ?
                  <Select
                    style={content.body.table.extendActions.style}
                    placeholder={content.body.table.extendActions.placeholder}
                    value={extendActionSelect}
                    onChange={onSelectChange}
                  >
                    {content.body.table.extendActions.items.map((item:any) => {
                      return <Option key={item.name} value={'extendAction|'+item.name}>{item.label}</Option>
                    })}
                  </Select>
                : null}
              </Col>
              <Col span={16}>
              {!content.body.table.disableSearch && !content.body.table.disableAdvancedSearch ?
                <div className={styles.right}>
                  <Form layout="inline" form={searchForm} onFinish={onSearch}>
                    {!!content.body.table.search && content.body.table.search.items.map((item:any) => {
                      if(!item.advanced) {
                        return searchComponent(item);
                      }
                    })}
                    <Form.Item>
                      <Button htmlType="submit">
                        搜索
                      </Button>
                      <a type="link" style={{ fontSize: 12,marginLeft:15 }} onClick={() => changeSearchExpand(!searchExpand)}>
                        高级搜索 {searchExpand ? <UpOutlined /> : <DownOutlined />}
                      </a>
                    </Form.Item>
                  </Form>
                </div>
              : null}
              {!content.body.table.disableSearch && content.body.table.disableAdvancedSearch ?
                <div className={styles.right}>
                  <Form layout="inline" form={searchForm} onFinish={onSearch}>
                    {!!content.body.table.search && content.body.table.search.items.map((item:any) => {
                      return searchComponent(item);
                    })}
                    <Form.Item>
                      <Button htmlType="submit">
                        搜索
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              : null}
              </Col>
            </Row>
          </div>
          <div
            className={styles.advancedSearch}
            style={{ display: searchExpand ? 'block' : 'none'}}
          >
            <Row>
              <Col span={24}>
                <Form layout="inline" form={searchForm} onFinish={onSearch}>
                  {!!content.body.table.search && content.body.table.search.items.map((item:any) => {
                    if(item.advanced) {
                      return searchComponent(item);
                    }
                  })}
                  <Form.Item>
                    <Button
                      htmlType="button"
                      onClick={onReset}
                    >
                      重置
                    </Button>
                    <Button
                      htmlType="submit"
                      type="primary"
                      style={{marginLeft:'8px'}}
                    >
                      搜索
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
          <div>
            <Table
              columns={content.body.table.columns}
              rowSelection={rowSelection}
              dataSource={content.body.table.dataSource}
              pagination={content.body.table.pagination}
              onChange={changePagination}
            />
          </div>
        </div>

        <Modal
          title={modalData.title}
          visible={modalVisible}
          onOk={modalOk}
          onCancel={modalCancel}
          okText={modalData.okText ? modalData.okText : '确定'}
          cancelText={modalData.cancelText ? modalData.cancelText : '取消'}
          width={modalData.width ? modalData.width : undefined}
        >
          {!!selectedRowKeys.length && <Text strong>已选择 <Text type="danger">{selectedRowKeys.length}</Text> 条，要操作的记录！<br/><br/></Text>}
          <Form {...modalData.form.layout} form={form} initialValues={modalData.form.initialValues}>
            {!!modalData.form.items && modalData.form.items.map((item:any) => {

              if(item.component == 'input') {
                return (
                  <Form.Item
                    key={item.name}
                    label={item.label}
                    name={item.name}
                    rules={item.frontendRules}
                  >
                    <Input
                      placeholder={item.placeholder}
                      style={item.style ? item.style : []}
                    />
                  </Form.Item>
                )
              }

              if(item.component == 'radio') {
                return (
                  <Form.Item
                    key={item.name}
                    label={item.label}
                    name={item.name}
                    rules={item.frontendRules}
                  >
                    <Radio.Group options={item.options} />
                  </Form.Item>
                )
              }

            })}
          </Form>
        </Modal>

      </PageHeaderWrapper>
      : null}
    </Spin>
  );
};

function mapStateToProps(state:any) {
  const {
    content,
    routes,
    searchExpand,
    loading,
  } = state.table;

  return {
    content,
    routes,
    searchExpand,
    loading,
  };
}

export default connect(mapStateToProps)(TablePage);