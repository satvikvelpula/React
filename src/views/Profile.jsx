import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../hooks/apiHooks';

const Profile = () => {
  const [user, setUser] = useState(null);
  const { getUserByToken } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }


    const fetchUser = async () => {
      try {
        const data = await getUserByToken(token);
    
        console.log('RAW USER DATA:', data);
    
        setUser(data);
      } catch (error) {
        console.error('FETCH USER ERROR:', error);
      }
    };

    fetchUser();
  }, []);


  if (!user) return <p>Loading...</p>;

  return (
    <>
      <h1>Profile</h1>
      <p>Username: {user.user.username}</p>
      <p>Email: {user.user.email}</p>
    </>
  );
};

export default Profile;
