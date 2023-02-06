import { useState } from 'react';

const useButtonLoading = () => {
  const [buttonLoadings, setButtonLoadings] = useState([]);

  return {
    buttonLoadings,
    setButtonLoadings,
  };
};

export default useButtonLoading;
