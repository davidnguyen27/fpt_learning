export const getItemInLocalStorage = <T>(key: string): T | null => {
    const item = localStorage.getItem(key);
    try {
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error parsing localStorage item with key "${key}":`, error);
      return null;
    }
  };