'use client'
import { useEffect, useState } from 'react';
import { getData } from './action';


export default function Home() {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const t = await getData();
      setData(t)
    }
    fetchData();
  }, []);

  return (
    <div className="text-white">
      {JSON.stringify(data)}
    </div>
  );
}