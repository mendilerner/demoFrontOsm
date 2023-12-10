import { useState, useEffect } from 'react';
import { fetchBiData } from '../../../services/biServices';

const useData = (uri: string) => {
  const [data, setData] = useState<unknown[]>([]);

  useEffect(() => {
    async function fetchData() {
      const temp = await fetchBiData(uri);
      if (temp) {
        setData(temp);
      }
    }

    fetchData();
  }, []);

  return data;
}

export default useData