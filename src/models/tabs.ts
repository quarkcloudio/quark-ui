import { useState } from 'react';

const useTabs = () => {
  const [tabs, setTabs] = useState(<any>{
    itemNum: 0,
    activeKey: 0,
  });

  return {
    tabs,
    setTabs,
  };
};

export default useTabs;
