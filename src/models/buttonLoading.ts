import { useState } from 'react';

const useButtonLoading = () => {
  const [buttonLoadings, setButtonLoadings] = useState(<any>[]);

  return {
    buttonLoadings,
    setButtonLoadings,
  };
};

export default useButtonLoading;
