import { useState } from "react";

function useFields(initialValue) {
  const [fields, setFields] = useState(initialValue);

  function handleOnChange(e) {
    const { value, name } = e.target;
    setFields((currentFields) => {
      return {
        ...currentFields,
        [name]: value,
      };
    });
  }

  return [fields, handleOnChange];
}

export default useFields;
