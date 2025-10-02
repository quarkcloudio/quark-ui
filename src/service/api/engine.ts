import { request } from '../request';

/**
 * Get engine component
 *
 * @param api Engine component api
 */
export function fetchEngineComponent(api: string) {
  return request<Api.Engine.EngineComponent>({ url: api });
}

/**
 * handle ajax action
 *
 * @param api Ajax action api
 */
export function fetchAjaxAction(api: string) {
  return request<Api.Engine.AjaxAction>({ url: api });
}

/**
 * Get table data
 *
 * @param api Table data api
 * @param queryParams Query params
 */
export function fetchTableData(api: string, queryParams: any) {
  return request<Api.Engine.EngineComponent>({ params: queryParams, url: api });
}

/**
 * Post form data
 *
 * @param api Post form api
 * @param data Form data
 */
export function fetchPostForm(api: string, data: any) {
  return request<Api.Engine.PostForm>({ data, method: 'POST', url: api });
}
