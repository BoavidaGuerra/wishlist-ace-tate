import { useState, useEffect } from 'react'

export default function useStoreState(defaultValue, key) {
  const [value, setValue] = useState(() => {
    const storeValue = window.localStorage.getItem(key);
    return storeValue !== null
      ? JSON.parse(storeValue)
      : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
