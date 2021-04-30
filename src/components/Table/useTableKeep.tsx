import {useHistory} from 'umi'
import {useCallback} from "react";

type Partial<T> = {
    [P in keyof T]?: T[P];
};

interface PageData {
    page: number,
    pageSize?: number
}

/**
 * 缓存表格
 */
export function useTableKeep<T>() {
    // 历史对象
    const history = useHistory()
    // 搜索数据
    let searchData: Partial<T> = {}
    // 页码数据
    let pageData: PageData = {page: 1}

    // 初始化
    const {query}: any = history.location
    const queryKeys = Object.keys(query)

    if (queryKeys.length) {
        queryKeys.forEach(key => {
            if (key === 'page' || key === 'pageSize') {
                pageData[key] = query[key]
            } else {
                searchData[key] = query[key]
            }
        })
    }

    const ref = useCallback(form => {
        if (form) {
            form.setFieldsValue({
                ...searchData
            })
        }
    }, [])

    /**
     * 记录参数到路由
     */
    const routerReplace = () => {
        // @ts-ignore
        history.replace({
            pathname: history.location.pathname,
            query: {
                ...searchData,
                ...pageData
            }
        })
    }

    /**
     * 搜索栏修改
     * @param params
     */
    const onSearchChange = (params: Partial<T>) => {
        delete params.current
        searchData = Object.assign(searchData, params)
        routerReplace()
        return params
    }

    /**
     * 页面修改
     * @param page
     * @param pageSize
     */
    const onPageDataChange = (page: number, pageSize?: number) => {
        pageData = Object.assign(pageData, {
            page,
            pageSize
        })
        routerReplace()
    }

    return {
        formRef: ref,
        pagination: {
            defaultCurrent: pageData.page,
            defaultPageSize: pageData.pageSize,
            onChange: onPageDataChange
        },
        beforeSearchSubmit: onSearchChange
    }
}