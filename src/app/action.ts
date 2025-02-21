'use server'
export const getData = async () => {
    try {
        const result = await fetch("http://127.0.0.1:5328");
        console.log(result)
        if (!result.ok) {
          throw new Error('Failed to fetch data');
        }
        const text = await result.text();
        return text;
      } catch (error) {
        console.error('Fetch error:', error);
        return null;
      }
}