import { request } from '../request';

/**
 * Get engine component
 *
 * @param api Engine component api
 */
export function fetchEngineComponent(api: string) {
  return request<Api.Engine.EngineComponent>({ url: api });
}
