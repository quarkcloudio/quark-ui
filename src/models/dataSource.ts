import { useState } from 'react';

const useDataSource = () => {
  const [dataSource, setDataSource] = useState(<any>[]);

  return {
    dataSource,
    setDataSource,
  };
};

export default useDataSource;
