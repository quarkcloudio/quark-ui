import { useState } from 'react';

const useComponent = () => {
  const [components, setComponents] = useState(<any>{});

  return {
    components,
    setComponents,
  };
};

export default useComponent;
