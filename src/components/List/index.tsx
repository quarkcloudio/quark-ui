import React from 'react';
import { ProList } from '@ant-design/pro-components';
import { useLocation, history } from '@umijs/max';
import qs from 'query-string';
import { get, post } from '@/services/action';
import Render from '@/components/Render';
import styles from '@/components/Table/index.less';

const List: React.FC<any> = (props: any) => {
  const location = useLocation();
  const query = qs.parse(location.search);
  const parseMetas = (metas: any) => {
    if (metas?.actions) {
      metas.actions.render = (text: any, row: any) => {
        return (
          <Render body={metas.actions} data={row} callback={props.callback} />
        );
      };
    }
    if (metas?.title) {
      metas.title.render = (text: any, row: any) => {
        return (
          <span style={metas.title.style}>
            <Render body={text} data={row} callback={props.callback} />
          </span>
        );
      };
    }
    if (metas?.content) {
      metas.content.render = (text: any, row: any) => {
        return (
          <span style={metas.content.style}>
            <Render body={text} data={row} callback={props.callback} />
          </span>
        );
      };
    }

    if (metas?.extra) {
      metas.extra.render = (text: any, row: any) => {
        return (
          <span style={metas.extra.style}>
            <Render body={text} data={row} callback={props.callback} />
          </span>
        );
      };
    }

    return metas;
  };

  const getDatasource: any = async (query: any) => {
    let result = null;

    if (!props.api) {
      return props;
    }
    if (props.apiType === 'GET') {
      result = await get({
        url: props.api,
        data: query,
      });
    } else if (props.apiType === 'POST') {
      result = await post({
        url: props.api,
        data: query,
      });
    }

    return result.data;
  };

  return (
    <ProList<any>
      {...props}
      toolbar={{
        ...props.toolBar,
        actions: props.toolBar?.actions
          ? [
              <Render
                key="action"
                body={props.toolBar?.actions}
                data={props.data}
                callback={props.callback}
              />,
            ]
          : undefined,
      }}
      metas={parseMetas(props.metas)}
      request={async (params: any) => {
        query['page'] = params.current;
        query['pageSize'] = params.pageSize;
        const getList = await getDatasource(query);

        return Promise.resolve({
          data: getList.datasource,
          total: getList?.pagination?.total,
          success: true,
        });
      }}
      rowClassName={(record: any, index: any) => {
        if (props.striped) {
          if (index % 2 !== 0) {
            return styles.oddTr;
          }
        } else {
          return null;
        }
      }}
    />
  );
};

export default List;
