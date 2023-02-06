import { useState } from 'react';

const useComponent = () => {
  const [components, setComponents] = useState({});

  return {
    components,
    setComponents,
  };
};

export default useComponent;
