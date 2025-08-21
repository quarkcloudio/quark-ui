import { useEffect, useRef, useState } from 'react';
import type { URLSearchParamsInit } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

import useBoolean from './use-boolean';
import useLoading from './use-loading';

export type MaybePromise<T> = T | Promise<T>;

export type ApiFn = (args: any) => Promise<unknown>;

export type TableColumnCheck = {
  checked: boolean;
  key: string;
  title: string;
};

export type TableDataWithIndex<T> = T & { index: number };

export type TransformedData<T> = {
  data: TableDataWithIndex<T>[];
  pageNum: number;
  pageSize: number;
  total: number;
};

export type Transformer<T, Response> = (response: Response) => TransformedData<T>;

export type TableConfig<A extends ApiFn, T, C> = {
  /** api function to get table data */
  apiFn: A;
  /** api params */
  apiParams?: Parameters<A>[0];
  /** columns factory */
  columns: () => C[];
  /**
   * get column checks
   *
   * @param columns
   */
  getColumnChecks: (columns: C[]) => TableColumnCheck[];
  /**
   * get columns
   *
   * @param columns
   */
  getColumns: (columns: C[], checks: TableColumnCheck[]) => C[];
  /**
   * whether to get data immediately
   *
   * @default true
   */
  immediate?: boolean;
  /** Whether to change the address bar parameter */
  isChangeURL?: boolean;
  /**
   * callback when response fetched
   *
   * @param transformed transformed data
   */
  onFetched?: (transformed: TransformedData<T>) => MaybePromise<void>;
  /** transform api response to table data */
  transformer: Transformer<T, Awaited<ReturnType<A>>>;
};

export default function useHookTable<A extends ApiFn, T, C>(config: TableConfig<A, T, C>) {
  const { apiFn, apiParams, getColumnChecks, getColumns, immediate = true, isChangeURL, transformer } = config;

  const { endLoading, loading, startLoading } = useLoading();

  const { bool: empty, setBool: setEmpty } = useBoolean();

  const searchParams = useRef<Parameters<A>[0]>(apiParams || { current: 1, size: 10 });

  const [_, setSearchParams] = useSearchParams();

  const allColumns: C[] = config.columns();

  const [data, setData] = useState<TransformedData<T>>({
    data: [],
    pageNum: 1,
    pageSize: 10,
    total: 0
  });

  const [columnChecks, setColumnChecks] = useState<TableColumnCheck[]>(getColumnChecks(allColumns));

  const columns = getColumns(allColumns, columnChecks);

  async function getData() {
    startLoading();

    const formattedParams = formatSearchParams(searchParams.current);

    if (isChangeURL) {
      setSearchParams(formattedParams as URLSearchParamsInit, { replace: true });
    }

    const response = await apiFn(formattedParams);

    const transformed = transformer(response as Awaited<ReturnType<A>>);

    setData(transformed);

    setEmpty(transformed.data.length === 0);

    await config.onFetched?.(transformed);

    endLoading();
  }

  /**
   * update search params
   *
   * @param params
   */
  function updateSearchParams(params: Partial<Parameters<A>[0]> | { current?: number }) {
    Object.assign(searchParams.current, params);
    getData();
  }

  /** reset search params */
  function resetSearchParams() {
    const { current, size } = searchParams.current; // 保留分页信息

    // 用默认 apiParams 重建对象，再把 current/size 覆盖回去
    searchParams.current = { current, size };

    getData();
  }

  useEffect(() => {
    if (immediate) getData();
  }, []);

  return {
    columnChecks,
    columns,
    data: data.data,
    empty,
    getData,
    loading,
    pageNum: data.pageNum,
    pageSize: data.pageSize,
    resetSearchParams,
    searchParams: formatSearchParams(searchParams.current) as Parameters<A>[0],
    setColumnChecks,
    total: data.total,
    updateSearchParams
  };
}

function formatSearchParams(params: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(params).filter(([_, value]) => value !== null && value !== undefined));
}
