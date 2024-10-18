import { useState } from 'react';

const useFormFields = () => {
  const [fields, setFields] = useState(<any>{});

  return {
    fields,
    setFields,
  };
};

export default useFormFields;
