import { useState } from 'react';

const useSubmit = () => {
  const [submit, setSubmit] = useState(<any>{});

  return {
    submit,
    setSubmit,
  };
};

export default useSubmit;
