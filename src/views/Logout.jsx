import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Logout = () => {
  const navigate = useNavigate();


  useEffect(() => {
    localStorage.removeItem('token');
  
    setTimeout(() => {
      navigate('/login');
    }, 800); // 0.8s delay
  }, []);

  return <h1>Logging out...</h1>;
};

export default Logout;