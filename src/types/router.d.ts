declare namespace Router {
  type UIMatch<Data = unknown, Handle = unknown> = import('react-router-dom').UIMatch<Data, Handle>;

  type RouteObject = import('react-router-dom').RouteObject;

  type RouteHandle = {
    /**
     * The menu key will be activated when entering the route
     *
     * The route is not in the menu
     *
     * @example
     *   the route is "user_detail", if it is set to "user_list", the menu "user_list" will be activated
     */
    activeMenu?: import('@soybean-react/vite-plugin-react-router').RouteKey | null;
    /**
     * Is constant route
     *
     * when it is set to true, there will be no login verification and no permission verification to access the route
     */
    constant?: boolean | null;
    /** If set, the route will be fixed in tabs, and the value is the order of fixed tabs */
    fixedIndexInTab?: number | null;
    /** Whether to hide the route in the menu */
    hideInMenu?: boolean | null;
    /** The outer link of the route */
    href?: string | null;
    /**
     * I18n key of the route
     *
     * It's used in i18n, if it is set, the title will be ignored
     */
    i18nKey?: App.I18n.I18nKey | null;
    /**
     * Iconify icon
     *
     * It can be used in the menu or breadcrumb
     */
    icon?: string;
    /** Icon size. width and height are the same. */
    iconFontSize?: number;
    /** Whether to cache the route */
    keepAlive?: boolean;
    /**
     * Local icon
     *
     * In "src/assets/svg-icon", if it is set, the icon will be ignored
     */
    localIcon?: string;
    /**
     * By default, the same route path will use one tab, even with different query, if set true, the route with
     * different query will use different tabs
     */
    multiTab?: boolean | null;
    /** Router order */
    order?: number | null;
    /** if set query parameters, it will be automatically carried when entering the route */
    query?: { key: string; value: string }[] | null;
    /**
     * Roles of the route
     *
     * Route can be accessed if the current user has at least one of the roles
     *
     * It only works when the route mode is "static", if the route mode is "dynamic", it will be ignored
     */
    roles?: string[];
    /**
     * Title of the route
     *
     * It can be used in document title
     */
    title: string;
    /** 内嵌外联地址 */
    url?: string | null;
  };

  type Route<
    T = unknown,
    Q extends Record<string, string> | null = Record<string, string>,
    P extends Record<string, string | string[]> = Record<string, string | string[]>
  > = Omit<UIMatch<T, RouteHandle>, 'params'> & {
    error: Error | null;
    fullPath: string;
    hash: string;
    matched: UIMatch<T, RouteHandle>[];
    params: P;
    pathname: string;
    query: Q;
    search: string;
  };

  type SingleAuthRoute = {
    parent: string | null;
    parentPath: string;
    route: RouteObject;
  };

  type AuthRoute = {
    parent: string | null;
    parentPath: string;
    route: RouteObject[];
  };
}
