import React from 'react';
import { history } from 'umi';
import { Upload, Form } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

export interface ImageUploader {
  key: string;
  name: string;
  label: string;
  title: string;
  action: string;
  value?: any;
}

const ImageUploader: React.FC<ImageUploader> = (props) => {

  return (
    <Form.Item label={props.label} name={props.name}>
      <Upload
        key={props.key}
        name={props.name}
        listType="picture-card"
      >
      <div>
        <PlusOutlined />
        <div>{props.title}</div>
      </div>
      </Upload>
    </Form.Item>
  );
}

export default ImageUploader;