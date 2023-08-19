import { useState } from 'react';

const useObject = () => {
  const [object, setObject] = useState(<any>{});

  return {
    object,
    setObject,
  };
};

export default useObject;
