import { useState } from 'react';

const useLoading = () => {
  const [loading, setLoading] = useState(0);

  return {
    loading,
    setLoading,
  };
};

export default useLoading;
