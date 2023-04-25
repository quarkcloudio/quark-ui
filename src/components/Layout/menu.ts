// Tree转List
const menuTreeToList = (menus: any, pkey: any = 0) => {
  let list: any = [];
  menus?.forEach?.((item: any) => {
    item['pkey'] = pkey;
    list.push(item);
    if (item.hasOwnProperty('routes')) {
      let children = menuTreeToList(item.routes, item.key);
      if (children.length > 0) {
        list.push(...children);
      }
    }
  });

  return list;
};

const getMenuName = (menus: any, pathname: string, api: string) => {
  let menuName = '';
  menus?.forEach?.((item: any) => {
    if (item.path.indexOf(api)!==-1 && api!="") {
      menuName = item.name;
    } else if(item.path === pathname){
      menuName = item.name;
    } else {
      if (item.hasOwnProperty('routes')) {
        if (getMenuName(item.routes, pathname, api)) {
          menuName = getMenuName(item.routes, pathname, api);
        }
      }
    }
  });

  return menuName;
};

const getMenuSelectedKey = (menus: any, pathname: string, api: string) => {
  let menuKey: any = '';
  menus?.forEach?.((item: any) => {
    if (item.path.indexOf(api)!==-1 && api!="") {
      menuKey = item.key;
    } else if(item.path === pathname){
      menuKey = item.key;
    } else {
      if (item.hasOwnProperty('routes')) {
        if (getMenuSelectedKey(item.routes, pathname, api)) {
          menuKey = getMenuSelectedKey(item.routes, pathname, api);
        }
      }
    }
  });
  return menuKey;
};

// 获取当前展开的菜单
const getMenuOpenKeys = (menu: any, key: string) => {
  let menuOpenKeys: any = [];
  let menuTreeList = menuTreeToList(menu);
  let menuRow = getMenuWithKey(menuTreeList, key);
  let parentMenuKey = getParentMenuKey(menuTreeList, menuRow['pkey']);
  if (parentMenuKey) {
    let children = getMenuOpenKeys(menu, parentMenuKey);
    if (children.length > 0) {
      menuOpenKeys.push(...children);
    }
    menuOpenKeys.push(parentMenuKey);
  }

  return menuOpenKeys;
};

// 根据key获取菜单行
const getMenuWithKey = (menuTreeList: any, key: string) => {
  let row: any = '';
  menuTreeList?.forEach?.((item: any) => {
    if (item.key === key) {
      row = item;
    }
  });
  return row;
};

// 根据pkey获取父亲菜单的key
const getParentMenuKey = (menuTreeList: any, pkey: string) => {
  let menuKey: string = '';
  menuTreeList?.forEach?.((item: any) => {
    if (item.key === pkey) {
      menuKey = item.key;
    }
  });
  return menuKey;
};

const getMenuPath = (menus: any, key: string) => {
  let menuPath = '';
  menus?.forEach?.((item: any) => {
    if (key === item.key) {
      menuPath = item.path;
    } else {
      if (item.hasOwnProperty('routes')) {
        if (getMenuPath(item.routes, key)) {
          menuPath = getMenuPath(item.routes, key);
        }
      }
    }
  });
  return menuPath;
};

export { getMenuName, getMenuSelectedKey, getMenuOpenKeys, getMenuPath };
