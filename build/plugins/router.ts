import type { RouteKey } from '@soybean-react/vite-plugin-react-router';
import ElegantReactRouter from '@soybean-react/vite-plugin-react-router';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface RouteMeta extends Record<string | number, unknown> {}

export function setupElegantRouter() {
  return ElegantReactRouter({
    customRoutes: {
      names: [
        'exception_403',
        'exception_404',
        'exception_500',
        'document_project',
        'document_project-link',
        'document_react',
        'document_vite',
        'document_unocss',
        'document_proComponents',
        'document_antd',
        'document_ui'
      ]
    },
    onRouteMetaGen(routeName) {
      const key = routeName as RouteKey;

      const constantRoutes: RouteKey[] = ['403', '404', '500'];

      const meta: Partial<RouteMeta> = {
        i18nKey: `route.${key}` as App.I18n.I18nKey,
        title: key
      };

      if (constantRoutes.includes(key)) {
        meta.constant = true;
      }

      return meta;
    }
  });
}
