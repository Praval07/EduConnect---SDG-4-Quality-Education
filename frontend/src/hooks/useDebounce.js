import { useState, useEffect } from 'react';

/**
 * Debounce hook - delays updating the value until the user stops typing.
 *
 * Usage:
 *   const debouncedSearch = useDebounce(searchTerm, 400);
 */
const useDebounce = (value, delay = 400) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
