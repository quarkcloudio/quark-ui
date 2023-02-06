import { useState } from 'react';

const useObject = () => {
  const [object, setObject] = useState({});

  return {
    object,
    setObject,
  };
};

export default useObject;
