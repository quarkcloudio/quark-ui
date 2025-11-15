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

/**
 * Get form data
 *
 * @param api Form data api
 */
export function fetchFormData(api: string) {
  return request<Api.Engine.EngineComponent>({ url: api });
}

/**
 * Image crop
 *
 * @param api Image crop api
 * @param data Image crop data
 */
export function fetchImageCrop(api: string, data: any) {
  return request<Api.Engine.EngineComponent>({ data, method: 'POST', url: api });
}

/**
 * Get image list
 *
 * @param api Image list api
 * @param data Image list data
 */
export function fetchImageList(api: string, data: any) {
  return request<Api.Engine.EngineComponent>({ data, method: 'GET', url: api });
}

/**
 * Image delete
 *
 * @param api Image delete api
 * @param data Image delete data
 */
export function fetchImageDelete(api: string, data: any) {
  return request<Api.Engine.EngineComponent>({ data, method: 'POST', url: api });
}

/**
 * Image batch delete
 *
 * @param api Image batch delete api
 * @param data Image batch delete data
 */
export function fetchImageBatchDelete(api: string, data: any) {
  return request<Api.Engine.EngineComponent>({ data, method: 'POST', url: api });
}
