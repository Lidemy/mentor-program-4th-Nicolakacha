import { useState } from 'react';

export default function useInput() {
  const [value, setValue] = useState('');
  const handleChange = (e) => setValue(e.target.value);

  return {
    value,
    setValue,
    handleChange,
  };
}
