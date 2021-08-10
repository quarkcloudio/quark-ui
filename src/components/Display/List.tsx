import React from 'react';
import ProList from '@ant-design/pro-list';

const List: React.FC<any> = (props:any) => {

  return (
    <ProList<any>
      toolBarRender={() => {
        return [
          <a>
            更多
          </a>,
        ];
      }}
      onRow={(record: any) => {
        return {
          onMouseEnter: () => {
            console.log(record);
          },
          onClick: () => {
            console.log(record);
          },
        };
      }}
      rowKey="name"
      headerTitle="基础列表"
      tooltip="基础列表的配置"
      dataSource={[]}
      showActions="hover"
      showExtra="hover"
      metas={{
        title: {
          dataIndex: 'name',
        },
        avatar: {
          dataIndex: 'image',
        },
        description: {
          dataIndex: 'desc',
        },
        subTitle: {
          render: () => {
            return (
              <></>
            );
          },
        },
        actions: {
          render: (text, row) => [
            <a href={row.html_url} target="_blank" key="link">
              链路
            </a>,
            <a href={row.html_url} target="_blank" key="warning">
              报警
            </a>,
            <a href={row.html_url} target="_blank" key="view">
              查看
            </a>,
          ],
        },
      }}
    />
  );
}

export default List;