export const fetchData = async (file) => {
    const response = await fetch(file);
  
    if (!response.ok) {
      throw new Error(`Failed to fetch ${file}`);
    }
  
    return await response.json();
  };
  