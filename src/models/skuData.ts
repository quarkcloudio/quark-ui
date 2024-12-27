import { useState } from 'react';

const useSkuData = () => {
  const [dataSource, setDataSource] = useState(<any>[]);

  return {
    dataSource,
    setDataSource,
  };
};

export default useSkuData;
