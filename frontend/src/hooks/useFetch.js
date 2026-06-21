/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

/**
 * Generic data fetching hook with loading, error, and refetch support.
 *
 * Usage:
 *   const { data, loading, error, refetch } = useFetch('/api/resources?category=DSA');
 */
const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!url) return;
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('rrh_token') || localStorage.getItem('educonnect_token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.get(url, { headers, ...options });
      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
