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

  const postMedia = async (fileResult, inputs, token) => {
    try {
      const mediaData = {
        title: inputs.title,
        description: inputs.description,
        filename: fileResult.data.filename,
        media_type: fileResult.data.media_type,
        filesize: fileResult.data.filesize,
      };
      
  
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(mediaData),
      };
  
      const response = await fetch(
        import.meta.env.VITE_MEDIA_API + '/media',
        fetchOptions
      );
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  return { mediaArray, postMedia };

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
      throw error;
    }
};

const useFile = () => {
  const postFile = async (file, token) => {
    try {
      const formData = new FormData();

      formData.append('file', file);

      const fetchOptions = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
        },
        body: formData,
      };

      const response = await fetch(
        import.meta.env.VITE_UPLOAD_SERVER + '/upload',
        fetchOptions
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return { postFile };
};

export { useFile };
export { useUser };
export { useAuthentication };
export { useMedia };