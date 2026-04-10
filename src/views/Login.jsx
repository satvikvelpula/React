import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <>
      <button onClick={() => setIsLoginView(!isLoginView)}>
        {isLoginView ? 'Create account' : 'Go to Login'}
      </button>

      {isLoginView ? <LoginForm /> : <RegisterForm />}
    </>
  );
};

export default Login;
