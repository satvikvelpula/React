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

const useAuthentication = () => {
    const postLogin = async (inputs) => {
      try {
        const fetchOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputs),
        };
  
        const loginResult = await fetchData(import.meta.env.VITE_AUTH_API + '/auth/login', fetchOptions);
        return loginResult;

      } catch (error) {
        console.error(error);
      }
    };
  
    return { postLogin, postUser };
};

const useUser = () => {
    const getUserByToken = async (token) => {
      try {
        const fetchOptions = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
  
        const user = await fetchData(
          import.meta.env.VITE_AUTH_API + '/users/token',
          fetchOptions
        );
  
        return user;
      } catch (error) {
        console.error(error);
      }
    };
  
    return { getUserByToken };
};

const postUser = async (inputs) => {
    try {
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      };
  
      const result = await fetchData(
        import.meta.env.VITE_AUTH_API + '/users',
        fetchOptions
      );
  
      return result;
    } catch (error) {
      console.error(error);
    }

    throw error;
};
  
  
  
  
export { useUser };
export { useAuthentication };
export { useMedia };
