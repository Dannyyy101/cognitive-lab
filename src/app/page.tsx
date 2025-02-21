'use client'
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetch("http://127.0.0.1:5328");
        if (!result.ok) {
          throw new Error('Failed to fetch data');
        }
        const text = await result.text();
        setData(text);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="text-white">
      {JSON.stringify(data)}
    </div>
  );
}