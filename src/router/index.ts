import { generatedRoutes } from './elegant/routes';
import { filterRoutes, getReactRoutes } from './routes';
import { BaseChildrenRoutes } from './routes/builtin';
/**
 * - 初始化路由
 * - 生成所有路由ex
 * - 生成权限路由
 * - 生成常量路由
 *
 * @returns {Object} 返回路由对象
 */
function initRoutes() {
  // 获取所有文件夹生成的路由并转换成 react-router 路由
  const customRoutes = getReactRoutes(generatedRoutes);

  // 获取基础路由
  const baseRoute = customRoutes[0]?.children?.find(route => route.id === '(base)');
  // 添加自定义复用路由至基础路由
  baseRoute?.children?.push(...BaseChildrenRoutes);

  const authRoutes: Router.SingleAuthRoute[] = [];

  const cacheRoutes: string[] = [];

  const allRoutes = { ...customRoutes };

  const constantRoutes = filterRoutes(customRoutes, null, authRoutes, cacheRoutes);

  return { allRoutes, authRoutes, cacheRoutes, routes: constantRoutes };
}

export const { allRoutes, authRoutes, cacheRoutes: initCacheRoutes, routes } = initRoutes();
