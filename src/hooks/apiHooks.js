import { useState, useEffect } from 'react';
import { fetchData } from '../utils/fetchData';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const getMedia = async () => {
    try {
      const mediaUrl = `${import.meta.env.VITE_MEDIA_API}/media`;

      const mediaItems = await fetchData(mediaUrl);

      const enrichedMedia = await Promise.all(
        mediaItems.map(async (item) => {
          const userUrl = `${import.meta.env.VITE_AUTH_API}/users/${item.user_id}`;
          const user = await fetchData(userUrl);

          return {
            ...item,
            username: user.username,
          };
        })
      );

      setMediaArray(enrichedMedia);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  return { mediaArray };
};

export { useMedia };
