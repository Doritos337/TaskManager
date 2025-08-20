import { useEffect } from 'react';

const API = "https://680fc8ae27f2fdac240f60df.mockapi.io/tasks";

export function useTasks(setList) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API);
        const data = await response.json();
        setList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [setList]);
}
