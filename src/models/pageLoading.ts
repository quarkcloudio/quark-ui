import { useState } from 'react';

const usePageLoading = () => {
  const [pageLoading, setPageLoading] = useState(false);

  return {
    pageLoading,
    setPageLoading,
  };
};

export default usePageLoading;
